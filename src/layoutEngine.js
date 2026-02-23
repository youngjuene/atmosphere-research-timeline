/**
 * Timeline Label Layout Engine
 *
 * For each category (track), greedily assigns every paper a vertical slot
 * and an optional horizontal label offset so that no two labels overlap.
 *
 * Adding a new paper to data.js requires no manual positioning — the engine
 * recomputes everything automatically.
 *
 * Algorithm
 * ---------
 * Papers are processed left-to-right (sorted by year).
 * For each paper the engine tries every combination of:
 *   slot  × shift
 * in preference order and picks the first one whose label rectangle does
 * not intersect any already-placed label in that slot.
 *
 * The row height is then derived from whichever slots were actually used,
 * so rows expand only as much as needed.
 */

// ── Constants ────────────────────────────────────────────────────────────────

/** Width of the row-content area (total min-width 2200px − 160px category label) */
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
 * Vertical slots in preference order.
 * Alternating above/below keeps the timeline visually balanced.
 * The engine expands outward only when inner slots are full.
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

/**
 * Horizontal pixel offsets tried for each slot, in order of preference.
 * 0 (no shift) is always tried first; shifts expand symmetrically outward.
 */
const H_SHIFTS = [0, -22, 22, -44, 44, -66, 66, -88, 88, -110, 110, -135, 135, -165, 165, -200, 200];

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
 * @param {Array}    papers               Papers belonging to one category
 * @param {Function} getPercentageForYear Maps a year to a 0-100 percentage
 * @returns {{ placements: Object, rowHeight: number, centerOffset: number }}
 *   placements    – { [paper.id]: { position: string, labelOffset: number } }
 *   rowHeight     – minimum row height (px) to fit all placed labels
 *   centerOffset  – px from row top to the timeline centre line (use instead of 50%)
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

    // Prefer staying close to the dot: try small shifts across ALL slots
    // before trying larger shifts.  This ensures a label placed directly
    // below (shift=0) beats one shifted 22+px above.
    outer: for (const shift of H_SHIFTS) {
      for (const slot of SLOTS) {
        const lx = cx + shift - hw;
        const rx = cx + shift + hw;

        // Skip if label extends outside the content area
        if (lx < 0 || rx > CONTENT_WIDTH_PX) continue;

        const free = !occupied[slot].some(
          ([a, b]) => lx < b + GAP_PX && rx > a - GAP_PX
        );

        if (free) {
          occupied[slot].push([lx, rx]);
          placements[paper.id] = { position: slot, labelOffset: shift };
          placed = true;
          break outer;
        }
      }
    }

    // If no shift kept the label in bounds, try boundary-clamped shifts
    if (!placed) {
      outer2: for (const slot of SLOTS) {
        // Compute the shift needed to keep the label within bounds
        let clampShift = 0;
        if (cx - hw < 0) clampShift = hw - cx;                          // push right
        else if (cx + hw > CONTENT_WIDTH_PX) clampShift = CONTENT_WIDTH_PX - cx - hw; // push left

        const lx = cx + clampShift - hw;
        const rx = cx + clampShift + hw;

        const free = !occupied[slot].some(
          ([a, b]) => lx < b + GAP_PX && rx > a - GAP_PX
        );

        if (free) {
          occupied[slot].push([lx, rx]);
          placements[paper.id] = { position: slot, labelOffset: clampShift };
          placed = true;
          break outer2;
        }
      }
    }

    // Absolute fallback (only if all 78 slot×shift combinations are blocked)
    if (!placed) {
      placements[paper.id] = { position: 'above-highest', labelOffset: 0 };
    }
  }

  // Derive the row height from whichever slots were actually assigned
  let maxAbove = 44, maxBelow = 44;
  Object.values(placements).forEach(({ position }) => {
    maxAbove = Math.max(maxAbove, SLOT_ABOVE_NEED[position] ?? 0);
    maxBelow = Math.max(maxBelow, SLOT_BELOW_NEED[position] ?? 0);
  });

  // Centre line sits 12 px below the topmost label (12 px top margin).
  // When maxAbove ≠ maxBelow the 50% rule would misplace the line, so we
  // expose the exact pixel offset and let the row use it explicitly.
  const centerOffset = 12 + maxAbove;

  return {
    placements,
    rowHeight: centerOffset + maxBelow + 12, // 12 px bottom margin
    centerOffset,
  };
}
