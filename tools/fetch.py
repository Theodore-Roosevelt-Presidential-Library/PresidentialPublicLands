import json,sys,urllib.request,urllib.parse
def q(url,where,fields,offset=0.002,out=None):
    feats=[];start=0
    while True:
        p=dict(where=where,outFields=fields,f='geojson',outSR=4326,maxAllowableOffset=offset,resultOffset=start,resultRecordCount=200,returnGeometry='true')
        u=url+'/query?'+urllib.parse.urlencode(p)
        d=json.load(urllib.request.urlopen(u,timeout=300))
        fs=d.get('features',[]);feats+=fs
        if len(fs)<200 and not d.get('exceededTransferLimit'): break
        if not fs: break
        start+=len(fs)
    json.dump({'type':'FeatureCollection','features':feats},open(out,'w'))
    print(out,len(feats))
if __name__=='__main__':
    q(sys.argv[1],sys.argv[2],sys.argv[3],float(sys.argv[4]),sys.argv[5])
