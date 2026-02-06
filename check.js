import fetch from "node-fetch";

const URL = "https://store.steampowered.com/sale/steamdeckrefurbished";

const res = await fetch(URL, {
  headers: { "User-Agent": "Mozilla/5.0" }
});
const text = await res.text();

// Adjust keywords if needed
const keywords = [
  "Add to Cart",
  "In Stock"
];

const found = keywords.some(k => text.includes(k));

if (found) {
  console.log("STOCK FOUND");
  process.exit(1); // triggers notification
}

console.log("No stock yet");
