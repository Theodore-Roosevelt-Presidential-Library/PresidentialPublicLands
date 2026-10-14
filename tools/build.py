import json,re,unicodedata
R='research/';G='tools/geo/'
def slug(s): return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('-')
def yr(d): return int(d[:4])
sites=[];polys=[]
def clean(t):
    for a,b in [(' FRs',' Forest Reserves'),(' FR ',' Forest Reserve '),(' NFs',' National Forests'),(' NF ',' National Forest '),('TLR','Timber Land Reserve'),('->','→'),('EO ','Executive Order '),('Mtns','Mountains'),('Mtn','Mountain'),(' est. ',' established ')]:
        t=(t+' ').replace(a,b).strip()
    t=re.sub(r' FR$',' Forest Reserve',t); t=re.sub(r' NF$',' National Forest',t); t=re.sub(r' FR([),;])',r' Forest Reserve\1',t); t=re.sub(r' NF([),;])',r' National Forest\1',t)
    return t
def addpoly(fc,match,sid,cat,era='tr',year=None):
    n=0
    for f in fc['features']:
        if match(f['properties']):
            polys.append({'type':'Feature','geometry':f['geometry'],'properties':{'sid':sid,'cat':cat,'era':era,'year':year}});n+=1
    return n
fws=json.load(open(G+'fws_raw.geojson'));nps=json.load(open(G+'nps_raw.geojson'));kai=json.load(open(G+'kaibab_raw.geojson'))
# ---- parks & monuments
NPSMAP={"Crater Lake National Park":"CRLA","Wind Cave National Park":"WICA","Mesa Verde National Park":"MEVE","Devils Tower":"DETO","El Morro":"ELMO","Montezuma Castle":"MOCA","Petrified Forest":"PEFO","Chaco Canyon":"CHCU","Gila Cliff Dwellings":"GICL","Tonto":"TONT","Muir Woods":"MUWO","Grand Canyon":"GRCA","Pinnacles":"PINN","Jewel Cave":"JECA","Natural Bridges":"NABR","Tumacácori":"TUMA","Mount Olympus":"OLYM","Yellowstone National Park":"YELL","Sequoia National Park":"SEQU","Yosemite National Park":"YOSE","Mount Rainier National Park":"MORA"}
TODAY={"Crater Lake National Park":"Crater Lake National Park","Wind Cave National Park":"Wind Cave National Park","Mesa Verde National Park":"Mesa Verde National Park","Platt National Park":"Chickasaw National Recreation Area","Sully's Hill National Park":"White Horse Hill National Game Preserve","Devils Tower":"Devils Tower National Monument","El Morro":"El Morro National Monument","Montezuma Castle":"Montezuma Castle National Monument","Petrified Forest":"Petrified Forest National Park","Chaco Canyon":"Chaco Culture National Historical Park","Lassen Peak":"Lassen Volcanic National Park","Cinder Cone":"Lassen Volcanic National Park","Gila Cliff Dwellings":"Gila Cliff Dwellings National Monument","Tonto":"Tonto National Monument","Muir Woods":"Muir Woods National Monument","Grand Canyon":"Grand Canyon National Park","Pinnacles":"Pinnacles National Park","Jewel Cave":"Jewel Cave National Monument","Natural Bridges":"Natural Bridges National Monument","Lewis and Clark Cavern":"Lewis and Clark Caverns State Park (Montana)","Tumacácori":"Tumacácori National Historical Park","Wheeler":"Wheeler Geologic Area, Rio Grande National Forest","Mount Olympus":"Olympic National Park"}
for r in json.load(open(R+'parks_monuments.json')):
    cat='park' if r['cat'].startswith('park') else 'monument'; era='pre' if r['cat']=='park_pre' else 'tr'
    nm=r['name'] if cat=='park' else r['name']+' National Monument'
    sid=('p-' if cat=='park' else 'm-')+slug(r['name'])
    n=0
    if r['name'] in NPSMAP: n=addpoly(nps,lambda p,c=NPSMAP[r['name']]:p['UNIT_CODE']==c,sid,cat,era,yr(r['date']))
    if r['name']=="Sully's Hill National Park": n=addpoly(fws,lambda p:'WHITE HORSE' in p['ORGNAME'],sid,cat,era,yr(r['date']))
    sites.append(dict(id=sid,name=nm,cat=cat,era=era,st=r['state'],date=r['date'],acres=r['acres'],acres_label='acres when protected',lat=r['lat'],lon=r['lon'],note=r['note'],today=TODAY.get(r['name'],r['name'] if era=='pre' else None),shape=bool(n),sources=r['sources']))
