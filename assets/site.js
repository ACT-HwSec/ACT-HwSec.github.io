/* HwSec site engine: language switch, header/footer, and page rendering.
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
const avatar = p => `<div class="avatar">${p.photo ? `<img src="assets/people/${esc(p.photo)}" alt="${esc(p.name)}">` : initials(p.name)}</div>`;
const pname = p => LANG === "vi" && p.nameVi ? p.nameVi : p.name;
const link = (label, url) => isTodo(url) ? `<mark class="todo">${esc(label)}: ${esc(url)}</mark>`
  : url.includes("@") && !url.startsWith("http") ? `<a href="mailto:${esc(url)}">${esc(url)}</a>`
  : `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
const emailHtml = () => isTodo(SITE.email) ? H(SITE.email) : `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;
const kindLabel = k => k === "journal" ? B("Journal", "Tạp chí") : k === "thesis" ? B("Thesis", "Luận án") : B("Conference", "Hội nghị");
const areaName = k => { const a = AREAS.find(x => x.k === k); return a ? T(a.h) : B("Other", "Khác"); };

function pubRow(p, compact) {
  const url = p.url || "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + p.t + '"');
  const authors = esc(p.a).replace(ME, (m, pre, name) => `${pre}<strong>${name}</strong>`);
  return `<article class="pub">
    <div>
      <p class="t"><a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.t)}</a></p>
      <p class="a">${authors}</p>
      <p class="v"><span class="kind ${p.k === "journal" ? "" : "conf"}">${kindLabel(p.k)}</span>${esc(p.v)}${p.v ? ", " : ""}${p.y}</p>
    </div>
    <div class="c">${!compact && p.c ? `<b>${p.c}</b><span>${B("citations", "trích dẫn")}</span>` : ""}</div>
  </article>`;
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
const LOGO = `<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
  <g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
    <path d="M11 3v4M17 3v4M23 3v4M11 27v4M17 27v4M23 27v4M3 11h4M3 17h4M3 23h4M27 11h4M27 17h4M27 23h4"/>
    <rect x="7" y="7" width="20" height="20" rx="3"/>
  </g>
  <circle cx="17" cy="15" r="3" fill="currentColor"/><path d="M15.6 16.5h2.8l.8 5h-4.4z" fill="currentColor"/>
</svg>`;

function header() {
  const here = (location.pathname.split("/").pop() || "index.html");
  $("#site-header").innerHTML = `<header class="site-header"><div class="wrap">
    <a class="logo" href="index.html" style="color:var(--accent)">${LOGO}<span style="color:var(--ink)"><b>HwSec</b><small>${esc(T(SITE.name))}</small></span></a>
    <nav aria-label="Main" style="display:flex;align-items:center;gap:16px">
      <ul class="menu" id="menu">${NAV.map(([h, en, vi]) => `<li><a href="${h}"${h === here ? ' aria-current="page"' : ""}>${B(en, vi)}</a></li>`).join("")}</ul>
      <div class="lang" role="group" aria-label="Language / Ngôn ngữ">
        <button type="button" data-l="en" aria-pressed="${LANG === "en"}">EN</button><button type="button" data-l="vi" aria-pressed="${LANG === "vi"}">VI</button>
      </div>
      <button class="burger" type="button" aria-controls="menu" aria-expanded="false">☰</button>
    </nav></div></header>`;
  document.querySelectorAll(".lang button").forEach(b => b.onclick = () => setLang(b.dataset.l));
  const burger = $(".burger");
  burger.onclick = () => { const m = $("#menu"); m.classList.toggle("open"); burger.setAttribute("aria-expanded", m.classList.contains("open")); };
}

function footer() {
  $("#site-footer").innerHTML = `<footer class="site-footer"><div class="wrap">
    <div><b>${esc(T(SITE.name))} (HwSec)</b>${esc(T(SITE.host))}<br>${H(SITE.address)}<br>${emailHtml()}</div>
    <div><b>${B("Pages", "Trang")}</b><ul>${NAV.map(([h, en, vi]) => `<li><a href="${h}">${B(en, vi)}</a></li>`).join("")}</ul></div>
    <div><b>${B("Elsewhere", "Liên kết")}</b><ul>
      <li><a href="${SITE.github}" target="_blank" rel="noopener">GitHub ↗</a></li>
      <li><a href="https://scholar.google.com/citations?user=E6znTccAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar ↗</a></li>
    </ul><p class="small">${B("Last updated", "Cập nhật")} ${SITE.updated}<br>
      ${B("Code", "Mã nguồn")}: <a href="${SITE.github}/ACT-HwSec.github.io/blob/main/LICENSE" target="_blank" rel="noopener">MIT</a> ·
      ${B("Text and images", "Nội dung và hình ảnh")}: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a></p></div>
  </div></footer>`;
}

function setLang(l) {
  LANG = l; document.documentElement.lang = l;
  try { localStorage.setItem("hwsec-lang", l); } catch (e) {}
  render();
}

/* ---------- pages ---------- */
const PAGES = {
  home() {
    const journals = PUBS.filter(p => p.k === "journal").length;
    const cites = PUBS.reduce((s, p) => s + (p.c || 0), 0);
    $("#stats").innerHTML = [
      [PUBS.length, B("publications", "công bố")], [journals, B("journal articles", "bài tạp chí")],
      [cites, B("citations", "trích dẫn")], [AREAS.length, B("research areas", "hướng nghiên cứu")],
    ].map(([n, l]) => `<div><b style="font:500 32px/1 var(--mono);display:block">${n}</b><span style="color:var(--muted);font-size:14px">${l}</span></div>`).join("");
    $("#areas").innerHTML = AREAS.map((a, i) => `<a class="card" href="research.html#${a.k}"><span class="num">0${i + 1}</span><h3>${esc(T(a.h))}</h3><p>${esc(firstSentence(T(a.p)))}</p></a>`).join("");
    $("#news").innerHTML = NEWS.slice(0, 3).map(n => `<li><time>${H(n.d)}</time><span>${H(n.t)}</span></li>`).join("");
    $("#recent").innerHTML = [...PUBS].sort((a, b) => b.y - a.y || b.c - a.c).slice(0, 4).map(p => pubRow(p)).join("");
    $("#team").innerHTML = MEMBERS.map(p => `<a class="card person" href="people.html#${p.id}">${avatar(p)}<div><b>${esc(pname(p))}</b><span class="role">${H(p.role)}</span></div></a>`).join("");
    $("#partners").innerHTML = COLLABORATORS.map(([n, a]) => `<li><span>${esc(n)}</span><span>${esc(T(a))}</span></li>`).join("");
  },

  research() {
    $("#areas-full").innerHTML = AREAS.map(a => {
      const ps = PUBS.filter(p => p.th === a.k);
      const who = a.people ? PEOPLE.filter(p => a.people.includes(p.id)) : [...new Set(ps.flatMap(peopleOf))];
      const top = [...ps].sort((x, y) => y.c - x.c || y.y - x.y).slice(0, 3);
      return `<div class="area" id="${a.k}">
        <div><h2>${esc(T(a.h))}</h2><p class="who">${who.length ? who.map(p => `<a href="people.html#${p.id}">${esc(pname(p))}</a>`).join(", ") : H({en: "TODO: who works on this", vi: "TODO: thành viên phụ trách"})}</p></div>
        <div><p class="desc">${esc(T(a.p))}</p>
          ${top.length ? `<h4>${B("Selected papers", "Bài báo tiêu biểu")}</h4>${top.map(p => pubRow(p, true)).join("")}
          <p style="margin:12px 0 0;font-size:14px"><a href="publications.html?area=${a.k}">${B(`All ${ps.length} papers →`, `Tất cả ${ps.length} bài →`)}</a></p>` : `<p class="note">${B("Publications coming soon.", "Sẽ cập nhật công bố.")}</p>`}
        </div></div>`;
    }).join("");
    $("#projects").innerHTML = PROJECTS.map(p => `<li><span>${H(p.t)}</span><span>${H(p.funder)} · ${H(p.period)} · ${H(p.role)}</span></li>`).join("");
    $("#resources").innerHTML = RESOURCES.length
      ? RESOURCES.map(r => `<li><span>${esc(T(r.t))}</span><span>${link("GitHub", r.url)}</span></li>`).join("")
      : `<li><span>${H({en: "TODO: list released code, RTL and datasets here (see RESOURCES in data.js)", vi: "TODO: liệt kê mã nguồn, RTL và bộ dữ liệu đã công bố (mục RESOURCES trong data.js)"})}</span></li>`;
  },

  people() {
    const pi = PEOPLE.find(p => p.group === "pi"), m = pi.metrics;
    const years = Object.entries(m.perYear), max = Math.max(...years.map(([, v]) => v)), last = years[years.length - 1][0];
    $("#pi").innerHTML = `<div id="${pi.id}" style="scroll-margin-top:80px">
        ${avatar(pi)}<span class="role" style="color:var(--accent);font-weight:500;font-size:14px">${H(pi.role)}</span>
        <h3>${esc(pi.name)}</h3><p class="vn">${esc(pi.nameVi)}</p>
        <p style="color:var(--muted);margin:0 0 14px">${H(pi.title)}</p>
        <p>${H(pi.bio)}</p>
        <h4 style="font:500 12px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:20px 0 0">${B("Education", "Quá trình đào tạo")}</h4>
        <ul>${pi.education.map(e => `<li>${H(e)}</li>`).join("")}</ul>
        <div class="btns">${pi.links.map(([l, u]) => link(l, u)).join(" ")}</div>
      </div>
      <aside class="card"><h4 style="font:500 12px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:0 0 12px">${B("Citation metrics", "Chỉ số trích dẫn")}</h4>
        <table class="mtable"><thead><tr><th></th><th>${B("All", "Tất cả")}</th><th>${B("Since 2021", "Từ 2021")}</th></tr></thead><tbody>
          <tr><td>${B("Citations", "Trích dẫn")}</td><td class="big">${m.citations}</td><td>${m.since2021[0]}</td></tr>
          <tr><td>h-index</td><td class="big">${m.h}</td><td>${m.since2021[1]}</td></tr>
          <tr><td>i10-index</td><td class="big">${m.i10}</td><td>${m.since2021[2]}</td></tr></tbody></table>
        <div class="chart" role="img" aria-label="Citations per year">${years.map(([y, v]) => `<div class="col${y === last ? " partial" : ""}"><span class="v">${v}</span><div class="bar" style="height:${v / max * 72}%"></div><span class="y">'${y.slice(2)}</span></div>`).join("")}</div>
        <p class="note">${B(`Google Scholar, ${SITE.updated}. ${last} is year to date.`, `Google Scholar, ${SITE.updated}. Năm ${last} tính đến hiện tại.`)}</p></aside>`;
    const card = p => `<div class="card person" id="${p.id}" style="scroll-margin-top:80px">${avatar(p)}<div>
        <b>${p.honor && T(p.honor) ? esc(T(p.honor)) + " " : ""}${esc(pname(p))}</b><span class="role">${H(p.role)}</span>
        <p class="aff">${H(p.title)}</p><p>${H(p.bio)}</p>
        <div class="links">${(p.links || []).map(([l, u]) => link(l, u)).join("")}</div></div></div>`;
    $("#members").innerHTML = PEOPLE.filter(p => p.group === "member").map(card).join("");
    const students = PEOPLE.filter(p => p.group === "student");
    $("#students").innerHTML = students.length ? students.map(card).join("")
      : `<div class="card"><p>${H({en: "TODO: add students to PEOPLE in data.js (group: \"student\")", vi: "TODO: thêm học viên, sinh viên vào PEOPLE trong data.js (group: \"student\")"})}</p></div>`;
    const alumni = PEOPLE.filter(p => p.group === "alumni");
    $("#alumni-wrap").style.display = alumni.length ? "" : "none";
    $("#alumni").innerHTML = alumni.map(card).join("");
    $("#collab").innerHTML = COLLABORATORS.map(([n, a]) => `<li><span>${esc(n)}</span><span>${esc(T(a))}</span></li>`).join("");
  },

  publications() {
    const st = PAGES._pubState || (PAGES._pubState = {kind: "all", area: new URLSearchParams(location.search).get("area") || "all", year: "all", q: ""});
    const years = [...new Set(PUBS.map(p => p.y))].sort((a, b) => b - a);
    $("#pf").innerHTML = `
      ${[["all", "All", "Tất cả"], ["journal", "Journals", "Tạp chí"], ["conf", "Conferences", "Hội nghị"], ["cited", "Most cited", "Trích dẫn nhiều"]]
        .map(([k, en, vi]) => `<button type="button" class="chip" data-k="${k}" aria-pressed="${st.kind === k}">${B(en, vi)}</button>`).join("")}
      <select id="fa" aria-label="Research area"><option value="all">${LANG === "vi" ? "Mọi hướng nghiên cứu" : "All research areas"}</option>${AREAS.map(a => `<option value="${a.k}"${st.area === a.k ? " selected" : ""}>${esc(T(a.h))}</option>`).join("")}</select>
      <select id="fy" aria-label="Year"><option value="all">${LANG === "vi" ? "Mọi năm" : "All years"}</option>${years.map(y => `<option${String(st.year) === String(y) ? " selected" : ""}>${y}</option>`).join("")}</select>
      <input type="search" id="fq" value="${esc(st.q)}" placeholder="${LANG === "vi" ? "Tìm theo tên bài, tác giả, nơi đăng" : "Search titles, authors, venues"}">`;
    const draw = () => {
      const q = st.q.toLowerCase();
      let list = PUBS.filter(p => (st.kind === "all" || st.kind === "cited" || p.k === st.kind)
        && (st.area === "all" || p.th === st.area) && (st.year === "all" || String(p.y) === String(st.year))
        && (!q || (p.t + " " + p.a + " " + p.v).toLowerCase().includes(q)));
      const out = $("#pl");
      $("#pc").innerHTML = B(`${list.length} of ${PUBS.length} publications`, `${list.length} / ${PUBS.length} công bố`);
      if (!list.length) { out.innerHTML = `<p class="note">${B("No publications match.", "Không có kết quả phù hợp.")}</p>`; return; }
      if (st.kind === "cited") { out.innerHTML = list.filter(p => p.c).sort((a, b) => b.c - a.c).map(p => pubRow(p)).join(""); return; }
      list.sort((a, b) => b.y - a.y || b.c - a.c);
      out.innerHTML = [...new Set(list.map(p => p.y))].map(y => `<h3 class="year-h">${y}</h3>` + list.filter(p => p.y === y).map(p => pubRow(p)).join("")).join("");
    };
    document.querySelectorAll("#pf .chip").forEach(b => b.onclick = () => { st.kind = b.dataset.k; document.querySelectorAll("#pf .chip").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); });
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
      <li><span>${B("Map", "Bản đồ")}</span><span>${isTodo(SITE.mapUrl) ? H(SITE.mapUrl) : `<a href="${esc(SITE.mapUrl)}" target="_blank" rel="noopener">Google Maps ↗</a>`}</span></li>`;
  },
};

function render() {
  header(); footer();
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === LANG));
  const page = document.body.dataset.page;
  if (PAGES[page]) PAGES[page]();
  const titles = {home: ["", ""], research: ["Research", "Nghiên cứu"], people: ["People", "Thành viên"], publications: ["Publications", "Công bố"], news: ["News", "Tin tức"], join: ["Join us", "Tham gia"]}[page] || ["", ""];
  const t = titles[LANG === "vi" ? 1 : 0];
  document.title = (t ? t + " · " : "") + "HwSec — " + T(SITE.name);
}
render();
