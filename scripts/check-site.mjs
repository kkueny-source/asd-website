import { access, readFile } from "node:fs/promises";

const pages = ["public/index.html", "public/pay/index.html"];
const requiredAssets = [
  "public/styles.css",
  "public/favicon.svg",
  "public/images/asd-logo-white.png",
  "public/images/asd-square-payment-qr.png",
  "public/images/sweetspire-kitchen.jpg",
];

for (const file of [...pages, ...requiredAssets]) await access(file);
for (const page of pages) {
  const html = await readFile(page, "utf8");
  if (!html.includes("Artistic Stone Design")) throw new Error(`${page}: missing ASD title`);
  if (!html.includes("/styles.css")) throw new Error(`${page}: missing stylesheet`);
}

console.log("ASD site source check passed.");
