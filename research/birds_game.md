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

## Follow-up (Oct 14)
This pass resolves the three open questions. The details are in `birds_followup.json`. All three reservations ended through a formal action, and each action was confirmed from its primary text.

### Tern Islands, LA (EO 675, Aug. 8, 1907): revoked 1953
- **What it was:** EO 675 reserved "all small islets, commonly called mud lumps, in or near the mouths of the Mississippi river" that fall inside an oval drawn on the GLO diagram attached to the order. The oval covers the birdfoot delta from Southwest Pass around to North Pass and Pass a Loutre. **It was not the Chandeleur or Breton Sound islands**, which were the separate Breton Island Reservation.
- **Marker:** moved to about 29.13, -89.22, the center of the diagram's oval near Head of Passes. This is approximate. The mud lumps came and went, so there is no single island to pin.
- **What happened:** It was renamed Tern Islands NWR by Proclamation 2416 (1940). **Public Land Order 892 revoked it on Apr. 15, 1953** (Sec. Douglas McKay; 18 FR 2342, published Apr. 22, 1953). It was not merged into Breton or any other refuge. Delta NWR and the state's Pass a Loutre WMA protect parts of the delta today, but they are separate, later designations.
- **Story detail:** Palmer (1912) cites H.H. Kopman's survey in *Bird-Lore* IX, pp. 236–238. Kopman found brown pelicans, laughing gulls, and royal, Forster's and Caspian terns nesting on the mud lumps in June 1907.
- **Confidence:** high on history; medium on the marker.

### Indian Key, FL (EO 409, Feb. 10, 1906): revoked 1950, protected again in 1951 as part of Pinellas NWR
- **Same island?** Yes, with medium-high confidence. EO 409 puts it in secs. 10 and 15, T32S, R16E. FWS's own 1979 Tampa Bay Refuges narrative (NARA RG 22) dates Pinellas refuge to "1906 with redefinement in 1921." BLM's GLO "record of the week" also identifies Indian Key as Pinellas NWR.
- **Chain of actions:**
  - 1906: EO 409 creates the reservation, 90 acres.
  - **June 25, 1921:** EO 3502 (Harding) enlarges it to include the mangrove islands in secs. 20, 27, 28, 33 and 34. This enlargement was not in the earlier research.
  - 1940: Proclamation 2416 renames it Indian Key NWR.
  - **June 26, 1950:** PLO 650 (Sec. Oscar Chapman; 15 FR 4193) revokes both orders. The order puts the area at about 191 acres.
  - 1951: Pinellas NWR is established, including Indian Key and Tarpon Key. **I could not find the legal instrument for the 1951 establishment.** It was not a Public Land Order; BLM's PLO tables for 1951–60 list none for it.
- **Marker:** 27.7008, -82.6904 (Indian Key, Pinellas NWR).
- **For the map:** this follows the same pattern as Pathfinder (revoked, then restored). It is fair to show it as "protected today in Pinellas NWR," with a footnote that the 1906 order itself was revoked in 1950.

### Siskiwit Islands, MI (EO 357-C, Oct. 10, 1905): abolished by Congress 1942
- The **Act of Mar. 6, 1942** (ch. 152, sec. 2, 56 Stat. 138; 16 U.S.C. 408f) reads: "The Siskiwit Islands Bird Reservation is abolished and shall after March 6, 1942, be a part of the Isle Royale National Park."
- The park was authorized in 1931 and established in 1940, but neither step ended the reservation. **Wikisource's note that it was "incorporated ... in 1931" is wrong.**
- It is not an FWS unit and is not listed by FWS today.
- **Marker:** refined to 47.96, -88.79, between Wright Island and Menagerie Island (Isle Royale Light). The order covers the "Siskiwit or Menagerie group" in T64N R36W.
- **Confidence:** high.

### Consistency check
TRPL's own "Then and Now" page (trlibrary.com/tr/presidency/executive-actions/then-and-now) already agrees on all three: Tern Islands revoked by PLO 892 in 1953, Indian Key revoked in 1950, Siskiwit abolished in 1942. It does not mention that Indian Key was protected again in 1951 as part of Pinellas NWR. That page may be worth a one-line addition.

### Updates to the summary above
- Move **Siskiwit** from "Now NPS, end date unconfirmed" to "Abolished 1942 by act of Congress, now part of Isle Royale NP."
- Move **Tern Islands** to "Abolished (1953)."
- **Indian Key:** revoked 1950; the island has been protected again since 1951 as part of Pinellas NWR.
- With these changes, abolished or ended reservations number 20 (18 + Tern Islands + Siskiwit). Indian Key is counted separately as "revoked, then protected again."

### Sources added
- PLO 892 text: https://www.govinfo.gov/content/pkg/FR-1953-04-22/pdf/FR-1953-04-22.pdf
- PLO 650 text: https://www.govinfo.gov/content/pkg/FR-1950-06-30/pdf/FR-1950-06-30.pdf
- BLM PLO tables: https://www.blm.gov/sites/blm.gov/files/uploads/programs_lands-and-realty_land-tenure_withdrawals_public-land-orders_1-694.pdf and https://www.blm.gov/sites/blm.gov/files/uploads/programs_lands-and-realty_land-tenure_withdrawals_public-land-orders_695-2250.pdf
- 16 U.S.C. 408f: https://www.law.cornell.edu/uscode/text/16/408f
- EO texts on Wikisource: https://en.wikisource.org/wiki/Executive_Order_675, https://en.wikisource.org/wiki/Executive_Order_409, https://en.wikisource.org/wiki/Executive_Order_357-C
- EO 675 diagram: https://commons.wikimedia.org/wiki/File:Tern_Islands_Reservation_EO_675_illustration.jpg
- FWS 1979 narrative (NARA): https://nara-media.s3.amazonaws.com/dc-metro/rg-022/6102316/JND_1979_NARRATIVEREPORT/JND_1979_NARRATIVEREPORT.pdf
