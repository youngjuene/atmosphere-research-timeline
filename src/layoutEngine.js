/**
 * Timeline Label Layout Engine
 *
 * For each sub-track band, greedily assigns every paper a vertical slot
 * and an optional horizontal label offset so that no two labels overlap.
 *
 * Adding or removing a paper requires no manual positioning — the engine
 * recomputes everything automatically.
 *
 * Algorithm
 * ---------
 * Papers are processed left-to-right (sorted by year).
 * For each paper the engine works through a pre-scored list of
 *   (slot, horizontal-shift) candidates ordered by total "disturbance":
 *
 *   cost = SLOT_LEVEL[slot] × 2  +  shift_step_index
 *
 * Multiplying slot escalation by 2 means one vertical step costs as much
 * as two horizontal shift steps, so the engine exhausts small shifts before
 * jumping to a taller slot — but won't drift arbitrarily far sideways before
 * using a higher slot.  The first candidate whose label rectangle fits is
 * chosen; row height grows only as needed.
 */

// ── Constants ────────────────────────────────────────────────────────────────

/** Width of the row-content area (total min-width 2280px − 240px label column) */
const CONTENT_WIDTH_PX = 2040;

/**
 * Measured JetBrains Mono advance width ≈ 0.815 em/char (derived from pixel geometry).
 * title:  10.5px × 0.815 = 8.56 → rounded to 9.0 for a ~5 % safety margin
 * author:  9.0px × 0.815 = 7.33 → rounded to 7.5
 */
const TITLE_CHAR_W  = 9.0;   // font-size 10.5px
const AUTHOR_CHAR_W = 7.5;   // font-size 9px

/** Extra breathing room added to each side of a label's bounding box */
const PADDING_PX = 10;

/** Minimum pixel gap enforced between any two adjacent label boxes */
const GAP_PX = 6;

/**
 * Vertical slots in preference order (inner → outer).
 * Alternating above/below keeps the timeline visually balanced.
 */
const SLOTS = [
  'above', 'below',
  'above-high', 'below-low',
  'above-highest', 'below-lowest',
];

/**
 * How many pixels each slot's label top edge extends from the centre line.
 * Label height ≈ 30 px  (title 15 px + author 13 px + 1 px gap + 1 px rounding)
 *
 * CSS bottom/top offsets are spaced 34 px apart (30 px label + 4 px gap) so that
 * adjacent slots have NO vertical overlap:
 *   above:         bottom: 12px  → label top = 12 + 30 = 42px above centre
 *   above-high:    bottom: 46px  → label top = 46 + 30 = 76px above centre
 *   above-highest: bottom: 80px  → label top = 80 + 30 = 110px above centre
 */
const SLOT_ABOVE_NEED = { 'above': 44, 'above-high': 78, 'above-highest': 112 };
const SLOT_BELOW_NEED = { 'below': 44, 'below-low':  78, 'below-lowest':  112 };

/** Vertical cost weight per slot level (0 = above/below, 1 = high/low, 2 = highest/lowest) */
const SLOT_LEVEL = {
  'above': 0, 'below': 0,
  'above-high': 1, 'below-low': 1,
  'above-highest': 2, 'below-lowest': 2,
};

/** Horizontal shift magnitudes, from tight to wide */
const SHIFT_MAGNITUDES = [0, 22, 44, 66, 88, 110, 135, 165, 200];

/**
 * Pre-scored flat list of every (slot, shift) candidate, sorted by
 *   cost = SLOT_LEVEL[slot] × 2 + shift_step_index
 * so the engine tries inner slots with modest shifts before escalating
 * vertically or drifting far sideways.  Ties are broken by slot order
 * (inner first) then by shift magnitude (smaller first).
 */
const SEARCH_ORDER = (() => {
  const candidates = [];
  SHIFT_MAGNITUDES.forEach((mag, si) => {
    const directions = mag === 0 ? [0] : [-mag, mag];
    for (const slot of SLOTS) {
      for (const shift of directions) {
        candidates.push({ slot, shift, _cost: SLOT_LEVEL[slot] * 2 + si });
      }
    }
  });
  candidates.sort((a, b) => {
    if (a._cost !== b._cost) return a._cost - b._cost;
    // Within same cost: prefer inner slot, then smaller |shift|
    const slotDiff = SLOTS.indexOf(a.slot) - SLOTS.indexOf(b.slot);
    if (slotDiff !== 0) return slotDiff;
    return Math.abs(a.shift) - Math.abs(b.shift);
  });
  return candidates;
})();

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Format the APA-style author string (mirrors the formatAPA helper in App.jsx) */
function apaAuthorStr(authors, year) {
  const list  = authors.split('; ');
  const last0 = list[0].split(', ')[0];
  const suffix =
    list.length >= 3 ? ' et al.' :
    list.length === 2 ? ` & ${list[1].split(', ')[0]}` : '';
  return `${last0}${suffix}, ${Math.floor(year)}`;
}

