# Fact-check: Roosevelt bird reservations and game preserves

Output data: `birds_game.json` (51 bird + 4 game records). Records include an extra `abolished` field: the year it was revoked, `null` if still protected, or `"unconfirmed"`.

## Primary sources used
- T.S. Palmer, *National Reservations for the Protection of Wild Life*, USDA Biological Survey Circular 87 (Oct. 5, 1912). It numbers the bird reservations 1–51 through Bogoslof, then 52–56 under Taft. https://www.archive.org/download/CAT31414456/CAT31414456.pdf
- Theodore Roosevelt, *A Book-Lover's Holidays in the Open* (1916), Appendix B. It has the same list but gives 52 entries, because the Jan. 26, 1909 Pelican Island enlargement is numbered on its own line. https://standardebooks.org/ebooks/theodore-roosevelt/a-book-lovers-holidays-in-the-open/text/appendix-b
- Executive order texts and revocation histories on Wikisource (EO 699–1057, EO 1032); proclamations at the UCSB American Presidency Project; FWS and DOI pages.

## The count: 51 is correct
There are 51 distinct reservations. Palmer's 1912 list numbers them 1–51 exactly. TR's own appendix shows 52 lines, but one of them is the Pelican Island enlargement. EO 1032 (Feb. 25, 1909) created 17 of the 51 in a single order.

## Corrections to the colleague's list

### Bird reservations
1. **"Clear Lake, CA, 1909-02-25" is wrong. It must be removed and replaced with Willow Creek, MT.** Clear Lake was established April 11, 1911, under Taft. It is the first entry on both Palmer's and TR's lists of post-Roosevelt additions. EO 1032 names Willow Creek, Montana, not Clear Lake. Willow Creek was missing from the colleague's list.
2. **Loch Katrine location is wrong.** The colleague placed it at 44.65, -109.10. EO 961 describes a reservoir site in the Oregon Basin, Wyoming (T51–52N, R100W), about 5,500 acres. The corrected location is about 44.45, -108.95 (medium confidence). Wikisource's heading for the order says "in Oregon," which is a typo; the order's text says Wyoming.
3. **Hawaiian Islands marker is in the wrong place.** 21.9, -160.15 is Niʻihau, which was never part of the reservation. I moved the marker to Nihoa (23.06, -161.92), the nearest island that was in it.
4. **Name as established:** "Lower Klamath Lake" was established as "Klamath Lake Reservation" (EO 924). It was renamed Lower Klamath NWR in 1940 (Proclamation 2416). The other names match Palmer, apart from small spellings: "Clealum" is today's Cle Elum, "Saint Lazaria" is also written St. Lazaria, and Palmer lists Keechelus and Kachess without "Lake."
5. **Notes to drop or soften:**
   - Three Arch Rocks, "first federal bird reservation west of the Mississippi": not accurate. Stump Lake, ND (1905) and Shell Keys, LA (Aug. 1907) are both west of the river and came earlier. FWS sometimes uses similar wording; avoid it.
   - Lower Klamath, "the first federal waterfowl refuge": FWS's own description, kept as "often called."
   - Breton, "Roosevelt visited in 1915": confirmed by the FWS Breton fact sheet.
   - Pribilof: the reservation covered only Walrus and Otter islands, not the whole group.

All other bird dates match Palmer and TR's appendix.

### Game preserves
1. **Grand Canyon Game Preserve date is wrong.** 1906-06-29 is the date of the act of Congress authorizing a preserve. Roosevelt created the preserve by Proclamation 694 on **Nov. 28, 1906**. Palmer's acreage of 1,492,928 reflects a Taft proclamation of June 3, 1909, so `acres` is left null.
2. **Wichita: 1905-06-02 is correct** (Proclamation 563). Palmer lists Jan. 24, 1905, which is the authorizing act. Acreage in 1912 was 57,120.
3. **National Bison Range: 1908-05-23 is correct** (an act of Congress that Roosevelt signed). The acreage is 18,521 per Palmer, not 18,500; about 18,800 today. Current status: the Consolidated Appropriations Act, 2021 (P.L. 116-260) repealed the range's statute. Interior put the land in trust for the Confederated Salish and Kootenai Tribes in **June 2021**, with a two-year management handover. Use 2021 for the transfer, not 2022. CSKT now calls it the "Bison Range."
4. **Fire Island, AK: 1909-02-27 is exact, not approximate** (EO 1038, "preserve and breeding ground for Alaska moose"). It was revoked in 1921, re-established in 1925, and revoked again in 1955 (PLO 1152). It no longer exists.

## Current status summary (bird reservations)
- **Still FWS refuges (29, plus Indian Key as possible):** Pelican Island; Breton (re-created 1938); Stump Lake; Huron; Passage Key; Shell Keys; Three Arch Rocks; Flattery Rocks; Quillayute Needles; Copalis; Key West; Lower Klamath; Malheur; Chase Lake; Pine Island; Matlacha Pass; Island Bay; Hawaiian Islands; Deer Flat; Cold Springs; Minidoka (re-designated 1936); Pathfinder (revoked 1922, restored 1928); Culebra; Farallon Islands; and Alaska Maritime NWR, which now holds Bering Sea, Tuxedni, Saint Lazaria, Pribilof and Bogoslof.
- **Now National Park Service:**
  - Tortugas Keys: Fort Jefferson National Monument in 1935, now Dry Tortugas NP.
  - Siskiwit Islands: inside Isle Royale NP; I could not confirm when the reservation was formally ended.
- **Abolished (18):**
  - East Park, Keechelus, Kachess, Clealum, Bumping Lake and Loch Katrine (1921)
  - Shoshone and Yukon Delta (1922). The Yukon Delta area was re-protected in 1980 as Yukon Delta NWR.
  - Mosquito Inlet (1928)
  - Carlsbad (1947)
  - Rio Grande (became a wildlife refuge in 1933, revoked in 1947)
  - Palma Sola (1948)
  - Conconully (1960)
  - Salt River and Strawberry Valley (1961)
  - Belle Fourche (1964)
  - Willow Creek (1968)
  - East Timbalier Island (1969)

## Uncertainties to resolve before publishing
- **Tern Islands, LA (1907):** I could not find its current status or exact location. The colleague's coordinates are unverified. Confidence: low.
- **Indian Key, FL (1906):** An "Indian Key" is part of Pinellas NWR, established 1951. I could not confirm it is the same island, or when or whether the 1906 reservation was revoked. Confidence: low.
- **Siskiwit Islands:** These islands are inside Isle Royale NP, but I could not confirm when or how the reservation was transferred or revoked. Confidence: medium.
- **Bogoslof date:** Palmer and TR's own appendix say March 2, 1909, and that date is used. The Wikisource transcription of EO 1049 shows March 3, 1909, which is worth checking against the National Archives copy. Confidence: medium.
- **Willow Creek, MT coordinates:** placed at Willow Creek Reservoir near Augusta (approximate).
- **Grand Canyon Game Preserve:** The designation was never formally revoked, as far as I found, but its present-day legal status was not confirmed.
- Coordinates are approximate map markers, not boundaries.
