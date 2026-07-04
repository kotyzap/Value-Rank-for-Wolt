# ValueRank for W

A Chrome/Comet extension that ranks items on **wolt.com**, **wolt.de**, **wolt.cz** and other branches by the best **price per unit** (Kč/kg, €/l, …) and stamps the
computed value onto every product card.

<div align="center">
<img width="100%" alt="Value Rank for Wolt - reorder items by top-best-value" src="https://github.com/user-attachments/assets/f3c9fbfe-b9b7-4aa3-82fb-f6d10f57f0fd" />

</div>

## Features

This is the simple core: parse → badge → sort.

- Detects product cards with **resilient selectors** (data-test-ids first, then a
  class-agnostic heuristic) so it survives Wolt's build-hashed class names.
- Parses localized prices (`68,90 Kč`, `5.99 €`, `€3.50`) and quantities
  (`500 g`, `1,5 l`, `400ml`, `33 cl`, `1 ks`, `90 kusů`), incl. **multipacks**.
  Prefers Wolt's own per-unit label when shown.
- Normalizes to **kg / l / ks (pieces)** and computes price per base unit.
- **Re-orders** cards cheapest-per-unit first; items with no unit sink to bottom.
- Injects a small **badge** (e.g. `46,63 Kč/l`) on each card showing the value.
- **Scroll-idle sorting:** re-sorts ~250 ms after you stop scrolling, never
  mid-scroll, with scroll-anchoring so the viewport doesn't jump.
- **Popup** with an on/off toggle and a light/dark theme switch. Toolbar icon
  lights up only on Wolt.

## Files

| File          | Purpose                                            |
|---------------|----------------------------------------------------|
| `manifest.json` | MV3 manifest (activeTab, storage, Wolt hosts)    |
| `background.js` | Service worker: enable icon only on Wolt         |
| `content.js`    | Detection, parsing, sorting                      |
| `content.css`   | Badge styling                                    |
| `popup.html` / `popup.js` | On/off toggle + theme switch            |
| `icons/`        | Toolbar icons (16/48/128 px)                     |

> `history.html` / `history.js` are leftovers from the price-history feature and
> are no longer used — safe to delete.

## Install (Developer Mode)

1. Open `chrome://extensions` (or `comet://extensions` in Comet).
2. Toggle **Developer mode** ON (top-right).
3. Click **Load unpacked**.
4. Select this `wolt-unit-price-sorter` folder.
5. Open a Wolt store page (e.g. Wolt Market). Items re-sort automatically and
   each card shows its price-per-unit badge.
6. Click the extension icon to toggle sorting on/off or switch the popup theme.

> Tip: after re-loading the extension, click the **reload icon** on its card in
> `chrome://extensions`, then refresh the Wolt tab so the new content script runs.

The toolbar icon lights up only on Wolt domains and is greyed out elsewhere.

## How sorting works

For each card the script reads the total price and the quantity, converts the
quantity to kg or l, and divides. Example: `89,90 Kč` / `0.355 l` =
**253,24 Kč/l** — matching the value Wolt itself shows. Cards are then reordered
inside their parent grid in ascending order of that number.

## Notes & limitations

- Wolt's DOM is not a public API; if Wolt changes its markup the heuristic
  selector in `findCards()` may need a tweak. The `KNOWN` data-test-id list at
  the top of `findCards()` is the first place to adjust.
- Sorting reorders the visible grid; Wolt's own category filters still work.
- Turning the toggle OFF restores the original on-page order and removes badges.
```
