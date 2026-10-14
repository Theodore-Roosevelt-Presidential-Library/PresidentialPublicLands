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

---

## Follow-up (Oct 14)

### 1. Where "24" comes from

**Earliest source found: C. J. Blanchard of the Reclamation Service, early 1906.** Blanchard was the Service's statistician and publicist. He wrote "National Reclamation of Arid Lands," *Bulletin of the American Geographical Society* 38, no. 4 (1906): 209–10, free on JSTOR Early Journal Content: https://archive.org/details/jstor-197876. It contains two key passages:

> "Out of nearly 100 projects examined, all but 24 have been eliminated for the present, and during the next three years the engineers will concentrate their entire attention upon the building of these great works." (p. 209)

> "As before stated, in the sixteen States and Territories 24 projects have been approved, and on 13 of these actual construction is now going on." (p. 210)

The article opens "The year just closed…" and leaves out Sun River (approved 1906-02-26) and Orland (1906-12-18), so it was written in about January–February 1906. It is a **mid-presidency snapshot**. It does not count the projects begun by the end of Roosevelt's term. Its project write-ups and allotment table name:

- 22 projects: Salt River, Truckee-Carson, Uncompahgre, North Platte, Shoshone, Lower Yellowstone, Huntley, Minidoka, Klamath, Belle Fourche, Hondo, Yuma, Sunnyside, Tieton, Okanogan, Milk River, Payette-Boise, Umatilla, Rio Grande (Leasburg), Carlsbad, Strawberry Valley and Garden City.
- The "North Dakota Pumping Projects": Williston, Nesson, Buford-Trenton and Bismarck, of which "plans are well advanced on two."

Counting Sunnyside and Tieton separately and the two advanced North Dakota projects (Williston and Buford-Trenton) gives exactly 24. Blanchard does not print a numbered list, so this reconstruction is **probable, not certain**.

Compared with our 25 Secretary-authorized projects, Blanchard's 24 **includes Rio Grande and splits Yakima into two**, and **leaves out Sun River and Orland**. The figure is the same, but the list behind it is different.

**Later repetitions of "24":**

- **J. S. Rogers, *Hondo Project* (Bureau of Reclamation project history, 2006; rev. 2013), p. 6:** "It examined nearly 100 projects, and from those chose twenty-four, of which Hondo was a part." Footnote 7 cites Blanchard 1906, p. 209. https://www.usbr.gov/history/ProjectHistories/HONDO%20PROJECT%20MASTER%20ZLA%20HC%20FC%20BC%20IC%20SC%207.2010.pdf
- **Lane Sunwall, Dakota Datebook (Prairie Public), entry for June 17 (written 2011; reposted 2022-05-22):** "Among the twenty-four irrigation projects designated in the act was the Lower Yellowstone Project…" https://news.prairiepublic.org/show/dakota-datebook-archive/2022-05-22/theodore-roosevelt-and-the-reclamation-act-of-1902. The entry also appears in the UND Digital Press book *Dakota Datebook* (2019). Its cited source, Clay Jenkinson's "Theodore Roosevelt's Footprint on North Dakota" (the old theodorerooseveltcenter.org/TR_Footprint.asp page), could not be retrieved because there is no Wayback snapshot and Wayback is blocked from here. The wording is also **wrong**: the 1902 Act designated no projects.
- **TRPL pages (unsourced):** /tr/presidency/conservation/reclamation ("Between 1902 and the end of Roosevelt's presidency, the Reclamation Service initiated 24 reclamation projects") and /tr/conservation/by-the-numbers ("Under Roosevelt's leadership, 24 reclamation projects were initiated or funded"; caption "among 24 federal reclamation projects launched under the 1902 Newlands Act").
- **Checked, with no project count found:** NPS "Theodore Roosevelt and Conservation" (THRO, updated 2017-11-16) gives forests, bird reserves, game preserves, parks, monuments and acreage, but **no reclamation figure**. https://www.nps.gov/thro/learn/historyculture/theodore-roosevelt-and-conservation.htm. Water Education Foundation's Aquapedia also has no count.

**Other counts in authoritative sources (for comparison):**

