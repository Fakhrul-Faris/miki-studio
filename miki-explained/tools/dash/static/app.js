// Miki dashboard v2: Today · Calendar · Library · Analytics · Inbox · Settings. Vanilla JS on Tabler; no outside requests.
const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = n => n == null || n === "" ? "–" : n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e4 ? Math.round(n / 1e3) + "k" : n >= 1e3 ? (n / 1e3).toFixed(1) + "k" : String(Math.round(n * 10) / 10);
const pct = n => n == null ? "–" : (+n).toFixed(1) + "%";
const OCHRE = "#C98A2B", GREEN = "#3FB27F";
const PLAT = { tiktok: "TikTok", instagram: "Instagram", threads: "Threads" };
const STUDIO = "https://www.tiktok.com/tiktokstudio/upload";
const D = iso => iso ? new Date(iso.length > 10 ? iso : iso + "T12:00") : null;
const fmtWhen = iso => !iso ? "–" : D(iso).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", ...(iso.length > 10 ? { hour: "2-digit", minute: "2-digit" } : {}) });
const hm = iso => iso && iso.length > 10 ? iso.slice(11, 16) : null;
const wd = iso => iso ? D(iso).toLocaleDateString("en-GB", { weekday: "short" }) : null;
const localISO = d => new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
function rel(iso) {
  if (!iso) return ""; let m = Math.round((D(iso) - new Date()) / 6e4); const past = m < 0; m = Math.abs(m);
  const s = m >= 1440 ? `${Math.floor(m / 1440)}d ${Math.floor(m % 1440 / 60)}h` : m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m` : `${m}m`;
  return past ? `${s} ago` : `in ${s}`;
}
const ICON = {
  today: '<path d="M3 12l9-8 9 8M5 10v10h14V10"/>', calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  library: '<rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/>',
  analytics: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', inbox: '<path d="M4 13h4l2 3h4l2-3h4M4 13l2-8h12l2 8v6H4z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>' };
const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;
const PAGES = [["today", "Today"], ["calendar", "Calendar"], ["library", "Library"], ["analytics", "Analytics"], ["inbox", "Inbox"], ["settings", "Settings"]];
let S = null, charts = {}, libFilter = "all", libQ = "", anRange = "all", pendingUpload = null;

// ---------- data ----------
async function api(path, body, raw) {
  const o = body === undefined && !raw ? {} : { method: "POST", headers: { "Content-Type": raw ? raw.type || "image/jpeg" : "application/json" }, body: raw || JSON.stringify(body) };
  const r = await fetch(path, o); const j = await r.json().catch(() => ({}));
  if (!r.ok) { toast(j.error || "Something went wrong", true); throw new Error(j.error); } return j;
}
function toast(msg, bad) { const t = document.createElement("div"); t.className = "toastx"; if (bad) t.style.borderLeftColor = "#E5534B"; t.textContent = msg; $("#toasts").append(t); setTimeout(() => t.remove(), 2600); }
async function load() { S = await api("/api/state"); render(); $("#synced").textContent = "Updated " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }
const ep = id => S.episodes.find(e => e.id === id) || { id, title: id, stack: {} };
const postOf = (id, pl = "tiktok") => S.posts.find(p => p.episode === id && p.platform === pl);
const posted = p => p && p.posted_at;
const latest = p => p ? (p.metrics["7d"] || p.metrics["72h"] || p.metrics["24h"] || null) : null;
const thumb = id => `/media/thumb/${id}`;
const due = () => S.due.filter(d => d.state === "due" || d.state === "sent").sort((a, b) => a.due_at.localeCompare(b.due_at));
const inboxOpen = () => S.inbox.filter(i => !i.processed);
const median = a => { a = a.filter(x => x != null).sort((x, y) => x - y); return a.length ? (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2) : null; };
const capBox = (e, k) => { const t = k === "pinned" ? e.pinned : e.caption;
  return `<div class="cap-wrap"><div class="cap">${esc(t || "No caption yet")}</div>${t ? `<button class="btn btn-soft btn-sm cap-copy" data-copy="${k}" data-ep="${e.id}">Copy</button>` : ""}</div>`; };
const late = d => d.state === "due" && Date.now() - D(d.due_at) > 12 * 3600e3;
function copy(text) {
  if (navigator.clipboard && isSecureContext) navigator.clipboard.writeText(text); else {
    const t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = 0; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
  toast("Copied");
}

// ---------- shell ----------
function render() {
  const tab = (location.hash || "#today").slice(1), cur = PAGES.find(p => p[0] === tab) ? tab : "today";
  const badge = { inbox: inboxOpen().length + due().filter(d => d.state === "due").length };
  $("#nav").innerHTML = PAGES.map(([k, t]) => `<a class="nav-item-link ${k === cur ? "active" : ""}" href="#${k}">${svg(k)}${t}${badge[k] ? `<span class="count">${badge[k]}</span>` : ""}</a>`).join("");
  $("#tabbar").innerHTML = PAGES.filter(p => p[0] !== "settings").map(([k, t]) => `<a class="${k === cur ? "active" : ""}" href="#${k}">${svg(k)}${t}${badge[k] ? `<span class="count">${badge[k]}</span>` : ""}</a>`).join("");
  $("#tb-title").textContent = PAGES.find(p => p[0] === cur)[1];
  $$(".page").forEach(p => p.hidden = p.id !== "p-" + cur);
  ({ today, calendar, library, analytics, inbox, settings })[cur]();
}

// ---------- Today ----------
function nextPost() {
  const t = Date.now() - 6 * 3600e3;
  const w = p => p.scheduled_at || p.planned_at;
  return S.posts.filter(p => p.platform === "tiktok" && !p.posted_at && w(p) && D(w(p)) >= t).sort((a, b) => w(a).localeCompare(w(b)))[0];
}
function today() {
  const n = nextPost(), dl = due(), h = new Date().getHours();
  const hello = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const ready = S.episodes.filter(e => e.status === "ready").length;
  let html = `<div class="page-head"><div><h1 class="h-page">${hello}</h1><div class="sub">${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} · ${ready} ready · ${dl.filter(d => d.state === "due").length} stats due</div></div>
    <a class="btn btn-soft" href="${STUDIO}" target="_blank" rel="noopener">Open TikTok Studio ↗</a></div>`;
  if (n) {
    const e = ep(n.episode), sch = n.scheduled_at, at = sch || n.planned_at, late = !sch && D(n.planned_at) < new Date();
    html += `<div class="card hero mb-3"><div class="hero-media" id="hero-media"><img src="${thumb(e.id)}" alt="" onerror="this.style.opacity=0">
      <button class="play" data-play="${e.id}" aria-label="Play"><span><svg width="22" height="22" viewBox="0 0 24 24" fill="#111"><path d="M7 4l13 8-13 8z"/></svg></span></button></div>
      <div class="hero-body"><div class="d-flex flex-wrap gap-2">${sch ? `<span class="chip ok">📅 Scheduled in Studio</span>` : `<span class="chip ochre">Up next</span>`}<span class="chip">${esc(e.id)}</span><span class="chip">TikTok</span>${e.duration ? `<span class="chip">${e.duration}s</span>` : ""}</div>
        <div><div class="hero-title">${esc(e.title)}</div><div class="muted mt-1">${esc(e.concept || e.lane || "")}</div></div>
        <div class="d-flex align-items-end gap-3 flex-wrap"><div><div class="kpi-label">${sch ? "Goes live" : late ? "Was due" : "Slot"} ${fmtWhen(at)}</div>
          <div class="count-big ${late ? "text-danger" : ""}" data-count="${at}">${rel(at)}</div></div>
          ${sch ? `<button class="btn btn-soft btn-sm" data-unsched="${e.id}">Not scheduled after all</button>` : `<input type="datetime-local" class="form-control form-control-sm" style="max-width:210px" value="${n.planned_at}" data-plan="${e.id}" aria-label="Change slot">`}</div>
        <div class="actions"><a class="btn btn-soft" href="/media/video/${e.id}?dl=1" download="${e.id}.mp4">⬇ Video</a>
          <button class="btn btn-soft" data-copy="caption" data-ep="${e.id}">Copy caption</button>${e.pinned ? `<button class="btn btn-soft" data-copy="pinned" data-ep="${e.id}">Copy pinned</button>` : ""}
          ${sch ? `<button class="btn btn-soft" data-posted="${e.id}">✓ Went live early</button>` : `<button class="btn btn-primary" data-sched="${e.id}">📅 Scheduled in Studio</button><button class="btn btn-soft" data-posted="${e.id}">✓ Posted now</button>`}</div>
        <details ${innerWidth > 860 ? "open" : ""}><summary class="muted small">Caption</summary><div class="mt-2">${capBox(e, "caption")}</div></details></div></div>`;
  } else {
    html += `<div class="card mb-3"><div class="empty-note"><div class="fw-bold mb-1">Nothing scheduled</div>${ready ? `${ready} episodes are ready.` : "No finished episodes waiting."}
      ${ready ? `<div class="mt-3"><button class="btn btn-primary" data-replan>Plan the queue</button></div>` : ""}</div></div>`;
  }
  html += `<div class="section-title">Stats to collect</div><div class="card mb-3">${dl.length ? dl.map(d => { const e = ep(d.episode);
    return `<div class="rowx stat"><img class="thumb-sm" src="${thumb(e.id)}" alt="" onerror="this.style.visibility='hidden'"><div class="grow"><div class="fw-bold ell">${esc(e.id)} · ${esc(e.title)}</div>
      <div class="small muted">${PLAT[d.platform]} · ${d.state === "sent" ? "screenshot waiting in Inbox" : "due " + rel(d.due_at)}</div></div><div class="row-act">${late(d) ? `<span class="chip bad">overdue</span>` : ""}<span class="chip ${d.state === "sent" ? "ok" : "warn"}">${d.checkpoint}</span>
      ${d.state === "sent" ? `<a class="btn btn-soft btn-sm" href="#inbox">Review</a>` : `<button class="btn btn-primary btn-sm" data-upload="${e.id}|${d.checkpoint}">Upload</button><button class="btn btn-soft btn-sm" data-num="${d.post_id}|${d.checkpoint}">Type</button>`}</div></div>`; }).join("")
    : `<div class="empty-note">All caught up. Numbers come due 24 h, 72 h and 7 days after each post.</div>`}</div>`;
  const wk = S.posts.filter(p => p.posted_at && D(p.posted_at) > Date.now() - 7 * 864e5);
  const views = wk.reduce((a, p) => a + ((latest(p) || {}).views || 0), 0), fol = wk.reduce((a, p) => a + ((latest(p) || {}).follows || 0), 0);
  const f72 = S.posts.map(p => p.metrics["72h"]).filter(m => m && m.full_pct != null);
  html += `<div class="section-title">Last 7 days</div><div class="row g-3 mb-3">${[["Posts", wk.length, "all platforms"], ["Views", fmt(views), "latest numbers"],
    ["Median 72 h", fmt(S.median_72h_tiktok), "TikTok, all time"], ["Watched to end", f72.length ? pct(f72.reduce((a, m) => a + m.full_pct, 0) / f72.length) : "–", "72 h average"], ["New follows", fmt(fol), "from these posts"]]
    .map(([l, v, nn]) => `<div class="col-6 col-lg"><div class="card kpi-card"><div class="kpi-label">${l}</div><div class="kpi-val">${v}</div><div class="kpi-note">${nn}</div></div></div>`).join("")}</div>`;
  const up = S.posts.filter(p => !p.posted_at && p.planned_at && (!n || p.id !== n.id)).sort((a, b) => a.planned_at.localeCompare(b.planned_at)).slice(0, 4);
  if (up.length) html += `<div class="section-title">Coming up</div><div class="card">${up.map(p => { const e = ep(p.episode);
    return `<div class="rowx" role="button" data-open="${e.id}"><img class="thumb-sm" src="${thumb(e.id)}" alt="" onerror="this.style.visibility='hidden'"><div class="grow"><div class="fw-bold ell">${esc(e.id)} · ${esc(e.title)}</div><div class="small muted">${fmtWhen(p.scheduled_at || p.planned_at)} · ${rel(p.scheduled_at || p.planned_at)}</div></div>${p.scheduled_at ? `<span class="chip ok">📅 ${hm(p.scheduled_at)}</span>` : `<button class="btn btn-soft btn-sm" data-sched="${e.id}">📅 Scheduled?</button>`}</div>`; }).join("")}</div>`;
  $("#p-today").innerHTML = html;
}

// ---------- Calendar ----------
function calendar() {
  const days = [], start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - 3);
  for (let i = 0; i < 17; i++) { const d = new Date(start); d.setDate(start.getDate() + i); days.push(d); }
  const key = d => localISO(d).slice(0, 10), todayK = key(new Date());
  const byDay = {}; S.posts.forEach(p => { const w = p.posted_at || p.planned_at; if (w && w.length > 10) (byDay[w.slice(0, 10)] = byDay[w.slice(0, 10)] || []).push(p); });
  const unsched = S.episodes.filter(e => e.status === "ready" && !(postOf(e.id) || {}).planned_at);
  let html = `<div class="page-head"><div><h1 class="h-page">Calendar</h1><div class="sub">Slots ${S.settings.slots.join(" · ")} · ${S.settings.per_day} a day, rotated to test post time</div></div>
    <button class="btn btn-soft" data-replan>Re-plan unposted</button></div>`;
  if (unsched.length) html += `<div class="card mb-3"><div class="rowx"><div class="grow"><b>${unsched.length} ready but not scheduled</b><div class="small muted">${unsched.map(e => e.id).join(", ")}</div></div><button class="btn btn-primary btn-sm" data-replan>Schedule them</button></div></div>`;
  html += `<div class="card">${days.map(d => { const k = key(d), list = (byDay[k] || []).sort((a, b) => (a.posted_at || a.planned_at).localeCompare(b.posted_at || b.planned_at));
    return `<div class="day ${k === todayK ? "today" : ""}"><div class="day-date"><span>${d.toLocaleDateString("en-GB", { weekday: "short" })}</span><b>${d.getDate()}</b><span>${d.toLocaleDateString("en-GB", { month: "short" })}</span></div>
      <div>${list.length ? list.map(p => { const e = ep(p.episode), w = p.posted_at || p.planned_at;
        return `<div class="slot ${p.posted_at ? "posted" : ""}"><span class="time">${hm(w)}</span><div class="grow ell" role="button" data-open="${e.id}"><b>${esc(e.id)}</b> · ${esc(e.title)}</div>
          ${p.posted_at ? `<span class="chip ok">${PLAT[p.platform]} ✓</span>` : p.scheduled_at ? `<span class="chip ok">📅 Scheduled</span>` : `<span class="chip">${PLAT[p.platform]}</span><button class="btn btn-soft btn-sm" data-sched="${e.id}">📅 Scheduled?</button>`}</div>`; }).join("")
        : `<div class="small muted pt-1">${k < todayK ? "—" : "Free"}</div>`}</div></div>`; }).join("")}</div>`;
  $("#p-calendar").innerHTML = html;
}

// ---------- Library + drawer ----------
function library() {
  const st = { all: () => true, ready: e => e.status === "ready", posted: e => e.status === "posted", draft: e => e.status === "draft", retired: e => e.status === "retired" };
  const list = S.episodes.filter(st[libFilter]).filter(e => !libQ || (e.id + " " + e.title + " " + (e.concept || "")).toLowerCase().includes(libQ.toLowerCase())).reverse();
  const count = k => S.episodes.filter(st[k]).length;
  $("#p-library").innerHTML = `<div class="page-head"><div><h1 class="h-page">Library</h1><div class="sub">${S.episodes.length} episodes</div></div>
    <input class="form-control" style="max-width:260px" placeholder="Search episodes" value="${esc(libQ)}" id="lib-q"></div>
    <div class="d-flex gap-2 mb-3 flex-wrap">${["all", "ready", "posted", "draft", "retired"].filter(k => k !== "retired" || count(k)).map(k => `<button class="chip ${libFilter === k ? "ochre" : ""}" data-filter="${k}">${k[0].toUpperCase() + k.slice(1)} · ${count(k)}</button>`).join("")}</div>
    <div class="lib">${list.map(e => { const p = postOf(e.id), L = latest(p);
      return `<button class="lib-card" data-open="${e.id}"><img src="${thumb(e.id)}" alt="" loading="lazy" onerror="this.style.opacity=.15"><div class="lib-meta">
        <div class="d-flex gap-1 flex-wrap"><span class="chip">${esc(e.id)}</span><span class="chip ${e.status === "posted" ? "ok" : e.status === "ready" ? "ochre" : ""}">${e.status}</span></div>
        <div class="t">${esc(e.title)}</div><div class="small muted mt-1">${L && L.views != null ? fmt(L.views) + " views" : p && p.scheduled_at && !p.posted_at ? "📅 " + fmtWhen(p.scheduled_at) : p && p.planned_at && !p.posted_at ? "⏱ " + fmtWhen(p.planned_at) : "&nbsp;"}</div></div></button>`; }).join("") || `<div class="muted">No episodes match.</div>`}</div>`;
  const q = $("#lib-q"); q.oninput = () => { libQ = q.value; const pos = q.selectionStart; library(); const nq = $("#lib-q"); nq.focus(); nq.setSelectionRange(pos, pos); };
}
function openDrawer(id) {
  const e = ep(id), tk = postOf(id);
  const plats = S.platforms.map(pl => { const p = postOf(id, pl);
    return `<div class="rowx px-0"><div class="grow"><b>${PLAT[pl]}</b><div class="small muted">${p && p.posted_at ? "Posted " + fmtWhen(p.posted_at) : p && p.scheduled_at ? "📅 Scheduled for " + fmtWhen(p.scheduled_at) : p && p.planned_at ? "Slot " + fmtWhen(p.planned_at) : "Not posted"}</div>
      ${p && p.url ? `<a class="small" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.url)}</a>` : ""}</div>
      ${p && p.posted_at ? `<button class="btn btn-soft btn-sm" data-unpost="${id}|${pl}">Undo</button>` : p && p.scheduled_at ? `<button class="btn btn-soft btn-sm" data-unsched="${id}|${pl}">Undo schedule</button>`
        : `${pl === "tiktok" ? `<button class="btn btn-primary btn-sm" data-sched="${id}">📅 Scheduled</button>` : ""}<button class="btn ${pl === "tiktok" ? "btn-soft" : "btn-primary"} btn-sm" data-posted="${id}|${pl}">Posted</button>`}</div>`; }).join("");
  const mrows = S.posts.filter(p => p.episode === id && p.posted_at).map(p => S.checkpoints.map(cp => { const m = p.metrics[cp] || {};
    return `<tr><td>${PLAT[p.platform]} · ${cp}</td><td class="num">${fmt(m.views)}</td><td class="num">${m.avg_watch != null ? m.avg_watch + "s" : "–"}</td><td class="num">${pct(m.full_pct)}</td><td class="num">${fmt(m.likes)}</td><td class="num">${fmt(m.shares)}</td><td class="num">${fmt(m.saves)}</td><td class="num">${fmt(m.follows)}</td>
      <td><button class="btn btn-soft btn-sm" data-num="${p.id}|${cp}">${m.views != null ? "Edit" : "Add"}</button></td></tr>`; }).join("")).join("");
  $("#dr-title").textContent = `${e.id} · ${e.title}`;
  $("#dr-body").innerHTML = `<video controls playsinline preload="none" poster="${thumb(id)}" src="/media/video/${id}"></video>
    <div class="actions my-3"><a class="btn btn-soft btn-sm" href="/media/video/${id}?dl=1" download="${id}.mp4">⬇ Video</a><button class="btn btn-soft btn-sm" data-copy="caption" data-ep="${id}">Copy caption</button>
      ${e.pinned ? `<button class="btn btn-soft btn-sm" data-copy="pinned" data-ep="${id}">Copy pinned</button>` : ""}<a class="btn btn-soft btn-sm" href="${STUDIO}" target="_blank" rel="noopener">TikTok Studio ↗</a></div>
    <div class="d-flex flex-wrap gap-2 mb-2"><span class="chip ${e.status === "posted" ? "ok" : "ochre"}">${e.status}</span>${e.duration ? `<span class="chip">${e.duration}s</span>` : ""}${e.lane ? `<span class="chip">${esc(e.lane.split("·")[0].split("(")[0])}</span>` : ""}</div>
    ${e.concept ? `<div class="mb-3">${esc(e.concept)}</div>` : ""}
    ${!tk || (!tk.posted_at && !tk.scheduled_at) ? `<label class="form-label">TikTok slot</label><input type="datetime-local" class="form-control mb-3" value="${tk && tk.planned_at ? tk.planned_at : ""}" data-plan="${id}">` : ""}
    <div class="section-title mt-0">Platforms</div>${plats}
    ${mrows ? `<div class="section-title">Numbers</div><div class="table-responsive"><table class="table table-sm"><thead><tr><th></th><th class="num">Views</th><th class="num">Avg</th><th class="num">Full</th><th class="num">Likes</th><th class="num">Shares</th><th class="num">Saves</th><th class="num">Follows</th><th></th></tr></thead><tbody>${mrows}</tbody></table></div>` : ""}
    <div class="section-title">What it tested</div><div class="stack-chips">${Object.entries(e.stack || {}).map(([k, v]) => `<span class="chip" title="${esc(v)}">${esc(k)}: ${esc(String(v).split(/[ (]/)[0])}</span>`).join("") || `<span class="muted small">No test stack logged</span>`}</div>
    <div class="section-title">Caption</div>${capBox(e, "caption")}
    ${e.pinned ? `<div class="section-title">Pinned comment</div>${capBox(e, "pinned")}` : ""}
    <div class="section-title">Notes</div><textarea class="form-control" rows="3" placeholder="Anything you noticed: comments, a dip, an idea…" data-note="${id}">${esc(e.notes || "")}</textarea>`;
  bootstrap.Offcanvas.getOrCreateInstance("#drawer").show();
}

// ---------- Analytics ----------
function analytics() {
  const cut = anRange === "all" ? 0 : Date.now() - (anRange === "30" ? 30 : 7) * 864e5;
  const ps = S.posts.filter(p => p.posted_at && D(p.posted_at) >= cut), tk = ps.filter(p => p.platform === "tiktok");
  const L = ps.map(latest).filter(Boolean), sum = k => L.reduce((a, m) => a + (m[k] || 0), 0), views = sum("views");
  const eng = views ? (sum("likes") + sum("comments") + sum("shares") + sum("saves")) / views * 100 : null;
  const m72 = tk.map(p => p.metrics["72h"]).filter(m => m && m.views != null), med = median(m72.map(m => m.views)), full = m72.filter(m => m.full_pct != null);
  $("#p-analytics").innerHTML = `<div class="page-head"><div><h1 class="h-page">Analytics</h1><div class="sub">${ps.length} posts in range · numbers from your screenshots</div></div>
    <div class="btn-group">${[["7", "7 days"], ["30", "30 days"], ["all", "All"]].map(([k, t]) => `<button class="btn ${anRange === k ? "btn-primary" : "btn-soft"} btn-sm" data-range="${k}">${t}</button>`).join("")}</div></div>
    <div class="row g-3 mb-3">${[["Views", fmt(views)], ["Median 72 h", fmt(med)], ["Watched to end", full.length ? pct(full.reduce((a, m) => a + m.full_pct, 0) / full.length) : "–"],
      ["Engagement", eng != null ? pct(eng) : "–"], ["Follows / 1k views", views ? (sum("follows") / views * 1000).toFixed(1) : "–"], ["Shares", fmt(sum("shares"))]]
      .map(([l, v]) => `<div class="col-6 col-md-4 col-xl-2"><div class="card kpi-card"><div class="kpi-label">${l}</div><div class="kpi-val">${v}</div></div></div>`).join("")}</div>
    <div class="row g-3">
      <div class="col-xl-8"><div class="card"><div class="card-header"><h3 class="card-title">Views per post</h3><div class="card-actions small muted">TikTok · 24 h / 72 h / 7 d</div></div><div class="card-body"><div id="c-views"></div></div></div></div>
      <div class="col-xl-4"><div class="card h-100"><div class="card-header"><h3 class="card-title">Best time to post</h3></div><div class="card-body">${heatmap(tk)}</div></div></div>
      <div class="col-lg-6"><div class="card"><div class="card-header"><h3 class="card-title">Watched to the end</h3><div class="card-actions small muted">72 h</div></div><div class="card-body"><div id="c-full"></div></div></div></div>
      <div class="col-lg-6"><div class="card"><div class="card-header"><h3 class="card-title">Engagement rate</h3><div class="card-actions small muted">likes + comments + shares + saves ÷ views</div></div><div class="card-body"><div id="c-eng"></div></div></div></div>
    </div>
    <div class="section-title">Ready to cross-post</div><div class="card mb-2">${crossPost()}</div>
    <div class="section-title">Experiments</div><div class="row g-3">${experiments(tk)}</div>`;
  const withV = tk.filter(p => Object.keys(p.metrics).length);
  chart("c-views", { chart: { type: "bar", height: 280, toolbar: { show: false } }, colors: ["#6b5a3c", OCHRE, "#f0c375"], plotOptions: { bar: { borderRadius: 4, columnWidth: "62%" } },
    series: S.checkpoints.map(cp => ({ name: cp, data: withV.map(p => (p.metrics[cp] || {}).views ?? null) })), xaxis: { categories: withV.map(p => p.episode) },
    yaxis: { labels: { formatter: fmt } }, dataLabels: { enabled: false }, legend: { position: "top" }, noData: { text: "No numbers yet" } });
  const f = tk.filter(p => p.metrics["72h"] && p.metrics["72h"].full_pct != null);
  chart("c-full", { chart: { type: "area", height: 230, toolbar: { show: false } }, colors: [OCHRE], stroke: { width: 3, curve: "smooth" }, fill: { type: "gradient", gradient: { opacityFrom: .35, opacityTo: 0 } },
    series: [{ name: "watched to end", data: f.map(p => p.metrics["72h"].full_pct) }], xaxis: { categories: f.map(p => p.episode) }, yaxis: { labels: { formatter: v => v.toFixed(0) + "%" } }, dataLabels: { enabled: false }, noData: { text: "No numbers yet" } });
  const e = tk.filter(p => latest(p) && latest(p).views);
  chart("c-eng", { chart: { type: "bar", height: 230, toolbar: { show: false } }, colors: [GREEN], plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
    series: [{ name: "engagement %", data: e.map(p => { const m = latest(p); return +(((m.likes || 0) + (m.comments || 0) + (m.shares || 0) + (m.saves || 0)) / m.views * 100).toFixed(2); }) }],
    xaxis: { categories: e.map(p => p.episode) }, yaxis: { labels: { formatter: v => v.toFixed(1) + "%" } }, dataLabels: { enabled: false }, noData: { text: "No numbers yet" } });
}
const toMin = s => +s.slice(0, 2) * 60 + +s.slice(3, 5);
function heatmap(tk) {
  const slots = [...S.settings.slots].sort(), days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], cell = {};
  tk.forEach(p => { const m = p.metrics["72h"], t = hm(p.posted_at); if (!m || m.views == null || !t) return;
    const s = slots.reduce((a, x) => Math.abs(toMin(x) - toMin(t)) < Math.abs(toMin(a) - toMin(t)) ? x : a, slots[0]); (cell[wd(p.posted_at) + s] = cell[wd(p.posted_at) + s] || []).push(m.views); });
  const max = Math.max(1, ...Object.values(cell).map(median));
  return `<div class="heat" style="grid-template-columns: 44px repeat(${slots.length}, 1fr)"><div class="h"></div>${slots.map(s => `<div class="h">${s}</div>`).join("")}
    ${days.map(d => `<div class="h">${d}</div>${slots.map(s => { const a = cell[d + s]; if (!a) return `<div>·</div>`; const v = median(a);
      return `<div title="${a.length} posts" style="background: rgba(201,138,43,${(.15 + .75 * v / max).toFixed(2)}); color:${v / max > .55 ? "#111" : "inherit"}">${fmt(v)}</div>`; }).join("")}`).join("")}</div>
    <div class="small muted mt-2">Median 72 h views by weekday and slot (nearest slot). Each cell needs a few posts before it means much.</div>`;
}
function crossPost() {
  const med = S.median_72h_tiktok; if (med == null) return `<div class="empty-note">Once posts have 72 h numbers, anything beating the TikTok median shows up here for Instagram and Threads.</div>`;
  const c = S.posts.filter(p => p.platform === "tiktok" && p.metrics["72h"] && p.metrics["72h"].views > med);
  return c.length ? c.map(p => { const e = ep(p.episode), ig = postOf(e.id, "instagram"), th = postOf(e.id, "threads");
    return `<div class="rowx"><img class="thumb-sm" src="${thumb(e.id)}" alt=""><div class="grow"><b>${esc(e.id)} · ${esc(e.title)}</b><div class="small muted">${fmt(p.metrics["72h"].views)} views at 72 h · median ${fmt(med)}</div></div>
      ${posted(ig) ? `<span class="chip ok">IG ✓</span>` : `<button class="btn btn-soft btn-sm" data-posted="${e.id}|instagram">IG posted</button>`}${posted(th) ? `<span class="chip ok">Threads ✓</span>` : `<button class="btn btn-soft btn-sm" data-posted="${e.id}|threads">Threads posted</button>`}</div>`; }).join("")
    : `<div class="empty-note">Nothing above the TikTok median (${fmt(med)}) yet.</div>`;
}
function experiments(tk) {
  const groups = {};
  tk.filter(p => p.metrics["72h"]).forEach(p => { const st = { ...ep(p.episode).stack, "Post time": hm(p.posted_at) || "?", "Weekday": wd(p.posted_at) || "?" };
    Object.entries(st).forEach(([g, opt]) => { const k = String(opt).split(/[ (·:]/)[0] || String(opt); ((groups[g] = groups[g] || {})[k] = groups[g][k] || []).push(p); }); });
  const names = Object.keys(groups);
  return names.length ? names.map(g => { const rows = Object.entries(groups[g]).map(([k, l]) => { const f = l.map(p => p.metrics["72h"].full_pct).filter(x => x != null);
      return { k, n: l.length, med: median(l.map(p => p.metrics["72h"].views)), full: f.length ? f.reduce((a, b) => a + b, 0) / f.length : null, eps: l.map(p => p.episode).join(", ") }; })
      .sort((a, b) => (b.med || 0) - (a.med || 0));
    return `<div class="col-md-6 col-xl-4"><div class="card h-100"><div class="card-header"><h3 class="card-title">${esc(g)}</h3></div><table class="table table-sm card-table">
      <thead><tr><th>Option</th><th class="num">Posts</th><th class="num">Median 72 h</th><th class="num">Full</th></tr></thead><tbody>
      ${rows.map((r, i) => `<tr title="${esc(r.eps)}"><td>${i === 0 && rows.length > 1 && r.n >= 3 ? "🏆 " : ""}${esc(r.k)}</td><td class="num">${r.n}</td><td class="num">${fmt(r.med)}</td><td class="num">${pct(r.full)}</td></tr>`).join("")}</tbody></table></div></div>`; }).join("")
    : `<div class="col-12"><div class="card"><div class="empty-note">Each experiment group (hook, edit, camera, style beat, length, post time…) ranks its options here once posts have 72 h numbers. 🏆 marks a leader with 3+ posts.</div></div></div>`;
}
function chart(id, opt) {
  const dark = document.documentElement.getAttribute("data-bs-theme") === "dark";
  Object.assign(opt, { theme: { mode: dark ? "dark" : "light" }, grid: { borderColor: dark ? "#26262c" : "#e5e1d8", strokeDashArray: 4 }, tooltip: { theme: dark ? "dark" : "light" } });
  opt.chart.background = "transparent"; opt.chart.fontFamily = "inherit"; opt.chart.foreColor = dark ? "#8d8a85" : "#6b6760";
  if (charts[id]) { charts[id].destroy(); delete charts[id]; } const el = document.getElementById(id); if (!el) return;
  if (opt.series.every(s => !s.data.some(v => v != null))) { el.innerHTML = `<div class="empty-note">No numbers yet: they appear after your first stats screenshots.</div>`; return; }
  charts[id] = new ApexCharts(el, opt); charts[id].render();
}

// ---------- Inbox ----------
function inbox() {
  const open = inboxOpen(), done = S.inbox.filter(i => i.processed).slice(0, 12), wait = due().filter(d => d.state === "due");
  const eps = [...new Set(wait.map(d => d.episode))].map(ep), over = wait.filter(late);
  $("#p-inbox").innerHTML = `<div class="page-head"><div><h1 class="h-page">Inbox</h1><div class="sub">Analytics screenshots: drop them here or send them to the bot with <code>/stats ex13 72h</code>. The Air reads the numbers; you confirm.</div></div></div>
    ${over.length ? `<div class="card mb-3" style="border-left:3px solid var(--bad)"><div class="card-body py-2"><b>⏰ ${over.length} overdue</b> <span class="muted small">· more than 12 h past due: ${over.map(d => `${d.episode} ${d.checkpoint}`).join(", ")}. The bot reminds you every 12 h until they're in.</span></div></div>` : ""}
    <div class="section-title">Waiting for numbers</div><div class="card mb-3">${wait.length ? wait.map(d => { const e = ep(d.episode);
      return `<div class="rowx stat"><img class="thumb-sm" src="${thumb(e.id)}" alt="" onerror="this.style.visibility='hidden'"><div class="grow"><div class="fw-bold ell">${esc(e.id)} · ${esc(e.title)}</div>
        <div class="small muted">${PLAT[d.platform]} · due ${rel(d.due_at)}</div></div><div class="row-act">${late(d) ? `<span class="chip bad">overdue</span>` : ""}<span class="chip warn">${d.checkpoint}</span>
        <button class="btn btn-primary btn-sm" data-upload="${e.id}|${d.checkpoint}">Upload</button><button class="btn btn-soft btn-sm" data-num="${d.post_id}|${d.checkpoint}">Type</button></div></div>`; }).join("")
      : `<div class="empty-note">All numbers are in. New ones come due 24 h, 72 h and 7 days after each post.</div>`}</div>
    ${wait.length ? `<div class="card mb-3"><div class="card-body"><div class="row g-2 align-items-end">
      <div class="col-6 col-md-4"><label class="form-label">Episode</label><select class="form-select" id="up-ep">${eps.map(e => `<option value="${e.id}">${e.id} · ${esc(e.title)}</option>`).join("")}</select></div>
      <div class="col-6 col-md-3"><label class="form-label">Checkpoint</label><select class="form-select" id="up-cp"></select></div>
      <div class="col-12 col-md-5"><div class="drop" id="drop" role="button">Drop a screenshot here, or <b>tap to choose</b></div></div></div></div></div>` : ""}
    ${open.length ? `<div class="section-title">To review</div><div class="row g-3 mb-3">${open.map(i => shotCard(i, true)).join("")}</div>` : `<div class="card mb-3"><div class="empty-note">Nothing to review.</div></div>`}
    ${done.length ? `<div class="section-title">Saved</div><div class="row g-3">${done.map(i => shotCard(i, false)).join("")}</div>` : ""}`;
  if (!wait.length) return;
  const cps = () => { $("#up-cp").innerHTML = wait.filter(d => d.episode === $("#up-ep").value).map(d => `<option>${d.checkpoint}</option>`).join(""); };
  cps(); $("#up-ep").onchange = cps;
  const dz = $("#drop"); dz.onclick = () => { pendingUpload = [$("#up-ep").value, $("#up-cp").value]; if (pendingUpload[0]) $("#file").click(); };
  dz.ondragover = e => { e.preventDefault(); dz.classList.add("over"); }; dz.ondragleave = () => dz.classList.remove("over");
  dz.ondrop = e => { e.preventDefault(); dz.classList.remove("over"); const f = e.dataTransfer.files[0]; if (f && $("#up-ep").value) upload($("#up-ep").value, $("#up-cp").value, f); };
}
function shotCard(i, open) {
  const s = i.suggest || {}, got = Object.keys(s).length;
  return `<div class="col-6 col-md-4 col-xl-3"><div class="card ${open ? "" : "opacity-75"}"><a href="/shots/${esc(i.path)}" target="_blank"><img class="shot" src="/shots/${esc(i.path)}" loading="lazy" alt=""></a>
    <div class="card-body p-3"><div class="d-flex justify-content-between"><b>${esc(i.episode)}</b><span class="chip">${esc(i.checkpoint)}</span></div>
    <div class="small muted mt-1">${fmtWhen(i.received_at)} · ${i.origin === "upload" ? "uploaded" : "via bot"}</div>
    <div class="small mt-1">${got ? `Read ${got} numbers${s.views != null ? " · " + fmt(s.views) + " views" : ""}` : "<span class='muted'>No numbers read</span>"}</div>
    ${open ? `<div class="d-flex gap-2 mt-2"><button class="btn btn-primary btn-sm flex-fill" data-review="${i.id}">Review</button><button class="btn btn-soft btn-sm" data-del="${i.id}" aria-label="Delete">✕</button></div>` : `<span class="chip ok mt-2">saved</span>`}</div></div></div>`;
}
async function upload(epId, cp, file) {
  toast("Reading the screenshot…"); const r = await api(`/api/upload?episode=${epId}&checkpoint=${cp}`, undefined, file); await load();
  const p = postOf(epId); openNum(p ? p.id : null, cp, r.suggest, r.id);
}

// ---------- Settings ----------
function settings() {
  const s = S.settings;
  $("#p-settings").innerHTML = `<div class="page-head"><div><h1 class="h-page">Settings</h1><div class="sub">Posting rhythm, reminders and how the bot nudges you.</div></div></div>
    <div class="row g-3"><div class="col-lg-7"><div class="card"><div class="card-body">
      <label class="form-label">Posting slots</label><div class="d-flex flex-wrap gap-2 mb-2">${s.slots.map(t => `<span class="chip ochre">${t} <a href="#" data-rmslot="${t}" class="text-reset" aria-label="Remove">✕</a></span>`).join("")}</div>
      <div class="d-flex gap-2 mb-1"><input type="time" class="form-control" style="max-width:150px" id="add-slot"><button class="btn btn-soft" data-addslot>Add slot</button></div>
      <div class="small muted mb-3">Slots rotate day by day so post time becomes a fair experiment.</div>
      <div class="row g-2"><div class="col-6"><label class="form-label">Posts per day</label><select class="form-select" id="per-day">${[1, 2, 3].map(n => `<option ${+s.per_day === n ? "selected" : ""}>${n}</option>`).join("")}</select></div>
        <div class="col-6"><label class="form-label">Reminder before a slot</label><select class="form-select" id="lead">${[15, 30, 60, 120].map(n => `<option value="${n}" ${+s.lead_min === n ? "selected" : ""}>${n} min</option>`).join("")}</select></div>
        <div class="col-6"><label class="form-label">Quiet from</label><input type="time" class="form-control" id="q0" value="${s.quiet[0]}"></div>
        <div class="col-6"><label class="form-label">Quiet until</label><input type="time" class="form-control" id="q1" value="${s.quiet[1]}"></div></div>
      <div class="small muted mt-1">No stats nudges in quiet hours. Slot reminders always come.</div>
      <div class="d-flex gap-2 mt-3 flex-wrap"><button class="btn btn-primary" data-savesettings>Save</button><button class="btn btn-soft" data-replan>Re-plan unposted with these</button></div></div></div></div>
    <div class="col-lg-5"><div class="card"><div class="card-body">
      <div class="fw-bold mb-2">Appearance</div><button class="btn btn-soft" data-theme>Switch to ${document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"} mode</button>
      <div class="fw-bold mt-4 mb-2">Telegram bot</div><div class="small muted">
        <code>/posted ex13 tiktok 18:00</code> marks a post<br><code>/stats ex13 72h</code> + screenshot sends numbers<br><code>/dash</code> summary · <code>/ex13</code> video + caption</div>
      <div class="fw-bold mt-4 mb-2">On your phone</div><div class="small muted">Safari → Share → <b>Add to Home Screen</b> for an app icon that opens full screen.</div>
      <div class="fw-bold mt-4 mb-2">Server</div><div class="small muted">MacBook Air · private on Tailscale · up since ${fmtWhen(S.server.started)}</div></div></div></div></div>`;
}

// ---------- modals ----------
function openNum(postId, cp, sug, inboxId) {
  const f = $("#mn-form"); f.reset(); f.dataset.inbox = inboxId || "";
  const ps = S.posts.filter(p => p.posted_at); $("#mn-post").innerHTML = ps.map(p => `<option value="${p.id}">${p.episode} · ${PLAT[p.platform]}</option>`).join("");
  if (postId) $("#mn-post").value = postId; f.checkpoint.value = cp || "72h";
  const p = S.posts.find(x => x.id == postId), have = p && p.metrics[cp || "72h"];
  Object.entries({ ...(have || {}), ...(sug || {}) }).forEach(([k, v]) => { if (f.elements[k] && v != null && k !== "checkpoint" && k !== "post_id") f.elements[k].value = v; });
  const i = inboxId && S.inbox.find(x => x.id == inboxId);
  $("#mn-shot").innerHTML = i ? `<a href="/shots/${esc(i.path)}" target="_blank"><img src="/shots/${esc(i.path)}" style="max-height:220px;border-radius:10px" alt=""></a>` : "";
  $("#mn-note").textContent = sug && Object.keys(sug).length ? `Pre-filled ${Object.keys(sug).length} numbers from the screenshot. Check them against it, then save.` : i ? "No numbers could be read: type them in." : "";
  $("#mn-title").textContent = p ? `${p.episode} · ${PLAT[p.platform]}` : "Numbers";
  bootstrap.Modal.getOrCreateInstance("#m-num").show();
}
function openPosted(id, pl = "tiktok") {
  const f = $("#mp-form"); f.reset(); f.dataset.ep = id; f.dataset.pl = pl;
  $("#mp-title").textContent = `${id} posted`; f.posted_at.value = localISO(new Date());
  $("#mp-plat").innerHTML = S.platforms.map(k => `<button type="button" class="btn ${k === pl ? "btn-primary" : "btn-soft"}" data-pl="${k}">${PLAT[k]}</button>`).join("");
  bootstrap.Modal.getOrCreateInstance("#m-post").show();
}

function openSched(id) {
  const f = $("#ms-form"), p = postOf(id); f.reset(); f.dataset.ep = id;
  $("#ms-title").textContent = `${id} scheduled in Studio`; f.scheduled_at.value = (p && (p.scheduled_at || p.planned_at)) || localISO(new Date());
  bootstrap.Modal.getOrCreateInstance("#m-sched").show();
}

// ---------- events ----------
document.addEventListener("click", async ev => {
  const t = ev.target.closest("[data-sched],[data-unsched],[data-swhen],[data-copy],[data-posted],[data-open],[data-play],[data-replan],[data-upload],[data-num],[data-filter],[data-range],[data-review],[data-del],[data-unpost],[data-addslot],[data-rmslot],[data-savesettings],[data-theme],[data-pl],[data-when],#theme-d");
  if (!t) return; const d = t.dataset;
  if (d.sched) openSched(d.sched);
  else if (d.unsched) { const [id, pl] = d.unsched.split("|"); await api("/api/unschedule", { episode: id, platform: pl || "tiktok" }); toast(`${id}: back to not scheduled`); await load(); if ($("#drawer").classList.contains("show")) openDrawer(id); }
  else if (d.swhen) { const f = $("#ms-form"), p = postOf(f.dataset.ep); f.scheduled_at.value = d.swhen === "now" ? localISO(new Date()) : (p && p.planned_at) || localISO(new Date()); }
  else if (d.copy) { const e = ep(d.ep); copy(d.copy === "caption" ? e.caption : e.pinned); }
  else if (d.posted) { const [id, pl] = d.posted.split("|"); openPosted(id, pl || "tiktok"); }
  else if (d.open) openDrawer(d.open);
  else if (d.play) { $("#hero-media").innerHTML = `<video src="/media/video/${d.play}" controls autoplay playsinline></video>`; }
  else if (d.replan !== undefined) { if (confirm("Re-plan every unposted episode into the next free slots, from tomorrow?")) { const r = await api("/api/replan", {}); toast(`Planned ${r.plan.length} posts`); load(); } }
  else if (d.upload) { pendingUpload = d.upload.split("|"); $("#file").click(); }
  else if (d.num) { const [pid, cp] = d.num.split("|"); openNum(+pid, cp); }
  else if (d.filter) { libFilter = d.filter; library(); }
  else if (d.range) { anRange = d.range; analytics(); }
  else if (d.review) { const i = S.inbox.find(x => x.id == d.review), p = postOf(i.episode); openNum(p ? p.id : null, i.checkpoint, i.suggest, i.id); }
  else if (d.del) { if (confirm("Delete this screenshot from the inbox?")) { await api("/api/inbox/delete", { id: +d.del }); load(); } }
  else if (d.unpost) { const [id, pl] = d.unpost.split("|"); if (confirm(`Undo "posted" for ${id} on ${PLAT[pl]}?`)) { await api("/api/unpost", { episode: id, platform: pl }); await load(); openDrawer(id); } }
  else if (d.addslot !== undefined) { const v = $("#add-slot").value; if (v && !S.settings.slots.includes(v)) { S.settings.slots = [...S.settings.slots, v].sort(); settings(); } }
  else if (d.rmslot) { ev.preventDefault(); if (S.settings.slots.length > 1) { S.settings.slots = S.settings.slots.filter(x => x !== d.rmslot); settings(); } }
  else if (d.savesettings !== undefined) { await api("/api/settings", { slots: S.settings.slots, per_day: +$("#per-day").value, lead_min: +$("#lead").value, quiet: [$("#q0").value, $("#q1").value] }); toast("Settings saved"); load(); }
  else if (d.theme !== undefined || t.id === "theme-d") { ev.preventDefault(); const n = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-bs-theme", n); try { localStorage.setItem("theme", n); } catch (e) {} $("#theme-d").textContent = n === "dark" ? "Light mode" : "Dark mode"; render(); }
  else if (d.pl) { $("#mp-form").dataset.pl = d.pl; $$("#mp-plat .btn").forEach(b => b.className = "btn " + (b.dataset.pl === d.pl ? "btn-primary" : "btn-soft")); }
  else if (d.when) { const f = $("#mp-form"), p = postOf(f.dataset.ep, f.dataset.pl); f.posted_at.value = d.when === "now" ? localISO(new Date()) : (p && p.planned_at) || localISO(new Date()); }
});
document.addEventListener("change", async ev => {
  const i = ev.target;
  if (i.dataset && i.dataset.plan && i.value) { await api("/api/plan", { episode: i.dataset.plan, platform: "tiktok", planned_at: i.value }); toast("Slot saved"); load(); }
  if (i.id === "file" && i.files[0] && pendingUpload) { await upload(pendingUpload[0], pendingUpload[1], i.files[0]); i.value = ""; }
});
document.addEventListener("focusout", async ev => { const i = ev.target; if (i.dataset && i.dataset.note !== undefined) { const e = ep(i.dataset.note); if ((e.notes || "") === i.value) return; await api("/api/note", { episode: i.dataset.note, notes: i.value }); e.notes = i.value; toast("Note saved"); } });
$("#mn-form").addEventListener("submit", async ev => {
  ev.preventDefault(); const f = ev.target, d = Object.fromEntries(new FormData(f)); d.post_id = +d.post_id; d.source = f.dataset.inbox ? "screenshot" : "manual"; if (f.dataset.inbox) d.inbox_id = +f.dataset.inbox;
  await api("/api/metrics", d); bootstrap.Modal.getInstance("#m-num").hide(); toast("Numbers saved"); load();
});
$("#mp-form").addEventListener("submit", async ev => {
  ev.preventDefault(); const f = ev.target, id = f.dataset.ep, pl = f.dataset.pl;
  await api("/api/posted", { episode: id, platform: pl, posted_at: f.posted_at.value }); if (f.url.value) await api("/api/url", { episode: id, platform: pl, url: f.url.value });
  bootstrap.Modal.getInstance("#m-post").hide(); toast(`${id} marked posted on ${PLAT[pl]}`); await load();
  if ($("#drawer").classList.contains("show")) openDrawer(id);
});
$("#ms-form").addEventListener("submit", async ev => {
  ev.preventDefault(); const f = ev.target, id = f.dataset.ep;
  await api("/api/schedule", { episode: id, platform: "tiktok", scheduled_at: f.scheduled_at.value });
  bootstrap.Modal.getInstance("#m-sched").hide(); toast(`📅 ${id} scheduled · counts as posted ${fmtWhen(f.scheduled_at.value)}`); await load();
  if ($("#drawer").classList.contains("show")) openDrawer(id);
});
window.addEventListener("hashchange", render);
try { const th = localStorage.getItem("theme"); if (th) document.documentElement.setAttribute("data-bs-theme", th); } catch (e) {}
$("#theme-d").textContent = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "Light mode" : "Dark mode";
setInterval(() => $$("[data-count]").forEach(el => el.textContent = rel(el.dataset.count)), 30000);
load(); setInterval(() => { if (!document.querySelector(".modal.show, .offcanvas.show") && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) load(); }, 60000);