/** Estimate the rendered pixel width of a paper's two-line label */
function estimateWidthPx(paper) {
  const titleW  = paper.title.length * TITLE_CHAR_W;
  const authorW = apaAuthorStr(paper.authors, paper.year).length * AUTHOR_CHAR_W;
  return Math.max(titleW, authorW) + PADDING_PX * 2;
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Compute collision-free label placements for a set of papers in one track.
 *
 * @param {Array}    papers               Papers belonging to one sub-track band
 * @param {Function} getPercentageForYear Maps a year to a 0–100 percentage
 * @returns {{ placements: Object, rowHeight: number, centerOffset: number }}
 *   placements    – { [paper.id]: { position: string, labelOffset: number } }
 *   rowHeight     – minimum row height (px) to fit all placed labels
 *   centerOffset  – px from row top to the timeline centre line
 */
export function computeLayout(papers, getPercentageForYear) {
  // Sort left-to-right so early papers claim their preferred slots first
  const sorted = [...papers].sort((a, b) => a.year - b.year);

  // Occupied x-intervals per slot: Array<[left, right]>
  const occupied = Object.fromEntries(SLOTS.map(s => [s, []]));

  const placements = {};

  for (const paper of sorted) {
    const cx = (getPercentageForYear(paper.year) / 100) * CONTENT_WIDTH_PX;
    const hw = estimateWidthPx(paper) / 2;

    let placed = false;

    // Walk the pre-scored candidate list: balanced horizontal-vs-vertical priority
    for (const { slot, shift } of SEARCH_ORDER) {
      const lx = cx + shift - hw;
      const rx = cx + shift + hw;

      if (lx < 0 || rx > CONTENT_WIDTH_PX) continue;

      const free = !occupied[slot].some(([a, b]) => lx < b + GAP_PX && rx > a - GAP_PX);
      if (free) {
        occupied[slot].push([lx, rx]);
        placements[paper.id] = { position: slot, labelOffset: shift };
        placed = true;
        break;
      }
    }

    // Boundary-clamped fallback: label would overflow left/right at every shift
    if (!placed) {
      const clampShift = cx - hw < 0
        ? hw - cx
        : CONTENT_WIDTH_PX - cx - hw;

      for (const slot of SLOTS) {
        const lx = cx + clampShift - hw;
        const rx = cx + clampShift + hw;
        const free = !occupied[slot].some(([a, b]) => lx < b + GAP_PX && rx > a - GAP_PX);
        if (free) {
          occupied[slot].push([lx, rx]);
          placements[paper.id] = { position: slot, labelOffset: clampShift };
          placed = true;
          break;
        }
      }
    }

    // Absolute fallback (all 102 candidates blocked — extremely unlikely)
    if (!placed) {
      placements[paper.id] = { position: 'above-highest', labelOffset: 0 };
    }
  }

  // Derive row height from whichever slots were actually used.
  // maxBelow starts at 0 so bands where every label sits above don't
  // waste space — only the 12 px bottom margin is added in that case.
  let maxAbove = 0, maxBelow = 0;
  Object.values(placements).forEach(({ position }) => {
    maxAbove = Math.max(maxAbove, SLOT_ABOVE_NEED[position] ?? 0);
    maxBelow = Math.max(maxBelow, SLOT_BELOW_NEED[position] ?? 0);
  });

  // Guarantee at least the inner-slot height above (labels always exist),
  // and a small breathing margin below when no below-labels are placed.
  maxAbove = Math.max(maxAbove, 44);
  maxBelow = Math.max(maxBelow, 16);

  // Centre line sits 12 px below the topmost label (12 px top margin).
  const centerOffset = 12 + maxAbove;

  return {
    placements,
    rowHeight: centerOffset + maxBelow + 12, // 12 px bottom margin
    centerOffset,
  };
}
