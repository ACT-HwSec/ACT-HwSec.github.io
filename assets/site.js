/* HwSec site engine: language switch, header/footer, power-trace plots, page rendering.
   Content lives in data.js — you normally don't need to edit this file. */

/* ---------- language ---------- */
let LANG = (() => {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "vi") return q;
    const s = localStorage.getItem("hwsec-lang");
    if (s === "en" || s === "vi") return s;
  } catch (e) {}
  return (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
})();
document.documentElement.lang = LANG;

const T = x => (x == null ? "" : typeof x === "string" ? x : (x[LANG] || x.en || ""));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const isTodo = s => typeof s === "string" && s.startsWith("TODO");
const H = x => { const s = T(x); return isTodo(s) ? `<mark class="todo">${esc(s)}</mark>` : esc(s); };
const B = (en, vi) => `<span class="en">${en}</span><span class="vi">${vi}</span>`;
const $ = s => document.querySelector(s);

/* ---------- shared helpers ---------- */
const MEMBERS = PEOPLE.filter(p => p.group !== "alumni");
const ALIASES = PEOPLE.flatMap(p => p.aliases || []);
const ME = new RegExp("(^|, )(" + ALIASES.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?=,|$)", "g");
const peopleOf = pub => MEMBERS.filter(p => (p.aliases || []).some(a => new RegExp("(^|, )" + a + "(,|$)").test(pub.a)));
const initials = n => { const w = n.split(/[\s-]/).filter(Boolean); return (w[0][0] + w[w.length - 1][0]).toUpperCase(); };
const firstSentence = s => { const i = s.indexOf(". "); return i > 0 ? s.slice(0, i + 1) : s; };
const portrait = p => `<div class="portrait" aria-hidden="${p.photo ? "false" : "true"}">${p.photo ? `<img src="assets/people/${esc(p.photo)}" alt="${esc(p.name)}">` : initials(p.name)}</div>`;
const pname = p => LANG === "vi" && p.nameVi ? p.nameVi : p.name;
const link = (label, url) => isTodo(url) ? `<mark class="todo">${esc(label)}: ${esc(url)}</mark>`
  : url.includes("@") && !url.startsWith("http") ? `<a href="mailto:${esc(url)}">${esc(url)}</a>`
  : `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
const emailHtml = () => isTodo(SITE.email) ? H(SITE.email) : `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;
const kindLabel = k => k === "journal" ? B("Journal", "Tạp chí") : k === "thesis" ? B("Thesis", "Luận án") : B("Conference", "Hội nghị");
const papersN = n => B(`${n} paper${n === 1 ? "" : "s"}`, `${n} bài`);

function pubRow(p, compact) {
  const url = p.url || "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + p.t + '"');
  const authors = esc(p.a).replace(ME, (m, pre, name) => `${pre}<strong>${name}</strong>`);
  return `<article class="pub">
    <div>
      <p class="t"><a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.t)}</a></p>
      <p class="a">${authors}</p>
      <p class="v"><span class="k">${kindLabel(p.k)}</span>${esc(p.v)}${p.v ? ", " : ""}${p.y}</p>
    </div>
    <div class="c">${!compact && p.c ? `<b>${p.c}</b><span>${B("citations", "trích dẫn")}</span>` : ""}</div>
  </article>`;
}

