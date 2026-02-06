import fetch from "node-fetch";

const URL = "https://store.steampowered.com/sale/steamdeckrefurbished";
const NTFY_TOPIC = "steamdeck-alert-paul";

const res = await fetch(URL, {
  headers: { "User-Agent": "Mozilla/5.0" }
});
const text = await res.text();

if (text.includes("Add to Cart")) {
  await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
    method: "POST",
    body: "🔥 Steam Deck Refurbished IN STOCK!"
  });
  process.exit(1);
}
