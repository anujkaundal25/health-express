// Downloads the real photos from https://health-express-rho.vercel.app into /public/images.
// Runs automatically before `npm run dev` and `npm run build`. Files that already exist are skipped,
// and a failed download never breaks the build (the site falls back to the bundled photos).
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "https://health-express-rho.vercel.app";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const files = [
  ["/images/Logo.jpg", "/images/logo.jpg"],
  ["/images/Home/ambulanceService.jpeg", "/images/home/ambulance-service.jpeg"],
  ...[1, 2, 3, 4].map((n) => [`/images/hero/slide-${n}.jpg`, `/images/hero/slide-${n}.jpg`]),
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => [`/images/fleet/van-${n}.jpg`, `/images/fleet/van-${n}.jpg`]),
];

let ok = 0, skipped = 0, failed = 0;
for (const [src, dest] of files) {
  const out = join(root, dest);
  if (existsSync(out)) { skipped++; continue; }
  try {
    const res = await fetch(SOURCE + src, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    failed++;
    console.warn(`[fetch-images] could not download ${src}: ${e.message}`);
  }
}
console.log(`[fetch-images] downloaded ${ok}, already present ${skipped}, failed ${failed}`);
