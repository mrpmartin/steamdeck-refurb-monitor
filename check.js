import fetch from "node-fetch";

const URL = "https://store.steampowered.com/sale/steamdeckrefurbished";
const NTFY_TOPIC = "steamdeck-alert-paul";

const res = await fetch(URL, {
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "en-US,en;q=0.9"
  }
});

const text = (await res.text()).toLowerCase();

// Required conditions
const hasAddToCart = text.includes("add to cart");
const hasOLED = text.includes("oled");
const hasTargetStorage =
  text.includes("512") || text.includes("1 tb") || text.includes("1tb");

if (hasAddToCart && hasOLED && hasTargetStorage) {
  const message =
    "🔥 Steam Deck Refurb OLED (512 GB or 1 TB) IN STOCK — GO NOW!\n" +
    "https://store.steampowered.com/sale/steamdeckrefurbished";

  // Send push notification via ntfy
  await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
    method: "POST",
    headers: { "Title": "Steam Deck OLED Refurb Available!" },
    body: message
  });

  // Fail GitHub Action so you also get email alert
  process.exit(1);
}

console.log("No OLED stock yet");
