#!/usr/bin/env node
/**
 * Проверка DNS для air-cloud-msk.ru (Vercel).
 * Запуск: npm run dns:check
 */

import { execSync } from "node:child_process";

const DOMAIN = "air-cloud-msk.ru";
const WWW = `www.${DOMAIN}`;
const EXPECTED_APEX = new Set(["64.29.17.1", "216.198.79.1"]);
const EXPECTED_WWW_CNAME = "cname.vercel-dns.com";

function dig(name, type) {
  try {
    const out = execSync(`dig +short ${name} ${type}`, { encoding: "utf8", timeout: 15000 });
    return out
      .trim()
      .split("\n")
      .map((line) => line.trim().replace(/\.$/, ""))
      .filter(Boolean);
  } catch {
    return [];
  }
}

let ok = true;

console.log(`\nПроверка DNS для ${DOMAIN}\n`);

const apexA = dig(DOMAIN, "A");
console.log(`A ${DOMAIN}:`);
if (apexA.length === 0) {
  console.log("  ✗ записей нет");
  ok = false;
} else {
  for (const ip of apexA) {
    const good = EXPECTED_APEX.has(ip);
    console.log(`  ${good ? "✓" : "✗"} ${ip}`);
    if (!good) ok = false;
  }
  for (const expected of EXPECTED_APEX) {
    if (!apexA.includes(expected)) {
      console.log(`  ✗ отсутствует ${expected}`);
      ok = false;
    }
  }
}

const wwwCname = dig(WWW, "CNAME");
const wwwA = dig(WWW, "A");
console.log(`\nwww (${WWW}):`);
if (wwwA.length > 0) {
  console.log(`  ✗ найдена A-запись (нужен CNAME): ${wwwA.join(", ")}`);
  ok = false;
}
if (wwwCname.length === 0) {
  console.log("  ✗ CNAME отсутствует");
  ok = false;
} else {
  for (const target of wwwCname) {
    const good = target === EXPECTED_WWW_CNAME;
    console.log(`  ${good ? "✓" : "✗"} CNAME → ${target}`);
    if (!good) ok = false;
  }
}

const wildcard = dig(`*.${DOMAIN}`, "A");
if (wildcard.length > 0) {
  console.log(`\n✗ Удалите wildcard *.${DOMAIN} → A (${wildcard.join(", ")})`);
  ok = false;
}

console.log(
  ok
    ? "\n✓ DNS настроен правильно для Vercel.\n"
    : "\n✗ DNS нужно исправить в Jino — см. docs/dns-jino.md\n",
);

process.exit(ok ? 0 : 1);
