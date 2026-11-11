// Stills: serve the episode folder, open build/stills.html?shot=X in system Chrome, wait for window.__done, screenshot.
//   node build/shoot.mjs L01 L05 L06        → out/stills/<shot>.png
import { createRequire } from "module";
import http from "http";
import fs from "fs";
import path from "path";
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.HOME + "/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core");
const EP = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ttf": "font/ttf", ".json": "application/json" };
const server = http.createServer((q, r) => {
  const p = path.join(EP, decodeURIComponent(q.url.split("?")[0]));
  if (!p.startsWith(EP) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "Content-Type": TYPES[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(r);
}).listen(0);
const port = server.address().port;
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new", args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--window-size=1080,1920"],
});
fs.mkdirSync(`${EP}/out/stills`, { recursive: true });
const shots = process.argv.slice(2);
for (const arg of shots) {
  const [shot, extra = ""] = arg.split("@");   // e.g. L01@grey=1&caps=0
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  page.on("console", (m) => { if (m.type() === "error" || m.text().startsWith("[ex36]")) console.log(shot, m.text()); });
  page.on("pageerror", (e) => console.log(shot, "pageerror", e.message));
  await page.goto(`http://localhost:${port}/build/stills.html?shot=${shot}&${extra}`, { waitUntil: "load" });
  await page.waitForFunction("window.__done === true", { timeout: 60000 });
  const name = extra ? `${shot}_${extra.replace(/[=&]/g, "-")}` : shot;
  await page.screenshot({ path: `${EP}/out/stills/${name}.png` });
  const info = await page.evaluate(() => window.__info || null);
  if (info) console.log(shot, JSON.stringify(info));
  console.log("wrote", `out/stills/${name}.png`);
  await page.close();
}
await browser.close(); server.close();
