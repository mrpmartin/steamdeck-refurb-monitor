import fetch from "node-fetch";

const URL = "https://store.steampowered.com/sale/steamdeck";
const NTFY_TOPIC = "steamdeck-alert-paul";

const res = await fetch(URL, {
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "en-US,en;q=0.9"
  }
});

const text = await res.text().toLowerCase();

// Required conditions
const hasAddToCart = text.includes("add to cart");
const hasOLED = text.includes("steam deck oled");
const hasTargetStorage =
  text.includes("512") || text.includes("1 tb") || text.includes("1tb");

if (hasAddToCart && hasOLED && hasTargetStorage) {
  const message =
    "🔥 Steam Deck OLED (512 GB or 1 TB) is IN STOCK — GO NOW!\n" +
    "https://store.steampowered.com/sale/steamdeck";

  await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
    method: "POST",
    headers: { "Title": "Steam Deck OLED Available!" },
    body: message
  });

  // Fail the action so GitHub also emails you
  process.exit(1);
}

console.log("No OLED stock yet");
