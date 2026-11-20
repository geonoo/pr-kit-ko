/**
 * Pro key check.
 * - Demo: PRKIT-PRO-DEMO-2026 (offline)
 * - Issued: PRKIT-XXXX-XXXX-XXXX checksum (offline, fallback)
 * - Gumroad: unique key emailed on purchase, verified via API
 */
const GUMROAD_PERMALINK = "pr-kit-pro";
const GUMROAD_PRODUCT_ID = "YZ5322DbQXQWDRpwthyt6g==";
const GUMROAD_VERIFY_URL = "https://api.gumroad.com/v2/licenses/verify";

function normalize(key) {
  return String(key || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

function checksum(part) {
  let n = 0;
  for (let i = 0; i < part.length; i += 1) {
    n = (n * 31 + part.charCodeAt(i)) >>> 0;
  }
  return (n % 10000).toString().padStart(4, "0");
}

function isLocalProLicense(key) {
  const k = normalize(key);
  if (!k) {
    return false;
  }
  if (k === "PRKIT-PRO-DEMO-2026") {
    return true;
  }
  const m = /^PRKIT-([A-Z0-9]{4})-([A-Z0-9]{4})-([0-9]{4})$/.exec(k);
  if (!m) {
    return false;
  }
  return checksum(m[1] + m[2]) === m[3];
}

function isProLicense(key) {
  return isLocalProLicense(key);
}

function issueKey(seed) {
  const raw = String(seed || "TEAM")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "X")
    .padEnd(8, "X")
    .slice(0, 8);
  const a = raw.slice(0, 4);
  const b = raw.slice(4, 8);
  return `PRKIT-${a}-${b}-${checksum(a + b)}`;
}

async function verifyGumroadLicense(key, fetchImpl) {
  const raw = String(key || "").trim();
  if (!raw) {
    return false;
  }
  if (isLocalProLicense(raw)) {
    return true;
  }
  const fetchFn = fetchImpl || globalThis.fetch;
  if (typeof fetchFn !== "function") {
    return false;
  }
  const body = new URLSearchParams({
    product_id: GUMROAD_PRODUCT_ID,
    license_key: raw,
    increment_uses_count: "false",
  });
  const res = await fetchFn(GUMROAD_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (res.status >= 500) {
    throw new Error(`gumroad ${res.status}`);
  }
  if (!res.ok) {
    return false;
  }
  const data = await res.json();
  const purchase = data && data.purchase;
  return Boolean(
    data &&
      data.success &&
      purchase &&
      purchase.refunded !== true &&
      purchase.disputed !== true &&
      purchase.chargebacked !== true
  );
}

module.exports = {
  isProLicense,
  isLocalProLicense,
  issueKey,
  checksum,
  normalize,
  verifyGumroadLicense,
  GUMROAD_PERMALINK,
  GUMROAD_PRODUCT_ID,
};
