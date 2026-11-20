import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { isProLicense, issueKey, verifyGumroadLicense } = require("./proLicense.js");

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

test("gumroad verify uses product_id and accepts success", async () => {
  const calls = [];
  const fetchImpl = async (url, opts) => {
    calls.push({ url, body: String(opts.body) });
    return {
      ok: true,
      json: async () => ({ success: true, purchase: { refunded: false } }),
    };
  };
  assert.equal(await verifyGumroadLicense("ABC-123", fetchImpl), true);
  assert.match(calls[0].body, /product_id=YZ5322DbQXQWDRpwthyt6g%3D%3D/);
  assert.match(calls[0].body, /license_key=ABC-123/);
});

test("gumroad verify treats 404 as invalid and 5xx as error", async () => {
  const notFound = async () => ({ ok: false, status: 404, json: async () => ({}) });
  assert.equal(await verifyGumroadLicense("NOPE", notFound), false);
  const boom = async () => ({ ok: false, status: 502, json: async () => ({}) });
  await assert.rejects(() => verifyGumroadLicense("NOPE", boom), /gumroad 502/);
});

test("gumroad verify skips network for local keys", async () => {
  let called = false;
  const fetchImpl = async () => {
    called = true;
    return { ok: true, json: async () => ({ success: false }) };
  };
  assert.equal(await verifyGumroadLicense("PRKIT-PRO-DEMO-2026", fetchImpl), true);
  assert.equal(called, false);
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
