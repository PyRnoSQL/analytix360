#!/usr/bin/env node

/**
 * Download company logos for the Analytix360 Services page.
 * Run: node scripts/download-logos.mjs
 * 
 * Tries multiple logo sources for reliability.
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const LOGO_DIR = join("client", "public", "logos");

const COMPANIES = [
  { file: "exxonmobil.png", domain: "exxonmobil.com", name: "ExxonMobil" },
  { file: "shell.png", domain: "shell.com", name: "Shell" },
  { file: "bp.png", domain: "bp.com", name: "BP" },
  { file: "aker-solutions.png", domain: "akersolutions.com", name: "Aker Solutions" },
  { file: "tullow-oil.png", domain: "tullowoil.com", name: "Tullow Oil" },
  { file: "saipem.png", domain: "saipem.com", name: "Eni-Saipem" },
  { file: "noble-energy.png", domain: "nblenergy.com", name: "Noble Energy" },
  { file: "schlumberger.png", domain: "slb.com", name: "Schlumberger" },
  { file: "microsoft.png", domain: "microsoft.com", name: "Microsoft" },
  { file: "t-mobile.png", domain: "t-mobile.com", name: "T-Mobile" },
  { file: "intuit.png", domain: "intuit.com", name: "Intuit" },
  { file: "abbott.png", domain: "abbott.com", name: "Abbott" },
  { file: "bd.png", domain: "bd.com", name: "Becton Dickinson" },
  { file: "novartis.png", domain: "novartis.com", name: "Novartis" },
  { file: "alcon.png", domain: "alcon.com", name: "Alcon" },
  { file: "medtronic.png", domain: "medtronic.com", name: "Medtronic" },
  { file: "volvo.png", domain: "volvo.com", name: "Volvo" },
  { file: "zf.png", domain: "zf.com", name: "ZF" },
  { file: "textron.png", domain: "textron.com", name: "Textron" },
  { file: "johnson-controls.png", domain: "johnsoncontrols.com", name: "Johnson Controls" },
  { file: "caci.png", domain: "caci.com", name: "CACI International" },
  { file: "shl-medical.png", domain: "shl-medical.com", name: "SHL Medical" },
];

// Logo sources to try in order
const SOURCES = [
  (domain) => `https://logo.clearbit.com/${domain}?size=200`,
  (domain) => `https://img.logo.dev/${domain}?token=pk_anonymous&size=200`,
  (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
];

async function downloadLogo(company) {
  for (const getUrl of SOURCES) {
    const url = getUrl(company.domain);
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok) {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("image")) {
          const buffer = Buffer.from(await res.arrayBuffer());
          if (buffer.length > 500) {
            const path = join(LOGO_DIR, company.file);
            writeFileSync(path, buffer);
            console.log(`✓ ${company.name} (${buffer.length} bytes)`);
            return true;
          }
        }
      }
    } catch {
      // Try next source
    }
  }
  console.log(`✗ ${company.name} — download manually`);
  return false;
}

async function main() {
  if (!existsSync(LOGO_DIR)) mkdirSync(LOGO_DIR, { recursive: true });

  console.log(`\nDownloading ${COMPANIES.length} logos to ${LOGO_DIR}/\n`);

  let success = 0;
  for (const company of COMPANIES) {
    if (await downloadLogo(company)) success++;
  }

  console.log(`\n${success}/${COMPANIES.length} logos downloaded.`);
  if (success < COMPANIES.length) {
    console.log(
      "\nFor any missing logos, download them manually from the company website"
    );
    console.log(`and save as PNG files in: ${LOGO_DIR}/`);
  }
}

main();