/* ---------- power traces ----------
   An illustration, not a measurement: a clocked power trace (spikes per cycle)
   and the correlation of the correct key-byte guess, which spikes at the leak. */
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function powerPath(seed, W, top, bottom, cycles) {
  const r = rng(seed), amp = [], N = Math.round(W / 1.5), h = bottom - top;
  for (let c = 0; c <= cycles; c++) amp.push(0.45 + 0.45 * r());
  let d = "";
  for (let i = 0; i <= N; i++) {
    const t = i / N * cycles, c = Math.floor(t), ph = t - c, a = amp[c];
    const spike = ph < 0.06 ? ph / 0.06 : Math.exp(-(ph - 0.06) * 10);
    const bump = 0.22 * Math.exp(-Math.pow((ph - 0.52) / 0.07, 2));
    const y = bottom - h * 0.12 - h * 0.78 * a * (spike * 0.85 + bump) + (r() - 0.5) * h * 0.07;
    d += (i ? "L" : "M") + (i / N * W).toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}
function corrPath(seed, W, top, bottom, peakX) {
  const r = rng(seed + 7), N = Math.round(W / 2), base = bottom - 10, h = bottom - top - 14;
  let d = "";
  for (let i = 0; i <= N; i++) {
    const x = i / N * W, g = Math.exp(-Math.pow((x - peakX) / 5, 2));
    const y = base - (r() - 0.5) * h * 0.16 - h * 0.92 * g;
    d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}
function graticule(W, H, dx, dy) {
  let g = "";
  for (let x = dx; x < W; x += dx) g += `M${x} 0V${H}`;
  for (let y = dy; y < H; y += dy) g += `M0 ${y}H${W}`;
  return `<path d="${g}" stroke="var(--graticule-soft)" stroke-width="1" vector-effect="non-scaling-stroke" fill="none"/>`;
}

function heroScope() {
  const W = 1200, Hh = 300, cycles = 22, peakCycle = 13;
  const peakX = (peakCycle + 0.04) / cycles * W, pct = peakX / W * 100;
  const el = $("#scope");
  el.innerHTML = `<svg viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none" role="img" aria-labelledby="scope-cap">
      ${graticule(W, Hh, 50, 50)}
      <path d="M0 200H${W}" stroke="var(--graticule)" stroke-width="1" vector-effect="non-scaling-stroke"/>
      <path class="draw" pathLength="1" d="${powerPath(20261101, W, 30, 190, cycles)}" fill="none" stroke="var(--ink)" stroke-width="1.3" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
      <path class="draw late" pathLength="1" d="${corrPath(9, W, 205, 292, peakX)}" fill="none" stroke="var(--red)" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
      <path class="appear" d="M${peakX} 0V${Hh}" stroke="var(--red)" stroke-width="1.2" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/>
    </svg>
    <span class="lbl p">${B("Power", "Công suất")}</span>
    <span class="lbl c">${B("Correlation", "Tương quan")}</span>
    <div class="cursor-note appear${pct > 70 ? " flip" : ""}" style="left:${pct}%"><span class="key">0x3A</span><span>${B("key byte recovered", "đã khôi phục byte khóa")}</span></div>`;
}

function strip(seed) {
  const W = 1200, Hh = 64;
  return `<div class="strip" aria-hidden="true"><svg viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none">
    ${graticule(W, Hh, 50, 32)}
    <path d="${powerPath(seed, W, 6, 58, 30)}" fill="none" stroke="var(--ink)" stroke-width="1" vector-effect="non-scaling-stroke" opacity=".75"/>
  </svg></div>`;
}

/* ---------- header & footer ---------- */
const NAV = [
  ["index.html", "Home", "Trang chủ"],
  ["research.html", "Research", "Nghiên cứu"],
  ["people.html", "People", "Thành viên"],
  ["publications.html", "Publications", "Công bố"],
  ["news.html", "News", "Tin tức"],
  ["join.html", "Join us", "Tham gia"],
];
const MARK = `<svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
  <g stroke="var(--red)" stroke-width="2" stroke-linecap="round"><path d="M12 2v5M18 2v5M24 2v5M12 29v5M18 29v5M24 29v5M2 12h5M2 18h5M2 24h5M29 12h5M29 18h5M29 24h5"/></g>
  <rect x="7" y="7" width="22" height="22" rx="3" fill="var(--red)"/>
  <circle cx="18" cy="16" r="3.2" fill="var(--porcelain)"/><path d="M16.4 17.6h3.2l.9 5.4h-5z" fill="var(--porcelain)"/>
</svg>`;

function header() {
  const here = location.pathname.split("/").pop() || "index.html";
  $("#site-header").innerHTML = `<a class="skip" href="#main">${B("Skip to content", "Bỏ qua tới nội dung")}</a>
  <header class="site-header"><div class="wrap">
    <a class="mark" href="index.html">${MARK}<span><b>HwSec</b><small>${esc(T(SITE.name))}</small></span></a>
    <nav class="nav" aria-label="Main">
      <ul class="menu" id="menu">${NAV.map(([h, en, vi]) => `<li><a href="${h}"${h === here ? ' aria-current="page"' : ""}>${B(en, vi)}</a></li>`).join("")}</ul>
      <div class="lang" role="group" aria-label="Language / Ngôn ngữ">
        <button type="button" data-l="en" aria-pressed="${LANG === "en"}">EN</button><button type="button" data-l="vi" aria-pressed="${LANG === "vi"}">VI</button>
      </div>
      <button class="burger" type="button" aria-controls="menu" aria-expanded="false">${B("Menu", "Menu")}</button>
    </nav></div></header>`;
  document.querySelectorAll(".lang button").forEach(b => b.onclick = () => setLang(b.dataset.l));
  const burger = $(".burger");
  burger.onclick = () => { const m = $("#menu"); m.classList.toggle("open"); burger.setAttribute("aria-expanded", m.classList.contains("open")); };
}

function footer() {
  $("#site-footer").innerHTML = `<footer class="site-footer"><div class="wrap">
    <div class="inst">
      ${SITE.crest ? `<img src="${esc(SITE.crest)}" alt="${esc(T(SITE.host))}" onerror="this.remove()">` : ""}
      <div><b>${esc(T(SITE.name))}</b>${esc(T(SITE.host))}<br>${H(SITE.address)}<br>${emailHtml()}</div>
    </div>
    <div><b>${B("Pages", "Các trang")}</b><ul>${NAV.map(([h, en, vi]) => `<li><a href="${h}">${B(en, vi)}</a></li>`).join("")}</ul></div>
    <div><b>${B("Elsewhere", "Liên kết")}</b><ul>
      <li><a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="https://scholar.google.com/citations?user=E6znTccAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a></li>
      <li><a href="https://actvn.edu.vn" target="_blank" rel="noopener">${B("Academy of Cryptography Techniques", "Học viện Kỹ thuật Mật mã")}</a></li>
    </ul></div>
    <p class="legal">${B("Last updated", "Cập nhật")} ${SITE.updated}. ${B("Code", "Mã nguồn")}: <a href="${SITE.github}/ACT-HwSec.github.io/blob/main/LICENSE" target="_blank" rel="noopener">MIT</a>. ${B("Text and images", "Nội dung và hình ảnh")}: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>.</p>
  </div></footer>`;
}

function setLang(l) {
  LANG = l; document.documentElement.lang = l;
  try { localStorage.setItem("hwsec-lang", l); } catch (e) {}
  render(true);
}

/* ---------- pages ---------- */
const PAGES = {
  home(rerender) {
    if (!rerender) heroScope();
    const journals = PUBS.filter(p => p.k === "journal").length, first = Math.min(...PUBS.map(p => p.y));
    $("#intro").innerHTML = B(
      `Since ${first}, our members have published ${PUBS.length} papers, ${journals} of them in journals such as IEEE Transactions on Computers and IEEE Transactions on VLSI Systems.`,
      `Từ năm ${first}, các thành viên của nhóm đã công bố ${PUBS.length} bài báo, trong đó ${journals} bài trên các tạp chí như IEEE Transactions on Computers và IEEE Transactions on VLSI Systems.`);
    $("#areas").innerHTML = AREAS.map(a => {
      const n = PUBS.filter(p => p.th === a.k).length;
      return `<li><a href="research.html#${a.k}"><h3>${esc(T(a.h))}</h3><p>${esc(firstSentence(T(a.p)))}</p><span class="n">${n ? papersN(n) : ""}</span></a></li>`;
    }).join("");
    $("#news").innerHTML = NEWS.slice(0, 4).map(n => `<li><time>${H(n.d)}</time><span>${H(n.t)}</span></li>`).join("");
    $("#recent").innerHTML = [...PUBS].sort((a, b) => b.y - a.y || b.c - a.c).slice(0, 4).map(p => pubRow(p)).join("");
    const pi = PEOPLE.find(p => p.group === "pi");
    $("#team").innerHTML = `<a class="lead" href="people.html#${pi.id}">${portrait(pi)}<b>${esc(pname(pi))}</b><span>${H(pi.role)}</span></a>`
      + MEMBERS.filter(p => p.group !== "pi").map(p => `<a href="people.html#${p.id}">${portrait(p)}<b>${esc(pname(p))}</b><span>${H(p.role)}</span></a>`).join("");
  },

  research() {
    $("#areas-full").innerHTML = AREAS.map(a => {
      const ps = PUBS.filter(p => p.th === a.k);
      const who = a.people ? PEOPLE.filter(p => a.people.includes(p.id)) : [...new Set(ps.flatMap(peopleOf))];
      const top = [...ps].sort((x, y) => y.c - x.c || y.y - x.y).slice(0, 3);
      return `<section class="sect area-block" id="${a.k}"><div class="wrap cols">
        <div class="rail"><h2>${esc(T(a.h))}</h2><p class="who">${who.length ? who.map(p => `<a href="people.html#${p.id}">${esc(pname(p))}</a>`).join(", ") : H({en: "TODO: who works on this", vi: "TODO: thành viên phụ trách"})}</p></div>
        <div><p class="desc">${esc(T(a.p))}</p>
          ${top.length ? `<div class="pubs">${top.map(p => pubRow(p, true)).join("")}</div>
          <a class="more" href="publications.html?area=${a.k}">${B(`All ${ps.length} papers in this area`, `Tất cả ${ps.length} bài thuộc hướng này`)}</a>` : `<p class="note">${B("Publications in this area will be listed here.", "Các công bố thuộc hướng này sẽ được cập nhật tại đây.")}</p>`}
        </div></div></section>`;
    }).join("");
    $("#projects").innerHTML = PROJECTS.map(p => `<li><span>${H(p.t)}</span><span>${H(p.funder)}, ${H(p.period)}. ${H(p.role)}</span></li>`).join("");
    $("#resources").innerHTML = RESOURCES.length
      ? RESOURCES.map(r => `<li><span>${esc(T(r.t))}</span><span>${link("GitHub", r.url)}</span></li>`).join("")
      : `<li><span>${H({en: "TODO: list released code, RTL and datasets here (see RESOURCES in data.js)", vi: "TODO: liệt kê mã nguồn, RTL và bộ dữ liệu đã công bố (mục RESOURCES trong data.js)"})}</span></li>`;
  },

  people() {
    const pi = PEOPLE.find(p => p.group === "pi"), m = pi.metrics;
    const years = Object.entries(m.perYear), max = Math.max(...years.map(([, v]) => v)), last = years[years.length - 1][0];
    $("#pi").innerHTML = `<div class="pi" id="${pi.id}">
        ${portrait(pi)}
        <div>
          <p class="role">${H(pi.role)}</p>
          <h3>${esc(pi.name)}</h3><p class="vn">${esc(pi.nameVi)}</p>
          <p class="title">${H(pi.title)}</p>
          <p>${H(pi.bio)}</p>
          <h4>${B("Education", "Quá trình đào tạo")}</h4>
          <ul>${pi.education.map(e => `<li>${H(e)}</li>`).join("")}</ul>
          <div class="links">${pi.links.map(([l, u]) => link(l, u)).join("")}</div>
          <div class="metrics">
            <div><h4 style="margin-top:0">${B("Citation metrics", "Chỉ số trích dẫn")}</h4>
              <table class="mtable"><thead><tr><th></th><th>${B("All", "Tất cả")}</th><th>${B("Since 2021", "Từ 2021")}</th></tr></thead><tbody>
              <tr><td>${B("Citations", "Trích dẫn")}</td><td class="big">${m.citations}</td><td>${m.since2021[0]}</td></tr>
              <tr><td>h-index</td><td class="big">${m.h}</td><td>${m.since2021[1]}</td></tr>
              <tr><td>i10-index</td><td class="big">${m.i10}</td><td>${m.since2021[2]}</td></tr></tbody></table></div>
            <div><div class="bars" role="img" aria-label="Citations per year">${years.map(([y, v]) => `<div class="col${y === last ? " partial" : ""}"><span class="v">${v}</span><div class="bar" style="height:${v / max * 75}%"></div><span class="y">${y}</span></div>`).join("")}</div>
              <p class="note">${B(`Citations per year, from Google Scholar on ${SITE.updated}. ${last} is year to date.`, `Số trích dẫn theo năm, theo Google Scholar ngày ${SITE.updated}. Năm ${last} tính đến hiện tại.`)}</p></div>
          </div>
        </div></div>`;
    const card = p => `<div class="member" id="${p.id}">${portrait(p)}<div>
        <b>${p.honor && T(p.honor) ? esc(T(p.honor)) + " " : ""}${esc(pname(p))}</b><span class="role">${H(p.role)}</span>
        <p class="aff">${H(p.title)}</p><p>${H(p.bio)}</p>
        <div class="links">${(p.links || []).map(([l, u]) => link(l, u)).join("")}</div></div></div>`;
    $("#members").innerHTML = PEOPLE.filter(p => p.group === "member").map(card).join("");
    const students = PEOPLE.filter(p => p.group === "student");
    $("#students").innerHTML = students.length ? students.map(card).join("")
      : `<p>${H({en: "TODO: add students to PEOPLE in data.js (group: \"student\")", vi: "TODO: thêm học viên, sinh viên vào PEOPLE trong data.js (group: \"student\")"})}</p>`;
    const alumni = PEOPLE.filter(p => p.group === "alumni");
    $("#alumni-wrap").hidden = !alumni.length;
    $("#alumni").innerHTML = alumni.map(card).join("");
    $("#collab").innerHTML = COLLABORATORS.map(([n, a]) => `<li><span>${esc(n)}</span><span>${esc(T(a))}</span></li>`).join("");
  },

  publications() {
    const st = PAGES._pubState || (PAGES._pubState = {kind: "all", area: new URLSearchParams(location.search).get("area") || "all", year: "all", q: ""});
    const years = [...new Set(PUBS.map(p => p.y))].sort((a, b) => b - a);
    $("#pf").innerHTML = `
      <div class="seg" role="group" aria-label="${LANG === "vi" ? "Loại công bố" : "Type"}">${[["all", "All", "Tất cả"], ["journal", "Journals", "Tạp chí"], ["conf", "Conferences", "Hội nghị"], ["cited", "Most cited", "Trích dẫn nhiều"]]
        .map(([k, en, vi]) => `<button type="button" data-k="${k}" aria-pressed="${st.kind === k}">${B(en, vi)}</button>`).join("")}</div>
      <select id="fa" aria-label="${LANG === "vi" ? "Hướng nghiên cứu" : "Research area"}"><option value="all">${LANG === "vi" ? "Mọi hướng nghiên cứu" : "All research areas"}</option>${AREAS.map(a => `<option value="${a.k}"${st.area === a.k ? " selected" : ""}>${esc(T(a.h))}</option>`).join("")}</select>
      <select id="fy" aria-label="${LANG === "vi" ? "Năm" : "Year"}"><option value="all">${LANG === "vi" ? "Mọi năm" : "All years"}</option>${years.map(y => `<option${String(st.year) === String(y) ? " selected" : ""}>${y}</option>`).join("")}</select>
      <input type="search" id="fq" value="${esc(st.q)}" aria-label="${LANG === "vi" ? "Tìm kiếm" : "Search"}" placeholder="${LANG === "vi" ? "Tìm theo tên bài, tác giả, nơi đăng" : "Search titles, authors, venues"}">`;
    const draw = () => {
      const q = st.q.toLowerCase();
      let list = PUBS.filter(p => (st.kind === "all" || st.kind === "cited" || p.k === st.kind)
        && (st.area === "all" || p.th === st.area) && (st.year === "all" || String(p.y) === String(st.year))
        && (!q || (p.t + " " + p.a + " " + p.v).toLowerCase().includes(q)));
      const out = $("#pl");
      $("#pc").innerHTML = B(`Showing ${list.length} of ${PUBS.length} publications`, `Hiển thị ${list.length} / ${PUBS.length} công bố`);
      if (!list.length) { out.className = ""; out.innerHTML = `<p>${B("No publications match these filters. Clear the search or choose “All”.", "Không có công bố phù hợp. Hãy xóa từ khóa hoặc chọn “Tất cả”.")}</p>`; return; }
      if (st.kind === "cited") { out.className = "pubs"; out.innerHTML = list.filter(p => p.c).sort((a, b) => b.c - a.c).map(p => pubRow(p)).join(""); return; }
      list.sort((a, b) => b.y - a.y || b.c - a.c);
      out.className = "pubs byyear";
      out.innerHTML = [...new Set(list.map(p => p.y))].map(y => `<h2 class="year-h">${y}</h2>` + list.filter(p => p.y === y).map(p => pubRow(p)).join("")).join("");
    };
    document.querySelectorAll("#pf .seg button").forEach(b => b.onclick = () => { st.kind = b.dataset.k; document.querySelectorAll("#pf .seg button").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); });
    $("#fa").onchange = e => { st.area = e.target.value; draw(); };
    $("#fy").onchange = e => { st.year = e.target.value; draw(); };
    $("#fq").oninput = e => { st.q = e.target.value; draw(); };
    draw();
  },

  news() {
    $("#news-all").innerHTML = NEWS.map(n => `<li><time>${H(n.d)}</time><span>${H(n.t)}</span></li>`).join("");
  },

  join() {
    $("#positions").innerHTML = POSITIONS.map(p => `<li>${H(p)}</li>`).join("");
    $("#apply-email").innerHTML = emailHtml();
    $("#contact").innerHTML = `<li><span>${B("Address", "Địa chỉ")}</span><span>${H(SITE.address)}</span></li>
      <li><span>Email</span><span>${emailHtml()}</span></li>
      <li><span>${B("Map", "Bản đồ")}</span><span>${isTodo(SITE.mapUrl) ? H(SITE.mapUrl) : `<a href="${esc(SITE.mapUrl)}" target="_blank" rel="noopener">Google Maps</a>`}</span></li>`;
  },
};

const STRIP_SEEDS = {research: 11, people: 23, publications: 37, news: 41, join: 53};
function render(rerender) {
  header(); footer();
  const page = document.body.dataset.page;
  const s = $("#strip");
  if (s && !rerender) s.outerHTML = strip(STRIP_SEEDS[page] || 1);
  if (PAGES[page]) PAGES[page](rerender);
  const titles = {home: ["", ""], research: ["Research", "Nghiên cứu"], people: ["People", "Thành viên"], publications: ["Publications", "Công bố"], news: ["News", "Tin tức"], join: ["Join us", "Tham gia"]}[page] || ["", ""];
  const t = titles[LANG === "vi" ? 1 : 0];
  document.title = (t ? t + " | " : "") + "HwSec, " + T(SITE.name);
}
render(false);
