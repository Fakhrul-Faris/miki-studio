// Contact sheet / frame strip of the standalone world: node build/strip.mjs <out.png> t1 t2 ...   (also prints __ex36check if --check)
import { createRequire } from "module"; import http from "http"; import fs from "fs"; import path from "path";
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.HOME + "/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core");
const EP = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const TY = { ".html": "text/html", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ttf": "font/ttf", ".json": "application/json" };
const server = http.createServer((q, r) => { const p = path.join(EP, decodeURIComponent(q.url.split("?")[0])); if (!p.startsWith(EP) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { "Content-Type": TY[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(r); }).listen(0);
const args = process.argv.slice(2); const check = args.includes("--check"); const out = args[0]; const ts = args.slice(1).filter((a) => a !== "--check").map(Number);
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const page = await browser.newPage(); await page.setViewport({ width: 1080, height: 1920 });
page.on("pageerror", (e) => console.log("pageerror", e.message)); page.on("console", (m) => { if (m.type() === "error" && !m.text().includes("404")) console.log(m.text()); });
await page.goto(`http://localhost:${server.address().port}/build/world_dev.html`, { waitUntil: "load" });
await page.waitForFunction("window.__ready === true", { timeout: 120000 });
if (check) console.log("check", JSON.stringify(await page.evaluate(() => window.__ex36check(0.25))));
fs.mkdirSync(`${EP}/out/strip`, { recursive: true }); const files = [];
for (const t of ts) { await page.evaluate((t) => window.__ex36.render(t), t); const f = `${EP}/out/strip/f_${t.toFixed(2)}.png`; await page.screenshot({ path: f }); files.push(f); }
console.log(JSON.stringify(files)); await browser.close(); server.close();
