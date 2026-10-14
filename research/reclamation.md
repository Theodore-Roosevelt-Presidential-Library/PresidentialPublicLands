# Reclamation projects authorized under TR: where the count of 24 comes from

**Short version:** No primary source we found says "24." The Library's reclamation page states that "Between 1902 and the end of Roosevelt's presidency, the Reclamation Service initiated 24 reclamation projects" and cites no source. Using the Reclamation Service's own records, **25** projects (under their modern names) had construction authorized by the Secretary of the Interior between June 17, 1902 and March 4, 1909. The most defensible way to reach **24** is to leave out the **Rio Grande Project**. Its main works (Engle/Elephant Butte Dam) were authorized by **Congress** on March 4, 1907, in an act TR signed, but the Secretary did not authorize them until May 23, 1910. `reclamation.json` has all 25 entries, with `in_count_24: false` on Rio Grande.

## Primary source used

*Ninth Annual Report of the Reclamation Service, 1909–1910* (GPO, 1911): https://archive.org/details/ninthannualrepor09unit. Each project section has a "Chronological summary" with a line reading "Construction authorized by Secretary [date]." That line is the source for every date in the JSON. The acreage figures are the "Irrigable area" in each project's "Agricultural conditions" block. Most are the planned whole-project acreage, not what was actually irrigated by 1909. Dates were cross-checked against the *Sixth Annual Report, 1906–1907* (https://archive.org/details/sixthannualrepor06unit). Except for the two noted below, the two reports agree.

## The 25 Secretary-authorized projects (under modern names)

| # | Date | Project |
|---|---|---|
| 1–5 | 1903-03-14 | Salt River, Truckee-Carson, Uncompahgre, Milk River, North Platte ("Sweetwater"). These are the "first five" approved by Secretary Hitchcock. |
| 6 | 1904-02-10 | Shoshone |
| 7 | 1904-04-23 | Minidoka |
| 8–10 | 1904-05-10 | Yuma, Lower Yellowstone, Belle Fourche |
| 11 | 1904-09-06 (disputed) | Hondo |
| 12 | 1905-03-27 | Boise (Payette-Boise) |
| 13 | 1905-04-18 | Huntley |
| 14 | 1905-05-15 | Klamath |
| 15 | 1905-10-05 | Garden City |
| 16 | 1905-12-02 | Okanogan |
| 17 | 1905-12-04 | Umatilla |
| 18 | 1905-12-12 | Yakima (Sunnyside and Tieton units) |
| 19 | 1905-12-15 | Strawberry Valley |
| 20–21 | 1906-01-23 | Williston, Buford-Trenton |
| 22 | 1906-02-24 | Carlsbad |
| 23 | 1906-02-26 | Sun River |
| 24 | 1906-12-18 | Orland |
| (25) | 1905-12-02 (Leasburg unit only) / Congress 1907-03-04 | Rio Grande |

No new primary project was authorized between Orland (December 1906) and March 4, 1909. Money was tight, and the Service put its funds into finishing work already under way. Later projects such as Grand Valley (1912) fall outside TR's term.

## Why different sources give different counts

- **23.** A Reclamation history slide (https://www.usbr.gov/stakeholders/presentations/2020/history.pdf) says "1903–1907 – 23 projects approved by the Secretary of the Interior." It doesn't list them. Two plausible ways to get 23 are leaving out Rio Grande and Hondo, or treating the two North Dakota pumping projects as one. We can't tell which method it used.
- **24.** You get 24 if you leave out Rio Grande (as explained above). You also get 24 if you merge Buford-Trenton and Williston, which shared a power plant, or if you drop the failed Hondo project, which Reclamation no longer lists. **Recommended basis:** count only projects whose construction the Secretary of the Interior authorized under the 1902 Act, which leaves out Rio Grande.
- **25.** You get 25 if you count Rio Grande through its Leasburg unit. The Secretary authorized Leasburg on 1905-12-02, and it was reported as a separate "Leasburg project" in 1910.
- **About 30.** Reclamation's general history (https://www.usbr.gov/history/borhist.html) says "From 1902 to 1907, Reclamation began about 30 projects." That figure also counts separately authorized units and features that later became parts of other projects: St. Mary storage (1905-03-25, now part of Milk River), Leasburg, and the Wapato unit of Yakima (1906-06-16). It also counts Indian irrigation projects the Service built for the Office of Indian Affairs (Flathead, Blackfeet, Fort Peck and others) and early investigations.

**Copy recommendation for the Library:** "24" can be defended if a footnote explains the basis: "projects authorized for construction by the Secretary of the Interior under the Reclamation Act during Roosevelt's presidency." Simpler alternatives are "two dozen" or "more than two dozen." The Library should not say "about 30" without explaining what is being counted.

## Items that need verification before publishing

1. **Hondo date.** The 9th Report chronology says 1904-09-06, which is also the date bids were opened, a possible conflation. The 6th Report says construction was authorized 1903-11-10. Reclamation's Hondo project history says "authorized in 1904" and describes conditional authority given in November 1903. Hondo is marked low confidence.
2. **Carlsbad date.** The Secretary approved the purchase recommendation on 1905-11-28. The 1910 chronology gives construction authorization as 1906-02-24, and the JSON uses that date.
3. **Approximate coordinates** (each flagged in `verify`): Hondo Reservoir, Garden City pumping plant, Williston plant, Buford-Trenton barge site, Huntley diversion (the point is for the town/project area), Strawberry (the point is the reservoir centroid), and the Gunnison Tunnel (a single point on a 6-mile tunnel). All other structure coordinates come from Wikidata (entity URLs are in `sources`) and should be spot-checked against USGS/GNIS.
4. **Built after TR's term.** Several signature structures were finished after March 4, 1909: Shoshone/Buffalo Bill (1910), Belle Fourche (1911), East Park, Conconully and Clear Lake (1910), Lower Yellowstone and Dodson (1910), Willow Creek (1911), Elephant Butte (1916), and the Strawberry tunnel and dam (1912–13). The notes avoid saying they were completed under TR.
5. **Claims to check** in Reclamation project histories: Huntley being on ceded Crow land, the Strawberry tunnel length, and any "first/largest" superlatives (the notes deliberately leave these out).
6. **Acreage** is the 1910 planned irrigable area, not acres actually irrigated. Yakima shows only the two units authorized in 1905 (135,000 acres). Klamath shows the lower division only. North Platte shows the Interstate Canal unit only.
