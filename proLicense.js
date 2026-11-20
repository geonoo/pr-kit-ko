/**
 * Offline Pro key check.
 * Accepted:
 * - Demo: PRKIT-PRO-DEMO-2026
 * - Issued: PRKIT-XXXX-XXXX-XXXX where last group is checksum of the middle 8 chars
 */
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

function isProLicense(key) {
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

module.exports = { isProLicense, issueKey, checksum, normalize };
