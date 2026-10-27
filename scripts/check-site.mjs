import { access, readFile } from "node:fs/promises";

const pages = [
  "public/index.html",
  "public/pay/index.html",
  "public/privacy/index.html",
  "public/terms/index.html",
];
const requiredAssets = [
  "public/styles.css",
  "public/favicon.svg",
  "public/images/asd-logo-white.png",
  "public/images/asd-square-payment-qr.png",
  "public/images/sweetspire-kitchen.jpg",
];

for (const file of [...pages, ...requiredAssets]) await access(file);

const htmlByPage = new Map();
for (const page of pages) {
  const html = await readFile(page, "utf8");
  htmlByPage.set(page, html);
  if (!html.includes("Artistic Stone Design")) throw new Error(`${page}: missing ASD title`);
  if (!html.includes("/styles.css")) throw new Error(`${page}: missing stylesheet`);
}

for (const page of ["public/index.html", "public/pay/index.html"]) {
  const html = htmlByPage.get(page);
  if (!html.includes('href="/privacy/"')) throw new Error(`${page}: missing Privacy Policy link`);
  if (!html.includes('href="/terms/"')) throw new Error(`${page}: missing Terms & Conditions link`);
}

const privacy = htmlByPage.get("public/privacy/index.html");
const nonSharing =
  "All the above categories exclude text messaging originator opt-in data and consent; this information won’t be shared with any third parties.";
if (!privacy.includes(nonSharing)) throw new Error("public/privacy/index.html: missing non-sharing clause");
if (!privacy.includes(">STOP<") || !privacy.includes(">HELP<")) {
  throw new Error("public/privacy/index.html: missing STOP/HELP instructions");
}

const terms = htmlByPage.get("public/terms/index.html");
if (!terms.includes("SMS Appointment &amp; Billing Notifications Program")) {
  throw new Error("public/terms/index.html: missing SMS program terms");
}
if (!terms.includes('href="/privacy/"')) throw new Error("public/terms/index.html: missing privacy link");
if (!terms.includes(">STOP<") || !terms.includes(">HELP<")) {
  throw new Error("public/terms/index.html: missing STOP/HELP instructions");
}

console.log("ASD site source check passed.");