| Count | Source | Exact words | Basis |
|---|---|---|---|
| 21 | John A. Gable, "President Theodore Roosevelt's record on conservation," *Theodore Roosevelt Association Journal* (1984), as summarized by the TR Center catalog: https://www.theodorerooseveltcenter.org/digital-library/o307512 | "21 reclamation projects" (catalog summary, not seen in the original) | Unknown |
| 23 | USBR, "Looking Back at 118 Years" slide deck (2020) | "1903-1907 – 23 projects approved by the Secretary of the Interior" | Secretary approvals, list not given |
| 24 | Blanchard (1906), as above | "in the sixteen States and Territories 24 projects have been approved" | Approved by early 1906 |
| about 25 | USBR, *Brief History of the Bureau of Reclamation* (c. 2005), https://www.usbr.gov/history/briefhis.pdf | "Between 1903 and 1906, about 25 projects were authorized throughout the West." | Authorized 1903–06 |
| 28 | **Theodore Roosevelt, *An Autobiography* (1913), ch. XI, "The Natural Resources of the Nation"** | "The twenty-eight projects begun in the years 1902 to 1906 contemplated the irrigation of more than three million acres and the watering of more than thirty thousand farms." | Begun 1902–06. The text also says "Every item of the whole great plan of Reclamation now in effect was undertaken between 1902 and 1906." |
| 28 | Bailey Willis, "Water Circulation and Its Control," *Report of the National Conservation Commission* (S. Doc. 676, 60th Cong., 2d sess., Feb. 1909), vol. II, p. ~693, citing C. J. Blanchard, "Home-Making by the Government," *Nat. Geog. Mag.*, April 1908 | "The Reclamation Service has 28 projects in various stages of progress." | Service's 1908 count |
| 29 | F. H. Newell, "Irrigation," same *Report*, vol. II, p. 60 | "The Reclamation Service has 29 projects in various stages of construction; these contemplate the ultimate irrigation of 2,700,000 acres…" | The table includes later or partial units such as Grand Valley, St. Mary, Wapato and Oklahoma |
| about 30 | USBR, "The Bureau of Reclamation: A Very Brief History," https://www.usbr.gov/history/borhist.html | "From 1902 to 1907, Reclamation began about 30 projects" | Includes units and secondary projects |

Sources: Roosevelt's Autobiography text is Project Gutenberg #3335 (1913 Macmillan text), https://www.gutenberg.org/ebooks/3335. The *Report of the National Conservation Commission* vol. II is at https://archive.org/details/cu31924032356366.

Roosevelt's annual messages for 1902–1908 (Gutenberg #5032) discuss reclamation in 1903, 1904, 1905, 1907 and 1908 but **give no project count**. Gifford Pinchot's *Breaking New Ground* (1947) could not be checked because the archive.org copies are lending-only. The Reclamation Service's 5th–9th annual reports contain **no stated total** of projects. They give chronological lists of authorizations.

**Other counting traps found in the 5th Annual Report's "Chronological list of authorizations and allotments" (to July 12, 1906, pp. 43–44, https://archive.org/details/annualreportbur26unkngoog):**

- **Malheur project, Oregon**, approved 1904-05-11 with $2,000,000 set aside. The allotment was reduced on 1906-01-08 to fund Umatilla, and the project was not built under TR. It is not in our 25.
- **Palouse, WA**: "preliminary approval" 1904-11-14.
- **St. Mary (Milk River)**: approved "tentatively" 1905-03-25, construction authorized 1906-01-15.
- **Uncompahgre**: approved in general terms 1903-03-14, with its allotment approved 1904-06-07.
- **North Dakota pumping projects**: approved 1904-11-18, with money set aside 1906-01-23 "for Buford-Trenton, Williston, and Nesson projects". Nesson was never built.
- **Wapato (Yakima Indian Reservation)**: approved 1906-06-16.

The 6th Report lists only one new project authorization after July 1906 through June 1907: **Orland, approved conditionally 1906-12-18.** This confirms that no new primary project was authorized after Orland during TR's term.

**Conclusion:** No primary source ties "24" to the end of Roosevelt's presidency. The number traces back to a Reclamation Service count from early 1906. Roosevelt himself, writing in 1913, said **twenty-eight**, and the Service's own figures in 1908–09 were 28–29. Our Secretary-authorization count, which excludes Rio Grande, also reaches 24, but with a different list of projects.

