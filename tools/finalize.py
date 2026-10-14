# Adds label points for forests, applies editorial fixes, writes data/sites.json
import json
p={f['properties']['sid']:f['geometry']['coordinates'] for f in json.load(open('tools/geo/pts.geojson'))['features'] if f['geometry']}
NOTE={
 'm-el-morro':"A sandstone bluff where centuries of travelers, from Ancestral Puebloans to Spanish and American passersby, carved their marks.",
 'b-salt-river':"Land around the new Roosevelt Dam reservoir, one of 17 reclamation reservoirs made bird reservations in a single order on February 25, 1909; revoked in 1961.",
}
S=json.load(open('tools/geo/sites_pre.json'));out=[]
for s in S:
    if s['cat']=='forest' and s.get('lat') is None and s['id'] not in p: continue
    if s['lat'] is None: s['lon'],s['lat']=[round(v,3) for v in p[s['id']]]
    if s['id'] in NOTE: s['note']=NOTE[s['id']]
    out.append(s)
json.dump(out,open('data/sites.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(out))
