# Chrome Web Store — Submission Guide

Everything you need to publish **ValueRank for W** v1.25.0.

The upload package is the zip in the parent folder:

```
valuerank-for-w-v1.25.0.zip
```

`manifest.json` sits at the root of the zip (required). `history.html/js` and the
README are intentionally excluded — only the 10 files the extension actually
uses are inside.

---

## 1. Asset checklist (what the dashboard asks for)

| Asset | Requirement | Status |
|-------|-------------|--------|
| **Package** | `.zip`, manifest.json at root, < 2 GB | ✅ `valuerank-for-w-v1.25.0.zip` |
| **Store icon** | 128×128 PNG | ✅ reuse `icons/icon128.png` |
| **Screenshot(s)** | 1–5 images, **1280×800** or 640×400, PNG/JPEG, **no transparency** | ⬜ you take these (see §4) |
| Small promo tile | 440×280 PNG/JPEG — *optional* (needed only to be featured) | ⬜ optional |
| Marquee promo | 1400×560 — *optional* | ⬜ optional |

You only strictly need: the zip, the 128px icon, and **at least one screenshot**.

---

## 2. Listing text (copy-paste)

**Product name**

```
ValueRank for W
```

**Summary** (short description, max 132 chars)

```
See the real price per kg / litre / piece on Wolt and instantly spot the best-value product in any grocery category.
```

**Category**

```
Shopping
```

**Language**

```
English (you can add Czech later)
```

**Detailed description**

```
Wolt shows a price for every grocery product, but comparing value is hard when
sizes differ — is 450 g for 39,90 Kč better than 500 g for 44,90 Kč? This
extension does the math for you.

On any Wolt Market category page it:

• Reads the price and size already shown on each product card.
• Computes the price per unit — Kč/kg, €/l, Kč/piece, etc. (supports CZK, EUR
  and GBP, with the unit Wolt itself displays).
• Ranks every product within its unit type and stamps a badge on each card:
  🥇🥈🥉 for the three cheapest, and rank/total (e.g. 12/45) for the rest.
• Shows a "Top best value" strip above the list with the cheapest products as
  clickable cards. When a category mixes units (e.g. loaves sold per kg and
  baguettes sold per piece), it shows a separate Top list per unit type.

Nothing is reordered or hidden, so add-to-cart and Wolt's own filters keep
working exactly as before.

Settings (toolbar popup):
• Turn the extension on or off.
• Choose how many best-value cards to show (Top 4 / 8 / 12 / 16 / 20).
• Light or dark popup theme.

Privacy: everything runs locally in your browser. The extension collects no
data, has no servers, no analytics, and no tracking. It only runs on
wolt.com and wolt.cz.

Note: this is an independent project and is not affiliated with Wolt.
```

---

## 3. Privacy practices tab (copy-paste)

**Single purpose**

```
Helps shoppers compare value on Wolt grocery category pages by computing and
displaying each product's price per unit (per kg / litre / piece) and ranking
products by best value.
```

**Permission justifications**

`storage`
```
Stores the user's own preferences locally on their device — whether the
extension is enabled, how many best-value cards to show, and the light/dark
popup theme. Nothing is transmitted anywhere.
```

`declarativeContent`
```
Used only to light up the toolbar icon when the user is on a Wolt page and grey
it out elsewhere. It does not read or collect page content.
```

**Host permission** (`*://*.wolt.com/*`, `*://*.wolt.cz/*`)
```
The content script must run on Wolt store pages to read the product prices and
sizes already displayed on the page and add the per-unit ranking badges. It
runs only on Wolt domains and on no other sites.
```

**Are you using remote code?** → **No** (all JavaScript ships inside the package).

**Data usage** — declare **no data collected**. Do not tick any data-type
boxes, then check the three certification statements:
- I do not sell or transfer user data to third parties (outside approved uses).
- I do not use or transfer user data for purposes unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending.

**Privacy policy URL** — not required, because you collect no personal or
sensitive data. (If the form insists, a one-line page stating "This extension
collects no data" hosted anywhere — e.g. a GitHub Gist — satisfies it.)

---

## 4. Screenshots (you take these — I can't capture your browser)

You need at least one **1280×800** PNG/JPEG with **no transparency**.

Easiest method:
1. Open a Wolt Market category that mixes units, e.g. *Luštěniny / Pečivo*, with
   the extension running so the Top strip and badges are visible.
2. Take a screenshot of the page area.
3. Resize/crop to exactly **1280×800** (Preview on macOS: Tools → Adjust Size,
   or any image editor). If the capture isn't 16:10, paste it onto a 1280×800
   white canvas so there's no transparency.

Good shots to include (2–4 total):
- A category page showing the medal badges + rank/total on real cards.
- The "Top best value" strip, ideally one that shows two unit sections
  (per kg + per piece) — this is your headline feature.
- The toolbar popup with the on/off toggle and Top-N selector.

The two screenshots you already shared work well — just resize them to 1280×800
and flatten onto white.

---

## 5. Step-by-step in the Developer Dashboard

1. Go to **https://chrome.google.com/webstore/devconsole** and sign in with your
   existing developer account.
2. Click **+ New item** (top right).
3. **Upload** `valuerank-for-w-v1.25.0.zip` and wait for it to process.
4. Open the **Store listing** tab:
   - Paste the product name, summary, and detailed description from §2.
   - Upload the **store icon** (`icons/icon128.png`).
   - Upload your **screenshot(s)** from §4.
   - Set **Category** = Shopping, **Language** = English.
5. Open the **Privacy practices** tab:
   - Paste the single-purpose text and each permission justification from §3.
   - Set remote code = No.
   - Complete the data-usage disclosures and tick the three certifications.
6. Open the **Distribution** tab:
   - Visibility: **Public** (or Unlisted if you want to test/share by link first).
   - Choose regions (default: all) and confirm it's **Free**.
7. Click **Submit for review** (top right). Status becomes *Pending review*.

Review usually takes anywhere from a few hours to a few business days. You'll
get an email when it's published or if changes are requested.

---

## 6. Future updates

To push a new version: bump `"version"` in `manifest.json`, re-zip the folder
(manifest at root), and on the dashboard use **Package → Upload new package**.
The version number must always increase.
