// Daily content loader + helpers.
//
// Why client-side computation? The "item of the day" depends on today's date.
// If we picked it on the server at build time, every visitor would see the
// same stale item forever. If we picked it at request time on the server, a
// user crossing midnight would still see yesterday's item until they reload
// on a fresh request. Computing in the browser also avoids hydration
// mismatches around dates.

import data from "@/content/daily.json";

export type DailyItem = {
  id: string;
  type: "tongue-twister" | "poem";
  difficulty: "easy" | "medium" | "hard";
  title: string;
  author?: string;
  text: string;
  explanation: string;
};

// Interleave [tt, poem, tt, poem, ...] so daysSinceEpoch -> index naturally
// alternates categories. If the lists are different lengths we wrap around
// the shorter list. Both lists currently have 25 items, so this is just safety.
function interleave(): DailyItem[] {
  const tts = data.tongueTwisters as DailyItem[];
  const poems = data.poems as DailyItem[];
  const n = Math.max(tts.length, poems.length);
  const out: DailyItem[] = [];
  for (let i = 0; i < n; i++) {
    if (i < tts.length) out.push(tts[i]);
    if (i < poems.length) out.push(poems[i]);
  }
  return out;
}

export const ALL_ITEMS: DailyItem[] = interleave();
export const TOTAL_COUNT = ALL_ITEMS.length;

// Fixed epoch — anchor for deterministic indexing. Everyone sees the same item
// on the same calendar day (modulo timezone, which is fine — each user gets a
// consistent experience in their own day).
const EPOCH = new Date(2026, 0, 1).getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

export function getTodayKey(d = new Date()): string {
  // YYYY-MM-DD in local time, used as the streak key in localStorage.
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getDayIndex(d = new Date()): number {
  // Local midnight, so the index flips at the user's local midnight.
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.floor((local - EPOCH) / DAY_MS);
  const n = TOTAL_COUNT;
  // JS modulo can be negative; normalise.
  return ((days % n) + n) % n;
}

export function getTodaysItem(d = new Date()): DailyItem {
  return ALL_ITEMS[getDayIndex(d)];
}

export function getItemById(id: string): DailyItem | undefined {
  return ALL_ITEMS.find((it) => it.id === id);
}

// Pick a "different one" — pseudo-random index that's not today's.
export function pickRandomOther(currentIndex: number): DailyItem {
  if (TOTAL_COUNT <= 1) return ALL_ITEMS[0];
  let idx = currentIndex;
  while (idx === currentIndex) {
    idx = Math.floor(Math.random() * TOTAL_COUNT);
  }
  return ALL_ITEMS[idx];
}

// --- localStorage schema ---------------------------------------------------

export const STORAGE_KEY = "habitflow:daily:v1";

export type DailyState = {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
  memorizedIds: string[];           // unique, ordered by completion
};

export const DEFAULT_STATE: DailyState = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  memorizedIds: [],
};

export function loadState(): DailyState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<DailyState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: DailyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// If user hasn't completed today AND last completion wasn't yesterday, the
// "current" streak is effectively 0 even though stored value may still hold
// the last good streak. We compute the displayed streak from state + today.
export function effectiveStreak(state: DailyState, today = getTodayKey()): number {
  if (!state.lastCompletedDate) return 0;
  if (state.lastCompletedDate === today) return state.currentStreak;
  // Yesterday?
  const t = new Date(today);
  const y = new Date(t.getFullYear(), t.getMonth(), t.getDate() - 1);
  if (getTodayKey(y) === state.lastCompletedDate) return state.currentStreak;
  return 0;
}

// Record today's memorisation. Idempotent — calling twice in one day is a no-op
// for streaks (but adds the item to memorizedIds if it wasn't there).
export function markMemorizedToday(
  state: DailyState,
  itemId: string,
  today = getTodayKey()
): DailyState {
  const alreadyToday = state.lastCompletedDate === today;
  const yesterday = (() => {
    const t = new Date(today);
    const y = new Date(t.getFullYear(), t.getMonth(), t.getDate() - 1);
    return getTodayKey(y);
  })();

  const nextStreak = alreadyToday
    ? state.currentStreak
    : state.lastCompletedDate === yesterday
    ? state.currentStreak + 1
    : 1;

  const memorizedIds = state.memorizedIds.includes(itemId)
    ? state.memorizedIds
    : [...state.memorizedIds, itemId];

  return {
    currentStreak: nextStreak,
    longestStreak: Math.max(state.longestStreak, nextStreak),
    lastCompletedDate: today,
    memorizedIds,
  };
}