# ---- birds & game
FWSMAP={"Pelican Island":"PELICAN ISLAND NATIONAL","Breton Island":"BRETON","Stump Lake":"STUMP LAKE","Huron Islands":"HURON NATIONAL","Passage Key":"PASSAGE KEY","Shell Keys":"SHELL KEYS","Three Arch Rocks":"THREE ARCH","Flattery Rocks":"FLATTERY","Quillayute Needles":"QUILLAYUTE","Copalis Rock":"COPALIS","Key West":"KEY WEST","Klamath Lake":"LOWER KLAMATH","Lake Malheur":"MALHEUR","Chase Lake":"CHASE LAKE NATIONAL","Pine Island":"PINE ISLAND","Matlacha Pass":"MATLACHA","Island Bay":"ISLAND BAY","Hawaiian Islands":"HAWAIIAN ISLANDS","Deer Flat":"DEER FLAT","Minidoka":"MINIDOKA","Cold Springs":"COLD SPRINGS","Pathfinder":"PATHFINDER","Culebra":"CULEBRA","Farallon":"FARALLON","Wichita Game Preserve":"WICHITA"}
for r in json.load(open(R+'birds_game.json')):
    cat=r['cat']; sid=('b-' if cat=='bird' else 'g-')+slug(r['name'])
    nm=r['name']
    if cat=='bird' and 'Reservation' not in nm: nm+=' Reservation'
    n=0
    if r['name'] in FWSMAP and not r.get('abolished'): n=addpoly(fws,lambda p,k=FWSMAP[r['name']]:k in p['ORGNAME'],sid,cat,'tr',yr(r['date']))
    if r['name']=='Grand Canyon Game Preserve': n=addpoly(kai,lambda p:True,sid,cat,'tr',yr(r['date']))
    ab=r.get('abolished')
    today=r.get('modern_name') if r.get('modern_agency') not in ('abolished','unknown') and r.get('modern_name') else None
    if ab and ab!='unconfirmed' and not today: today=f'No longer a reservation (revoked {ab})'
    sites.append(dict(id=sid,name=nm,cat=cat,era='tr',st=r['state'],date=r['date'],acres=r.get('acres'),acres_label='acres when protected',lat=r['lat'],lon=r['lon'],note=r['note'],today=today,shape=bool(n),approx_shape=(r['name']=='Grand Canyon Game Preserve'),sources=r['sources']))
# ---- reclamation
for r in json.load(open(R+'reclamation.json')):
    if not r.get('in_count_24'): continue
    nm=r['name'].replace(' Project','')
    nm=re.sub(r'\s*\(.*\)','',nm)+' Project' if '(' in nm else nm+' Project'
    sites.append(dict(id='r-'+slug(r['name']),name=nm,cat='water',era='tr',st='/'.join(r['states']) if isinstance(r['states'],list) else r['states'],date=r['date'],acres=r.get('acres_irrigated'),acres_label='acres planned for irrigation',lat=r['lat'],lon=r['lon'],note=r['note'],today=r['structure'],shape=False,sources=r['sources']))
