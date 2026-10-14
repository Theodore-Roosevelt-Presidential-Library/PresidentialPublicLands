# National forest lineage and TR-era totals: research notes and caveats

Prepared 2026-10-14 for the TRPL forest-growth map. The data is in `forests.json`, which has three arrays: `units` (114 modern forests), `discontinued` and `yearly`.

## Primary sources used
- **FS-612 (2012 edition)**: USFS, *Establishment and Modification of National Forest Boundaries and National Grasslands: A Chronological Record 1891–2012*. The full proclamation-by-proclamation record was parsed from govinfo.gov. This edition replaces the 1997 Davis edition named in the brief and covers the same 1891–1996 entries. It is the basis for every lineage chain.
- **Davis / National Museum of Forest Service History (2022)**: *Field Organization and Administrative History of the National Forest System*, Section III and the index.
- **Official annual figures**: *Report of the Forester* for 1902 and 1909, and *Annual Reports of the Department of Agriculture* for 1905–1908. The scans are on archive.org.
- **Forest History Society**: *Highlights in the History of Forest Conservation* (the 1975 forest list and the 1898–1917 chronology).
- **Williams**: *The USDA Forest Service: The First Century* (FS-650).
- Wikipedia and Steen were not needed and were not used.

## How to use `origin` vs `primary_origin`
- `origin` follows the brief strictly. It uses the **earliest** reserve whose land is, or is believed to be, inside today's forest.
- In 36 forests a small parcel came from an older reserve through a later transfer (`mixed_lineage: true`). For example, Kootenai is a 1906 TR reserve but received Blackfeet NF land of 1897 lineage in 1935.
- **For map colouring, use `primary_origin`**, which classifies the core or namesake reserve. Use `origin` only if the map must answer "is any of this land older than TR?"
- Counts: strict pre-TR 54 / primary pre-TR 44 / primary TR 67 / post-TR 3. Arapaho is "uncertain".

## Key caveats (verify before publishing)
1. **A modern boundary does not equal a historic boundary.** The year slider will colour whole modern polygons. Pre-TR forests that TR enlarged (Shoshone, Bighorn, Pike, Sierra and others) will show as pre-TR even though much of their acreage was proclaimed by TR. Consider a hatched "enlarged by TR" style using `tr_enlarged` and `first_tr_year`.
2. **`tr_enlarged = yes` means at least one documented addition, not a verified net gain.** Many TR proclamations both added and deleted land. Grand Mesa is left as "unknown" because its 1904–05 changes were mixed.
3. **Low-confidence items** (`confidence: "low"`) depend on whether specific later parcel transfers contained original pre-1901 land: Arapaho, Roosevelt, Medicine Bow (Crow Creek / Pole Mountain), Helena, Lolo, St. Joe, Targhee, Bridger, Toiyabe, Inyo, Chugach (Afognak) and Hiawatha. FS-612 records the transfers but not the parcels.
4. **Medicine Bow**: Crow Creek FR (McKinley, 1900) went to the War Department in 1910. FS-612 records land added to Medicine Bow from Fort F.E. Warren in 1925, which is probably Pole Mountain. This needs verification.
5. **Chugach**: Afognak (Harrison, 1892) merged into it in 1908. Much of Afognak Island has since left federal forest status. Check today's boundary.
6. **Choctawhatchee NF** (TR, 1908) was transferred to the War Department in 1940 and is now Eglin AFB. It is unlikely to be in USFS admin-boundary data. Show it as a historical footprint or omit it.
7. **Chippewa** dates to the 1902 Morris Act, which created a reserve by Act of Congress rather than proclamation. FS-612 dates the Minnesota NF to the Act of 23 May 1908. The 27 June 1902 date is assumed and should be checked.
8. **North Dakota note**: TR proclaimed the **Dakota National Forest** (24 Nov 1908), the only national forest ever in ND. It was abolished in 1917, so there is no modern polygon. This is a possible callout for a Medora audience.
9. **Admin units**: combined units are recorded in `admin_unit` (e.g. Medicine Bow-Routt, Custer Gallatin). The 2014 date for the Custer Gallatin merger has not been checked.
10. **Puerto Rico**: Luquillo was a Spanish Crown reserve from 1876. TR's proclamation of 17 Jan 1903 is the first U.S. action, so El Yunque is classed as TR.

## Year-by-year totals: caveats
- **Official figures fall on June 30, the end of the fiscal year, not December 31.** Calendar year-end rows have counts tallied from FS-612 and `acres: null`. Interpolating between June 30 points is defensible if it is labelled as approximate.
- **Count conventions vary.** My FS-612 tally reproduces the official 159 for June 30, 1907. For 1905 it differs: the official figure is 93 reserves on July 1, 1905, against my 85, and the FHS gives 60 at the February 1905 transfer against my 63. The July 1908 redistricting renamed and merged dozens of units, so counts before and after mid-1908 are not comparable.
- **Gross vs net acres.** All acreage figures are gross, meaning they include private inholdings. The exception is the February 1905 figure of "56 million", which is net. The 194,505,325 gross for 1909 includes about 26.8M acres in Alaska and an estimated 21M acres of alienated land. Net federal acreage was about 172M by 1910.
- **The Library's numbers hold up, with one adjustment:**
  - **Sept 1901:** use **about 46 million**, not 47 million. 194.5M minus the FHS figure of "more than 148 million added" gives about 46.4M. Harrison (~13.4M) + Cleveland (~25.8M) + McKinley (~7M), less eliminations, gives about 46M. 47M is slightly high.
  - **The 1907 midnight reserves:** "33 proclamations, 15.6 million acres" matches FHS (15,645,631 acres) and the FS-612 count of 33 proclamations dated March 1–2, 1907. Other sources disagree: Davis 2022 counts 30 (11 new and 19 enlarged), FS-650 counts "17 new or combined", and popular accounts say 21 or 32. Note that FS-612's 33 includes Toiyabe (Nevada), which was outside the six Fulton-amendment states.
  - **March 1909:** ">194 million acres; ~150 forests" matches the 1909 Forester's report (194,505,325 gross on June 30, 1909). FS-612 shows no additions between March 4 and June 30, 1909. Davis gives 151 forests.
- **Key dates:** Transfer Act, 1 Feb 1905. The Bureau of Forestry was renamed the Forest Service effective 1 July 1905. The Act of 4 March 1907 (with the Fulton amendment) renamed forest reserves "national forests".

## Not done / open items
- The exact number of reserves at TR's inauguration in an official GLO report has not been located. The count of 41 is my FS-612 tally.
- Parcel-level verification of the low-confidence transfers would need GIS overlays: the USFS "Original Proclaimed National Forests" layer on data-usfs.hub.arcgis.com, or the Peter Stark historical boundary maps at nfsl.contentdm.oclc.org.
