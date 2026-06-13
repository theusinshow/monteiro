/**
 * One-off asset pipeline: takes the raw JPGs in /assets/imgs/projetos/<projN>
 * and emits optimized, auto-oriented WebP masters into /public/projetos/<slug>.
 * next/image generates the responsive srcset variants at request time.
 *
 *   node scripts/optimize-images.mjs
 *
 * Re-running is idempotent (overwrites outputs).
 */
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "assets/imgs/projetos");
const OUT = path.join(ROOT, "public/projetos");

const COVER_MAX = 2400; // longest edge
const GALLERY_MAX = 2000;
const QUALITY = 80;

/** source folder -> output slug + ordered files (first = cover) */
const MAP = {
  proj1: {
    slug: "casa-mirante",
    cover: "DSC_9688_01_.jpg",
    gallery: [
      "DJI_20250514131408_0604_D_01_.jpg",
      "DSC_2931_01_.jpg",
      "DSC_9782_01_.jpg",
      "DJI_20250514131921_0618_D_01_.jpg",
    ],
  },
  proj2: {
    slug: "pavilhao-pomar",
    cover: "the-pomelo-amphawa-cafe-looklen-architects_1.jpg",
    gallery: [
      "the-pomelo-amphawa-cafe-looklen-architects_8.jpg",
      "the-pomelo-amphawa-cafe-looklen-architects_12.jpg",
      "the-pomelo-amphawa-cafe-looklen-architects_14.jpg",
      "the-pomelo-amphawa-cafe-looklen-architects_16.jpg",
    ],
  },
  proj3: {
    slug: "casa-horizonte",
    cover: "casa-florenzano-leo-romano_2.jpg",
    gallery: [
      "casa-florenzano-leo-romano_4.jpg",
      "casa-florenzano-leo-romano_14.jpg",
      "casa-florenzano-leo-romano_15.jpg",
      "casa-florenzano-leo-romano_16.jpg",
    ],
  },
  proj4: {
    slug: "casa-bosque",
    cover: "hakuba_5805.jpg",
    gallery: [
      "hakuba_2227.jpg",
      "hakuba_5441.jpg",
      "hakuba_w_naka.jpg",
      "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq.jpg",
    ],
  },
  proj5: {
    slug: "casa-vertice",
    cover: "la-casa-de-papel-bhoomija-creations_1.jpg",
    gallery: [
      "la-casa-de-papel-bhoomija-creations_2.jpg",
      "la-casa-de-papel-bhoomija-creations_3.jpg",
      "la-casa-de-papel-bhoomija-creations_10.jpg",
      "la-casa-de-papel-bhoomija-creations_17.jpg",
    ],
  },
  proj6: {
    slug: "atelier-norte",
    cover: "Instar_House_Exterior_Shots_05.jpg",
    gallery: [
      "Instar_House_Exterior_Shots_03.jpg",
      "Instar_House_02.jpg",
      "Instar_House_04.jpg",
      "Instar_House_06.jpg",
    ],
  },
};

async function emit(srcFile, outFile, maxEdge) {
  await sharp(srcFile)
    .rotate() // honor EXIF orientation
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outFile);
}

for (const [folder, def] of Object.entries(MAP)) {
  const outDir = path.join(OUT, def.slug);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const coverSrc = path.join(SRC, folder, def.cover);
  await emit(coverSrc, path.join(outDir, "capa.webp"), COVER_MAX);

  let i = 1;
  for (const g of def.gallery) {
    const n = String(i).padStart(2, "0");
    await emit(path.join(SRC, folder, g), path.join(outDir, `${n}.webp`), GALLERY_MAX);
    i++;
  }
  console.log(`${def.slug}: capa + ${def.gallery.length} galeria`);
}

console.log("done.");
