/* Roosevelt's Public Lands — publiclands.labs.trlibrary.com
   Data: data/sites.json (one record per place) and data/lands.geojson (today's boundaries, keyed by sid).
   Built by the Theodore Roosevelt Presidential Library; extends Alice Wynd's first Public Lands Map. */
(() => {
const CATS = {
  forest:   {label:"National forests",  one:"National forest",       tab:"Forests",   c:"#1B4633", shape:"triangle", total:150},
  park:     {label:"National parks",    one:"National park",         tab:"Parks",     c:"#092A4D", shape:"circle",   total:5},
  monument: {label:"National monuments",one:"National monument",     tab:"Monuments", c:"#C9653F", shape:"square",   total:18},
  bird:     {label:"Bird reserves",     one:"Federal bird reserve",  tab:"Birds",     c:"#D9466A", shape:"diamond",  total:51},
  game:     {label:"Game preserves",    one:"National game preserve",tab:"Game",      c:"#6F9A33", shape:"cross",    total:4},
  water:    {label:"Reclamation projects",one:"Reclamation project", tab:"Water",     c:"#2B6F9E", shape:"drop",     total:24},
};
const PRE_C = "#B4AA92";        // lands protected before Sept 14, 1901
const ENL_C = "#2e7d4f";        // dashed edge on older forests Roosevelt enlarged
const NEW_C = "#E2703F";        // outline for places added in the selected year
const ORDER = Object.keys(CATS);

// Official national forest (forest reserve) area, gross acres, in millions.
const FOREST = [
  {y:1901, v:46.4,   when:"about 46 million acres when he took office (Sept. 14, 1901)", approx:true},
  {y:1902, v:58.85,  when:"58,850,925 acres on Sept. 1, 1902 (Report of the Forester)"},
  {y:1903, v:62.35,  when:"62,354,965 acres in 1903 (Gifford Pinchot)"},
  {y:1904, v:62.58,  when:"62,582,428 acres on June 30, 1904 (USDA annual report)"},
  {y:1905, v:85.69,  when:"85,693,422 acres on June 30, 1905 (USDA annual report)"},
  {y:1906, v:107.0,  when:"106,999,138 acres on June 30, 1906 (USDA annual report)"},
  {y:1907, v:150.83, when:"150,832,665 acres on June 30, 1907 (USDA annual report)"},
  {y:1908, v:167.98, when:"167,976,886 acres on June 30, 1908 (Report of the Forester)"},
  {y:1909, v:194.51, when:"194,505,325 acres in 1909 (Report of the Forester)"},
];
const YEARS = [1901,1902,1903,1904,1905,1906,1907,1908,1909];
const YSUB = {1901:"Took office", 1909:"Left office"};

const $ = id => document.getElementById(id);
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const fmtDate = s => { if(!s) return ""; const [y,m,d]=s.split("-").map(Number); return d ? `${MONTHS[m-1]} ${d}, ${y}` : (m ? `${MONTHS[m-1]} ${y}` : String(y)); };
const fmtN = n => n==null ? "—" : n>=1e6 ? (n/1e6).toFixed(n>=1e7?0:1).replace(/\.0$/,"")+"M" : n>=1e4 ? Math.round(n/1e3)+"K" : n.toLocaleString("en-US",{maximumFractionDigits:n<100?1:0});
const esc = s => String(s??"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

let LANDS=null, SITEFC=null, SITES=[], BYID=new Map(), BBOX=new Map(), BYDATE=[];
let year = 1909, active = new Set(ORDER), showPre = true, selected = null, listAll = false;

// ---------- State in the URL (so a view can be shared)
function readHash(){
  const h = new URLSearchParams(location.hash.slice(1));
  const y = +h.get("year"); if (YEARS.includes(y)) year = y;
  const c = h.get("show"); if (c){ const s = c.split(",").filter(k=>CATS[k]); if (s.length) active = new Set(s); }
  if (h.get("pre")==="0") showPre = false;
  return h.get("place");
}
function writeHash(){
  const h = new URLSearchParams();
  if (year!==1909) h.set("year",year);
  if (active.size!==ORDER.length) h.set("show",[...active].join(","));
  if (!showPre) h.set("pre","0");
  if (selected) h.set("place",selected);
  const s = h.toString(); history.replaceState(null,"",s ? "#"+s : location.pathname+location.search);
}

// ---------- Icons (drawn once, used on the map and in the panel)
function drawIcon(shape, color, px=40){
  const cv = document.createElement("canvas"); cv.width = cv.height = px;
  const g = cv.getContext("2d"), m = px/2, r = px*0.36;
  g.fillStyle = color; g.strokeStyle = "#fff"; g.lineWidth = px*0.08; g.lineJoin = "round";
  g.beginPath();
  if (shape==="circle") g.arc(m,m,r,0,Math.PI*2);
  else if (shape==="square") g.rect(m-r*0.85,m-r*0.85,r*1.7,r*1.7);
  else if (shape==="diamond"){ g.moveTo(m,m-r*1.1); g.lineTo(m+r*0.85,m); g.lineTo(m,m+r*1.1); g.lineTo(m-r*0.85,m); g.closePath(); }
  else if (shape==="triangle"){ g.moveTo(m,m-r*1.05); g.lineTo(m+r,m+r*0.75); g.lineTo(m-r,m+r*0.75); g.closePath(); }
  else if (shape==="cross"){ const a=r*0.38, b=r*1.0; g.moveTo(m-a,m-b); g.lineTo(m+a,m-b); g.lineTo(m+a,m-a); g.lineTo(m+b,m-a); g.lineTo(m+b,m+a); g.lineTo(m+a,m+a); g.lineTo(m+a,m+b); g.lineTo(m-a,m+b); g.lineTo(m-a,m+a); g.lineTo(m-b,m+a); g.lineTo(m-b,m-a); g.lineTo(m-a,m-a); g.closePath(); }
  else if (shape==="drop"){ g.moveTo(m,m-r*1.15); g.bezierCurveTo(m+r*0.2,m-r*0.6,m+r*0.95,m-r*0.05,m+r*0.95,m+r*0.35); g.arc(m,m+r*0.35,r*0.95,0,Math.PI); g.bezierCurveTo(m-r*0.95,m-r*0.05,m-r*0.2,m-r*0.6,m,m-r*1.15); g.closePath(); }
  g.stroke(); g.fill();
  return cv;
}
const ICONURL = {};
for (const k of ORDER) ICONURL[k] = drawIcon(CATS[k].shape, CATS[k].c, 32).toDataURL();

// ---------- Helpers on records
const yOf = s => s.year || +String(s.date).slice(0,4);
const sortKey = s => s.date || `${yOf(s)}-12-31`;
const inYear = s => s.era==="pre" ? showPre : yOf(s) <= year;
const visible = s => active.has(s.cat) && inYear(s);

// ---------- Map
const map = new maplibregl.Map({
  container:"map",
  style:"https://tiles.openfreemap.org/styles/positron",
  bounds: window.innerWidth<=760 ? [[-127.5,24.5],[-65.5,49.5]] : [[-125,24.5],[-66.5,49.5]],
  fitBoundsOptions:{padding: window.innerWidth<=760 ? {top:150,bottom:230,left:6,right:6} : {top:70,bottom:200,left:20,right:20}},
  minZoom:1.5, maxZoom:13, attributionControl:false, dragRotate:false, pitchWithRotate:false,
});
map.touchZoomRotate.disableRotation();
map.addControl(new maplibregl.NavigationControl({showCompass:false}),"bottom-right");
map.addControl(new maplibregl.AttributionControl({compact:true, customAttribution:"Boundaries: USFS, NPS, USFWS"}),"bottom-right");
map.addControl(new maplibregl.ScaleControl({unit:"imperial"}),"bottom-right");

const REGIONS = [
  ["Lower 48",[[-125,24.5],[-66.5,49.5]]],
  ["Alaska",[[-179,51],[-129,71.5]]],
  ["Hawaiian Islands",[[-179.5,18.5],[-154.5,29]]],
  ["Puerto Rico",[[-67.6,17.8],[-65.1,18.6]]],
];
for (const [n,b] of REGIONS){ const bt=document.createElement("button"); bt.textContent=n; bt.onclick=()=>map.fitBounds(b,{padding:pad(),duration:900}); $("jump").appendChild(bt); }
const pad = () => window.innerWidth<=760 ? {top:110,bottom:190,left:16,right:16} : {top:100,bottom:110,left:40,right:180};

function filters(){
  const cats = ["in",["get","cat"],["literal",[...active]]];
  const when = ["any", ["all",["==",["get","era"],"pre"], showPre], ["all",["==",["get","era"],"tr"],["<=",["get","year"],year]]];
  return {cats, when};
}
function applyFilters(){
  for (const m of (typeof MAPS!=="undefined"?MAPS:[map])) filterMap(m);
}
function filterMap(map){
  if (!map.getLayer("lands-fill")) return;
  const {cats,when} = filters();
  map.setFilter("lands-fill", ["all",cats,when]);
  map.setFilter("lands-line", ["all",cats,when]);
  map.setFilter("lands-new",  ["all",cats,["==",["get","era"],"tr"],["==",["get","year"],year],year>1901]);
  map.setFilter("lands-enl",  ["all",cats,["==",["get","era"],"pre"],["has","enl"],["<=",["get","enl"],year],showPre]);
  map.setFilter("pts", ["all",cats,when,["!",["all",["==",["get","cat"],"forest"],["get","shape"]]]]);
  map.setFilter("pts-new", ["all",cats,["==",["get","era"],"tr"],["==",["get","year"],year],year>1901,["!",["all",["==",["get","cat"],"forest"],["get","shape"]]]]);
  map.setFilter("sel-line", ["==",["get","sid"],selected||""]);
  map.setFilter("sel-pt", ["all",["==",["get","id"],selected||""],["!",["all",["==",["get","cat"],"forest"],["get","shape"]]]]);
}


function dress(m, inset){
  // Soften the basemap toward the Library's paper tone
  for (const l of m.getStyle().layers){
    if (l.type==="background") m.setPaintProperty(l.id,"background-color","#F4F2EA");
    if (l.id==="water" || l.id.startsWith("water")) { try{ m.setPaintProperty(l.id,"fill-color","#DCE6E8"); }catch(e){} }
  }
  const firstLabel = m.getStyle().layers.find(l=>l.type==="symbol")?.id;
  if (inset) for (const l of m.getStyle().layers) if (l.type==="symbol") m.setLayoutProperty(l.id,"visibility","none");
  for (const k of ORDER){
    m.addImage("i-"+k, drawIcon(CATS[k].shape, CATS[k].c, 48).getContext("2d").getImageData(0,0,48,48), {pixelRatio:2});
    m.addImage("p-"+k, drawIcon(CATS[k].shape, PRE_C, 48).getContext("2d").getImageData(0,0,48,48), {pixelRatio:2});
  }
  const sz = inset ? 0.55 : 1;
  m.addSource("lands",{type:"geojson",data:LANDS,promoteId:"sid"});
  m.addSource("sites",{type:"geojson",data:SITEFC});
  m.addLayer({id:"lands-fill",type:"fill",source:"lands",paint:{"fill-color":fillColor,"fill-opacity":["case",["==",["get","era"],"pre"],0.55,0.5]}}, firstLabel);
  m.addLayer({id:"lands-line",type:"line",source:"lands",paint:{"line-color":["case",["==",["get","era"],"pre"],"#9a8f74",["match",["get","cat"],...ORDER.flatMap(k=>[k,CATS[k].c]),"#666"]],"line-width":["interpolate",["linear"],["zoom"],3,0.3,8,1.2],"line-opacity":0.8}}, firstLabel);
  m.addLayer({id:"lands-enl",type:"line",source:"lands",paint:{"line-color":ENL_C,"line-width":["interpolate",["linear"],["zoom"],3,1,8,2.4],"line-dasharray":[2,1.5]}}, firstLabel);
  m.addLayer({id:"lands-new",type:"line",source:"lands",paint:{"line-color":NEW_C,"line-width":["interpolate",["linear"],["zoom"],3,1.6,8,3.2]}}, firstLabel);
  m.addLayer({id:"sel-line",type:"line",source:"lands",paint:{"line-color":"#25282A","line-width":3.2}});
  m.addLayer({id:"sel-pt",type:"circle",source:"sites",paint:{"circle-radius":["interpolate",["linear"],["zoom"],3,13*sz,9,18],"circle-color":"rgba(0,0,0,0)","circle-stroke-color":"#25282A","circle-stroke-width":2.5}});
  m.addLayer({id:"pts-new",type:"circle",source:"sites",paint:{"circle-radius":["interpolate",["linear"],["zoom"],3,9*sz,9,14],"circle-color":"rgba(226,112,63,.18)","circle-stroke-color":NEW_C,"circle-stroke-width":1.8}});
  m.addLayer({id:"pts",type:"symbol",source:"sites",layout:{
    "icon-image":["concat",["case",["==",["get","era"],"pre"],"p-","i-"],["get","cat"]],
    "icon-size": inset ? 0.6 : ["interpolate",["linear"],["zoom"],2,0.62,6,0.85,10,1.05],
    "icon-allow-overlap":true,"icon-ignore-placement":true,
    "symbol-sort-key":["match",["get","cat"],"park",1,"monument",2,"game",3,"water",4,"bird",5,6]}});
}

// ---------- Hover and click, shared by the main map and the insets
function attach(m, onEmpty){
  const tip = $("tip");
  const pickAt = p => { const fs = m.queryRenderedFeatures(p,{layers:["pts","lands-fill"]}); if(!fs.length) return null; const pt = fs.find(f=>f.layer.id==="pts"); const f = pt || fs[0]; return BYID.get(f.properties.id || f.properties.sid); };
  m.on("mousemove", e => {
    const s = pickAt(e.point);
    m.getCanvas().style.cursor = s || onEmpty ? "pointer" : "";
    if (!s){ tip.hidden = true; return; }
    tip.innerHTML = `${esc(s.name)}<span>${esc(s.era==="pre"?"Protected before 1901":(CATS[s.cat].one))} · ${esc(s.st)} · ${s.era==="pre"?yOf(s):s.y}</span>`;
    tip.hidden = false;
    const v = document.querySelector(".viewer").getBoundingClientRect(), c = m.getContainer().getBoundingClientRect();
    let x = c.left-v.left+e.point.x+14, y = c.top-v.top+e.point.y+14;
    if (x+270>v.width) x -= 290; if (y+50>v.height) y -= 70;
    tip.style.left=x+"px"; tip.style.top=y+"px";
  });
  m.on("mouseout", ()=>tip.hidden=true);
  m.on("click", e => { const s = pickAt(e.point); if (s) select(s.id,!!onEmpty); else if (onEmpty) onEmpty(); });
}

// ---------- Inset maps for Alaska, Hawaii and Puerto Rico
const INSETS = [
  {id:"ak", label:"Alaska",         b:[[-179.2,51.2],[-129.5,71.4]]},
  {id:"hi", label:"Hawaiian Islands", b:[[-178.6,18.7],[-154.6,28.6]]},
  {id:"pr", label:"Puerto Rico",    b:[[-67.35,17.85],[-65.2,18.55]]},
];
const MAPS = [map];
function makeInsets(){
  const wrap = $("insets");
  for (const r of INSETS){
    const box = document.createElement("div"); box.className = "inset inset-"+r.id;
    box.innerHTML = `<span class="lbl">${r.label}</span><div class="im"></div>`;
    box.title = `Zoom the main map to ${r.label}`;
    wrap.appendChild(box);
    const m = new maplibregl.Map({container:box.querySelector(".im"), style:"https://tiles.openfreemap.org/styles/positron",
      bounds:r.b, fitBoundsOptions:{padding:6}, dragPan:false, scrollZoom:false, boxZoom:false, dragRotate:false, keyboard:false, doubleClickZoom:false, touchZoomRotate:false, touchPitch:false, attributionControl:false, fadeDuration:0});
    m.on("load", ()=>{ dress(m,true); attach(m, ()=>map.fitBounds(r.b,{padding:pad(),duration:900})); applyFilters(); });
    const ro = new ResizeObserver(()=>{ m.resize(); m.fitBounds(r.b,{padding:6,duration:0}); }); ro.observe(box);
    MAPS.push(m);
  }
}

const fillColor = ["case",["==",["get","era"],"pre"],PRE_C,["match",["get","cat"],...ORDER.flatMap(k=>[k,CATS[k].c]),"#888"]];

map.on("load", async () => {
  const [sites, lands] = await Promise.all([fetch("data/sites.json").then(r=>r.json()), fetch("data/lands.geojson").then(r=>r.json())]);
  SITES = sites.map(s=>({...s, y:yOf(s)}));
  SITES.forEach(s=>BYID.set(s.id,s));
  BYDATE = SITES.slice().sort((a,b)=>sortKey(a).localeCompare(sortKey(b)) || a.name.localeCompare(b.name));
  for (const f of lands.features){
    const b = BBOX.get(f.properties.sid) || [180,90,-180,-90];
    const walk = c => typeof c[0]==="number" ? (b[0]=Math.min(b[0],c[0]),b[1]=Math.min(b[1],c[1]),b[2]=Math.max(b[2],c[0]),b[3]=Math.max(b[3],c[1])) : c.forEach(walk);
    walk(f.geometry.coordinates); BBOX.set(f.properties.sid,b);
  }

  LANDS = lands;
  SITEFC = {type:"FeatureCollection",features:SITES.map(s=>({type:"Feature",geometry:{type:"Point",coordinates:[s.lon,s.lat]},properties:{id:s.id,cat:s.cat,era:s.era,year:s.y,shape:!!s.shape}}))};
  dress(map,false);
  makeInsets();

  attach(map);
  document.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
  const start = readHash();
  renderAll();
  if (start && BYID.has(start)) select(start,true);
});

// ---------- Tabs, legend, picks
function renderTabs(){
  const nav = $("tabs"); nav.innerHTML = "";
  const all = active.size===ORDER.length;
  const mk = (k,label) => { const b=document.createElement("button"); b.textContent=label; const on = k==="all" ? all : (!all && active.size===1 && active.has(k)); b.setAttribute("aria-pressed",on); if(k!=="all") b.style.setProperty("--c",CATS[k].c); b.onclick=()=>{ active = new Set(k==="all"?ORDER:[k]); update(); }; nav.appendChild(b); };
  mk("all","All lands"); ORDER.forEach(k=>mk(k,CATS[k].tab));
  const one = !all && active.size===1 ? [...active][0] : null;
  document.documentElement.style.setProperty("--layer", one ? CATS[one].c : CATS.forest.c);

  const pick = $("pick"); pick.innerHTML = "";
  for (const k of ORDER){
    const b=document.createElement("button"); b.style.setProperty("--c",CATS[k].c); b.setAttribute("aria-pressed",active.has(k));
    b.innerHTML = `<img alt="" src="${ICONURL[k]}">${esc(CATS[k].label)}`;
    b.onclick = ()=>{ if (active.has(k)) { if (active.size>1) active.delete(k); } else active.add(k); update(); };
    pick.appendChild(b);
  }
  $("showpre").checked = showPre;

  const lg = $("legend");
  lg.innerHTML = ORDER.filter(k=>active.has(k)).map(k=>`<div><img alt="" src="${ICONURL[k]}" width="14" height="14">${esc(CATS[k].label)}</div>`).join("")
    + (showPre ? `<div><i style="background:${PRE_C}"></i>Protected before Sept. 1901</div>` : "")
    + (showPre && active.has("forest") ? `<div><i class="enl"></i>Older forest he enlarged</div>` : "")
    + (year>1901 ? `<div><i class="new"></i>Added in ${year}</div>` : "");
}

// ---------- Timeline
const tInput = $("t"), playBtn = $("play");
function renderTicks(){
  const row = $("tickrow"); row.innerHTML = "";
  for (const y of YEARS){ const b=document.createElement("button"); b.className = y===year?"on":""; b.innerHTML = `<span class="full">${y}</span><span class="short">’${String(y).slice(2)}</span>${YSUB[y]?`<small>${y===1901?"Took office":"Left office"}</small>`:""}`; b.tabIndex=-1; b.onclick=()=>{ stop(); setYear(y); }; row.appendChild(b); }
}
function setYear(y){ year = y; tInput.value = y; update(); }
tInput.addEventListener("input", ()=>{ stop(); setYear(+tInput.value); });
let timer = null;
function stop(){ clearInterval(timer); timer=null; playBtn.setAttribute("aria-pressed","false"); playBtn.textContent="▶"; playBtn.setAttribute("aria-label","Play 1901 to 1909"); }
playBtn.onclick = () => {
  if (timer) return stop();
  if (year>=1909) setYear(1901);
  playBtn.setAttribute("aria-pressed","true"); playBtn.textContent="❚❚"; playBtn.setAttribute("aria-label","Pause");
  timer = setInterval(()=>{ if (year>=1909) return stop(); setYear(year+1); }, 1600);
};
$("showpre").onchange = e => { showPre = e.target.checked; update(); };

// ---------- Panel: tally, charts
function renderTally(){
  $("stamp").textContent = year;
  $("stampsub").textContent = YSUB[year] || "";
  $("yh-label").textContent = year===1901 ? "When he took office" : year===1909 ? "Through March 4, 1909" : `Through ${year}`;
  const tr = SITES.filter(s=>s.era==="tr");
  const newN = tr.filter(s=>s.y===year && year>1901 && s.cat!=="forest").length;
  $("yh-new").textContent = year===1901 ? "Sept. 14, 1901" : (newN ? `+${newN} places in ${year}` : "");
  const box = $("tally"); box.innerHTML = "";
  for (const k of ORDER){
    const b = document.createElement("button"); b.style.setProperty("--c",CATS[k].c);
    b.setAttribute("aria-pressed", active.size===1 && active.has(k));
    b.onclick = ()=>{ active = (active.size===1 && active.has(k)) ? new Set(ORDER) : new Set([k]); update(); };
    if (k==="forest"){
      const f = FOREST.find(d=>d.y===year), prev = FOREST.find(d=>d.y===year-1);
      b.innerHTML = `<b>${f.approx?"~":""}${f.v.toFixed(1)}M <small>acres</small></b><span>national forest${year===1909?", in about 150 forests":""}</span><div class="bar"><i style="width:${(f.v/194.51*100).toFixed(1)}%"></i></div>` + (prev ? `<em class="plus">+${(f.v-prev.v).toFixed(1)}M</em>` : "");
    } else {
      const n = tr.filter(s=>s.cat===k && s.y<=year).length, add = tr.filter(s=>s.cat===k && s.y===year && year>1901).length;
      b.innerHTML = `<b>${n} <small>of ${CATS[k].total}</small></b><span>${esc(CATS[k].label.toLowerCase())}</span><div class="bar"><i style="width:${(n/CATS[k].total*100).toFixed(1)}%"></i></div>` + (add ? `<em class="plus">+${add}</em>` : "");
    }
    box.appendChild(b);
  }
}

function renderForestChart(){
  const W=350,H=150,L=30,B=22,T=14, bw=(W-L)/YEARS.length;
  const ys = v => T + (H-T-B)*(1-v/200);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="National forest acreage by year, 1901 to 1909, from about 46 million to 194.5 million acres">`;
  for (const g of [0,50,100,150,200]) s += `<line x1="${L}" x2="${W}" y1="${ys(g)}" y2="${ys(g)}" stroke="#ebe7dc"/><text x="${L-6}" y="${ys(g)+3.5}" text-anchor="end" font-size="9.5" fill="#7a7f7b">${g}M</text>`;
  FOREST.forEach((d,i)=>{
    const x = L+i*bw+bw*0.16, w = bw*0.68, on = d.y===year, past = d.y<=year;
    const base = Math.min(d.v,46.4);
    s += `<rect x="${x}" y="${ys(d.v)}" width="${w}" height="${ys(0)-ys(d.v)}" rx="2" fill="${past?CATS.forest.c:"#d9d4c6"}" opacity="${on?1:past?0.6:1}"/>`;
    s += `<rect x="${x}" y="${ys(base)}" width="${w}" height="${ys(0)-ys(base)}" rx="2" fill="${PRE_C}" opacity="${past?0.95:0.5}"/>`;
    if (on) s += `<text x="${x+w/2}" y="${ys(d.v)-5}" text-anchor="middle" font-size="11" font-weight="700" fill="#163728">${d.v.toFixed(1)}M</text>`;
    s += `<text x="${x+w/2}" y="${H-6}" text-anchor="middle" font-size="9.5" fill="${on?"#163728":"#7a7f7b"}" font-weight="${on?700:400}">’${String(d.y).slice(2)}</text>`;
  });
  s += `</svg>`;
  $("forestchart").innerHTML = s;
  $("forestchart").querySelectorAll("rect").forEach((r,i)=>{ r.style.cursor="pointer"; r.addEventListener("click",()=>{stop(); setYear(YEARS[Math.floor(i/2)]);}); });
  const f = FOREST.find(d=>d.y===year);
  $("forestnote").innerHTML = `Tan shows the forest reserves in place when Roosevelt took office. ${year===1901?"":`Shown for ${year}: ${esc(f.when)}.`}`;
}

function renderGrid(){
  const cats = ORDER.filter(k=>k!=="forest"), cols = YEARS.slice(1);
  const W=350, L=96, R=6, rowH=26, T=16, cw=(W-L-R)/cols.length, H=T+rowH*cats.length+4;
  const tr = SITES.filter(s=>s.era==="tr");
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Number of places added each year by kind">`;
  const ci = cols.indexOf(year);
  if (ci>=0) s += `<rect x="${L+ci*cw+1}" y="0" width="${cw-2}" height="${H}" rx="5" fill="#f5f2eb"/>`;
  cols.forEach((y,i)=> s += `<text x="${L+i*cw+cw/2}" y="11" text-anchor="middle" font-size="9.5" fill="${y===year?"#163728":"#7a7f7b"}" font-weight="${y===year?700:400}">’${String(y).slice(2)}</text>`);
  cats.forEach((k,r)=>{
    const cy = T+r*rowH+rowH/2+2;
    s += `<text x="0" y="${cy+4}" font-size="11" fill="#25282A">${esc(CATS[k].tab)}</text>`;
    cols.forEach((y,i)=>{
      const n = tr.filter(d=>d.cat===k && d.y===y).length; const cx = L+i*cw+cw/2;
      if (!n){ s += `<circle cx="${cx}" cy="${cy}" r="1.6" fill="#d9d4c6"/>`; return; }
      const rad = Math.min(11, 4+Math.sqrt(n)*2.2), on = y<=year;
      s += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${CATS[k].c}" opacity="${on?0.95:0.25}"/><text x="${cx}" y="${cy+3.5}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" opacity="${on?1:0.7}">${n}</text>`;
    });
  });
  s += `</svg>`;
  $("grid").innerHTML = s;
}

// ---------- List
function renderIndex(){
  const q = $("q").value.trim().toLowerCase();
  const list = BYDATE.filter(visible).filter(d=>!q || d.name.toLowerCase().includes(q) || d.st.toLowerCase().includes(q) || (d.today||"").toLowerCase().includes(q));
  const ul = $("index"); ul.innerHTML = "";
  if (!list.length){ ul.innerHTML = `<li class="none">Nothing matches. Clear the search, show more kinds of land, or move the timeline later.</li>`; return; }
  const cap = listAll || q ? list.length : 60;
  for (const d of list.slice(0,cap)){
    const li = document.createElement("li");
    const c = d.era==="pre" ? PRE_C : CATS[d.cat].c;
    li.innerHTML = `<button type="button"><i style="--c:${c}" aria-label="${d.y}">’${String(d.y).slice(2)}</i><b style="font-weight:inherit">${esc(d.name)}</b><span>${esc(d.st)}</span></button>`;
    li.querySelector("button").onclick = ()=>select(d.id,true);
    ul.appendChild(li);
  }
  if (list.length>cap){ const li=document.createElement("li"); li.className="more"; li.innerHTML=`<button type="button">Show all ${list.length}</button>`; li.querySelector("button").onclick=()=>{listAll=true;renderIndex();}; ul.appendChild(li); }
}
$("q").addEventListener("input", renderIndex);

// ---------- Record view
function select(id, fly){
  const s = BYID.get(id); if (!s) return;
  selected = id;
  if (!visible(s)){ active.add(s.cat); if (s.era==="pre") showPre = true; else if (s.y>year) year = s.y; tInput.value = year; }
  $("overview").hidden = true; $("record").hidden = false;
  document.documentElement.style.setProperty("--layer", s.era==="pre" ? PRE_C : CATS[s.cat].c);
  $("r-eyebrow").textContent = (s.era==="pre" ? `${CATS[s.cat].one} · protected before Roosevelt` : CATS[s.cat].one);
  $("r-name").textContent = s.name;
  $("r-year").textContent = s.y;
  $("r-date").textContent = s.date && s.date.length>4 ? fmtDate(s.date) : (s.era==="pre" ? "first protected" : "first protected by TR");
  $("r-acres").textContent = s.acres ? fmtN(s.acres) : "—";
  $("r-acres-l").textContent = s.acres ? (s.acres_label||"acres") : "acreage not recorded";
  $("r-state").textContent = s.st;
  $("r-note").textContent = s.note || "";
  const facts = [];
  if (s.cat==="water") facts.push(["Signature structure", s.today]);
  else if (s.today) facts.push(["Today", s.today]);
  if (s.enl) facts.push(["Enlarged by Roosevelt", `Beginning in ${s.enl}`]);
  if (s.lineage) facts.push(["Began as", s.lineage]);
  facts.push(["On the map", s.shape ? (s.approx_shape ? "Shape is approximate: today's North Kaibab Ranger District, which covers most of the 1906 preserve" : "Shape shows today's boundary, which may differ from the original") : "Shown as a marker"]);
  $("r-facts").innerHTML = facts.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
  const src = (s.sources||[]).filter(u=>/^https?:/.test(u)).slice(0,4);
  $("r-src").innerHTML = src.length ? "Sources: " + src.map(u=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(new URL(u).hostname.replace(/^www\./,""))}</a>`).join(" · ") : "";
  const list = BYDATE.filter(visible), i = list.findIndex(d=>d.id===id);
  $("prev").disabled = i<=0; $("next").disabled = i<0 || i>=list.length-1;
  $("prev").onclick = ()=>i>0 && select(list[i-1].id,true);
  $("next").onclick = ()=>i<list.length-1 && select(list[i+1].id,true);
  document.querySelector(".panel-body").scrollTop = 0;
  if (fly){
    const b = BBOX.get(id);
    if (b) map.fitBounds([[b[0],b[1]],[b[2],b[3]]],{padding:pad(),maxZoom:s.cat==="bird"?11:9,duration:1100});
    else map.flyTo({center:[s.lon,s.lat],zoom:Math.max(map.getZoom(),7.5),duration:1100});
  }
  update(true);
}
$("back").onclick = () => { selected=null; $("record").hidden = true; $("overview").hidden = false; update(); };

function renderAll(){ tInput.value = year; renderTabs(); renderTicks(); renderTally(); renderForestChart(); renderGrid(); renderIndex(); applyFilters(); writeHash(); }
function update(keepRecord){
  tInput.value = year;
  if (!keepRecord && selected && !visible(BYID.get(selected))){ selected=null; $("record").hidden=true; $("overview").hidden=false; }
  renderAll();
}
})();