**Recommended public wording** (pick one):

- **Preferred:** "Under the 1902 Reclamation Act, Roosevelt's Interior Department approved about two dozen federal irrigation projects across 16 western states and territories, nearly all of them by the end of 1906." This is supported by Blanchard 1906 (24 projects, 16 states and territories), USBR (about 25) and our 25-entry list.
- **If a hard number is required, with its basis stated:** "By the time Roosevelt left office, the Secretary of the Interior had authorized construction on 24 reclamation projects under the 1902 Act (not counting the Rio Grande Project, which Congress funded in 1907)." The map must then show 24 markers, or mark Rio Grande separately.
- **Roosevelt in his own words** (verbatim, *An Autobiography*, 1913, ch. XI): "The twenty-eight projects begun in the years 1902 to 1906 contemplated the irrigation of more than three million acres and the watering of more than thirty thousand farms." Present this as Roosevelt's claim, not as the Library's count. Don't quote the nearby sentence dating the Reclamation Service's independence to "the spring of 1908". The Service was separated from the USGS on March 9, 1907, so that line is TR's own error.

**Fix on TRPL pages:** Change "the Reclamation Service initiated 24 reclamation projects" between 1902 and the end of the presidency to one of the wordings above. The Dakota Datebook claim that the Act "designated" 24 projects should not be repeated. Also note that the reclamation page's list of states served omits **Oregon and Washington** (Klamath, Umatilla, Okanogan and Yakima).

### 2. Hondo Project authorization date: **1903-11-10** (resolved)

| Date | What it is | Source |
|---|---|---|
| 1903-11-03 | Director C. D. Walcott (USGS) approves the chief engineer's recommendation to build | 9th Annual Report (1911), p. 209 |
| **1903-11-10** | **Secretary of the Interior approves the project.** This is the second Secretary authorization under the Act, after the first five on 1903-03-14 | 5th Annual Report (1906), p. 43, chronological list item 2: "Nov. 10, 1903, approving Hondo project, New Mexico, estimated cost. . $240,000". 6th Annual Report (1907), p. 152: "On November 10, 1903, construction of the project was authorized." 9th Annual Report, p. 209: "on November 10 the Secretary of the Interior granted authority to take such further action as might be necessary." |
| 1904-06-06 | Board of engineers (Wisner, Sanders, Savage) recommends construction as planned | 9th Report, p. 209 |
| **1904-09-06** | **Bids opened at Roswell.** A board hearing on the Pecos Irrigation Co. protest was also held "September 6" (Rogers 2006, p. 9) | 6th Report, p. 152: "Bids for construction were opened at Roswell, N. Mex., on September 6, 1904." 9th Report, p. 210: "Proposals were opened on September 6, 1904" |
| 1904-12-03 / 12-05 | Reservoir site conveyed to U.S. / construction contracts signed | 9th Report, pp. 209–10 |
| Dec 1904 | First construction (telephone line, watchman's house) | 9th Report, p. 210 |

The 9th Report's one-line "Chronological summary" says "Construction authorized by Secretary September 6, 1904". That **contradicts the same report's narrative two pages later** and matches the bid-opening date, so it is almost certainly a clerical conflation. The USBR project history's statement that Hondo was "one of the projects authorized in 1904" (Rogers, p. 5, citing Rowley 2006) is a general statement, and Rogers himself describes the November 1903 authority on p. 7. The *Third Annual Report* (1903–04), which holds the original Hondo write-up, was not found in full text on archive.org and was not checked.

**JSON changes:** Hondo `date` is now 1903-11-10 and `confidence` is now medium; the coordinate is still approximate. Sources are updated with the 5th Report. The list is re-sorted so Hondo is sixth, before Shoshone. A `count_basis` note was added to every entry, recording whether the project is in the recommended 24 and whether it is in Blanchard's 1906 list of 24. A Sun River note was added: the Secretary approved it 1906-02-26 with "work of construction to be deferred", then approved construction 1906-03-19. The `in_count_24` flags are unchanged (24 true; Rio Grande false).