# ---- forests
F=json.load(open(R+'forests.json'))
fr=json.load(open(G+'forests_raw.geojson'))
ALIAS={"Coeur d’Alene National Forest":"Coeur d'Alene National Forest","Lewis & Clark National Forest":"Lewis and Clark National Forest","Nezperce National Forest":"Nez Perce National Forest"}
byname={}
for f in fr['features']: byname.setdefault(ALIAS.get(f['properties']['forestname'],f['properties']['forestname']),[]).append(f)
PRES={'1891':'Harrison','1892':'Harrison','1893':'Harrison','1897':'Cleveland','1898':'McKinley','1899':'McKinley','1900':'McKinley','1901':'McKinley'}
for u in F['units']:
    if u['primary_origin']=='post-TR': continue
    nm=u['modern_name']; sid='f-'+slug(nm.replace(' National Forest',''))
    era='pre' if u['primary_origin']=='pre-TR' else 'tr'
    if era=='tr': year=u.get('first_tr_year') or yr(u['primary_date'])
    else: year=None
    enl=u.get('first_tr_year') if era=='pre' and u.get('tr_enlarged')=='yes' else None
    feats=byname.get(nm,[])
    acres=sum(f['properties']['gis_acres'] or 0 for f in feats) or None
    for f in feats: polys.append({'type':'Feature','geometry':f['geometry'],'properties':{'sid':sid,'cat':'forest','era':era,'year':year,'enl':enl}})
    pd=u['primary_date'] if era=='pre' else None
    if era=='pre':
        pres='Harrison' if pd<'1893-03-04' else 'Cleveland' if pd<'1897-03-04' else 'McKinley'
        note=f"First protected in {pd[:4]}{' under President '+pres if pres else ''}, before Roosevelt took office."+(f" Roosevelt added land to it beginning in {enl}." if enl else "")
    else:
        note=f"Roosevelt first protected land in this forest in {year}."
    sites.append(dict(id=sid,name=nm,cat='forest',era=era,st='/'.join(u['states']),date=(pd if era=='pre' else None),year=year,enl=enl,acres=round(acres) if acres else None,acres_label='acres inside today\'s boundary',lat=None,lon=None,note=note,lineage=clean(u['primary_predecessor']),today=u.get('admin_unit') or nm,shape=bool(feats),confidence=u['confidence'],sources=['https://www.govinfo.gov/app/details/GOVPUB-A13-PURL-gpo38052']))
# discontinued TR forests (points)
DISC={"Dakota National Forest":(46.585,-103.481,1908,"1908-11-24","About 14,000 acres in today's Slope County, south of Medora, set aside around a rare stand of ponderosa pine and used as a tree nursery for prairie windbreaks. The only national forest ever established in North Dakota, it was abolished in 1917.","Abolished 1917"),
 "Garden City Forest Reserve / Kansas National Forest":(37.95,-100.80,1905,"1905-07-25","A tree-planting experiment on the high plains near Garden City, later renamed Kansas National Forest. Abolished in 1915.","Abolished 1915"),
 "Choctawhatchee National Forest":(30.55,-86.55,1908,"1908-11-27","Longleaf pine forest on the Florida Panhandle. Transferred to the War Department in 1940; the land is now Eglin Air Force Base.","Eglin Air Force Base")}
for d in F['discontinued']:
    if d['name'] in DISC:
        lat,lon,y,dt,note,today=DISC[d['name']]
        sites.append(dict(id='f-'+slug(d['name'].split(' /')[0].replace(' National Forest','')),name=d['name'].split(' / ')[0],cat='forest',era='tr',st=d['states'][0],date=dt,year=y,acres=(13940 if d['name'].startswith('Dakota') else None),acres_label='acres when protected',lat=lat,lon=lon,note=note,today=today,shape=False,sources=['https://www.govinfo.gov/app/details/GOVPUB-A13-PURL-gpo38052']))
RANK={'forest':0,'game':1,'park':2,'monument':3,'bird':4}
polys.sort(key=lambda f:(RANK[f['properties']['cat']], 0 if f['properties']['era']=='pre' else 1))
json.dump({'type':'FeatureCollection','features':polys},open(G+'lands_full.geojson','w'))
json.dump(sites,open(G+'sites_pre.json','w'),ensure_ascii=False)
from collections import Counter
print(Counter((s['cat'],s['era'],s['shape']) for s in sites)); print(len(polys))
