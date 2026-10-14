# Roosevelt's Public Lands

An interactive map of the lands Theodore Roosevelt protected as president, September 14, 1901 – March 4, 1909, published at **https://publiclands.labs.trlibrary.com**.

A timeline slider starts with what was already protected when he took office, then adds each year of his presidency. The map covers:

| Kind of land | Count | How it is drawn |
|---|---|---|
| National forests | about 150 by 1909 (194.5 million acres) | Today's proclaimed boundaries of the 109 modern national forests that descend from 1891–1909 reserves, plus markers for 3 that no longer exist (Dakota, Garden City/Kansas, Choctawhatchee) |
| National parks | 5 (plus the 5 that existed in 1901) | Today's NPS or USFWS boundary; Platt and General Grant as markers |
| National monuments | 18 | Today's boundary of the unit each became; Lassen Peak, Cinder Cone, Lewis and Clark Cavern and Wheeler as markers |
| Federal bird reservations | 51 | Today's refuge boundary where one matches; abolished or merged reserves as markers |
| National game preserves | 4 | Wichita Mountains WR boundary; North Kaibab Ranger District as an approximate outline of the Grand Canyon preserve; Bison Range and Fire Island as markers |
| Reclamation projects | 24 | Marker at each project's signature dam, tunnel or pumping plant |

Started by Alice Wynd as a single-file D3 marker map; this version adds boundaries, zooming on a basemap, the year-by-year slider and the infographic panel.

## Files

- `index.html`, `styles.css`, `app.js` — the site (MapLibre GL JS 4.7.1 from unpkg, OpenFreeMap basemap; no build step).
- `data/sites.json` — one record per place: name, kind, era (`pre` = protected before Sept 14, 1901), date, acreage, note, what it is today, sources.
- `data/lands.geojson` — simplified boundaries, keyed to `sites.json` by `sid`.
- `research/` — the verified source tables behind the data, with notes on every correction and open question:
  - `birds_game.md/.json` — the 51 bird reservations and 4 game preserves (Palmer, Biological Survey Circular 87, 1912).
  - `parks_monuments.json` — parks and monuments, checked against proclamations and acts.
  - `forests.md/.json` — lineage of each modern national forest (FS-612) and official yearly acreage.
  - `reclamation.md/.json` — the 24 projects and how the count is made.
- `tools/` — scripts that rebuild `data/`.
- `CNAME` — custom domain for GitHub Pages.

## Hosting

GitHub Pages, deployed from the `main` branch, root folder. DNS: a `CNAME` record for `publiclands.labs` pointing to `theodore-roosevelt-presidential-library.github.io`. After the first deploy, turn on **Enforce HTTPS** under Settings → Pages.

## Rebuilding the data

```
mkdir -p tools/geo
# Forests (USFS Original Proclaimed National Forests)
python3 tools/fetch.py https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ProclaimedForestBoundaries_01/MapServer/0 "1=1" "forestname,gis_acres" 0.003 tools/geo/forests_raw.geojson
# NPS units
python3 tools/fetch.py https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/NPS_Land_Resources_Division_Boundary_and_Tract_Data_Service/FeatureServer/2 "UNIT_CODE IN ('YELL','SEQU','KICA','YOSE','MORA','CRLA','WICA','MEVE','CHIC','DETO','ELMO','MOCA','PEFO','CHCU','GICL','TONT','MUWO','GRCA','PINN','JECA','NABR','TUMA','OLYM','LAVO','DRTO','ISRO')" "UNIT_CODE,UNIT_NAME" 0.001 tools/geo/nps_raw.geojson
# USFWS refuges: see the refuge-name list in tools/build.py (FWSMAP); query FWSApproved_Authoritative/FeatureServer/0 by ORGNAME
# North Kaibab Ranger District: EDW_RangerDistricts_03/MapServer/1, districtname LIKE '%North Kaibab%'
python3 tools/build.py
npx mapshaper tools/geo/lands_full.geojson -simplify 20% keep-shapes weighted -o data/lands.geojson precision=0.0002 force
npx mapshaper tools/geo/lands_full.geojson -dissolve sid copy-fields=cat -points inner -o tools/geo/pts.geojson force
python3 tools/finalize.py
```

Do not add `-clean` to the mapshaper step: it removes overlaps between features, which erases places that sit inside a national forest (the Grand Canyon Game Preserve, for one).

## Caveats shown to visitors

Shapes are today's boundaries, not 1909 outlines. Forests are shaded by the reserve at their core; many older (tan) forests were enlarged by Roosevelt, marked with a dashed green edge from the year he first added land. The forest chart uses the official gross acreage reported at the time (fiscal-year figures, June 30, except 1901–1903).

Shareable views: `#year=1905`, `#show=bird,game`, `#place=b-pelican-island`, `#pre=0`.
