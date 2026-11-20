import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { isProLicense, issueKey } = require("./proLicense.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("demo key unlocks pro", () => {
  assert.equal(isProLicense("PRKIT-PRO-DEMO-2026"), true);
  assert.equal(isProLicense("prkit-pro-demo-2026"), true);
});

test("empty and garbage fail", () => {
  assert.equal(isProLicense(""), false);
  assert.equal(isProLicense("FREE"), false);
  assert.equal(isProLicense("PRKIT-AAAA-BBBB-0000"), false);
});

test("issued key round-trip", () => {
  const key = issueKey("ACME01");
  assert.match(key, /^PRKIT-[A-Z0-9]{4}-[A-Z0-9]{4}-[0-9]{4}$/);
  assert.equal(isProLicense(key), true);
});

test("catalog and template files exist", () => {
  const catalog = JSON.parse(
    fs.readFileSync(path.join(__dirname, "templates", "catalog.json"), "utf8")
  );
  assert.equal(catalog.free.length, 3);
  assert.ok(catalog.pro.length >= 4);
  for (const entry of [...catalog.free, ...catalog.pro]) {
    const file = path.join(__dirname, "templates", entry.file);
    assert.ok(fs.existsSync(file), entry.file);
    assert.ok(fs.readFileSync(file, "utf8").trim().length > 20);
  }
});
