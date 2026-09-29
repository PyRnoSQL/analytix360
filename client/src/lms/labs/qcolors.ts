// Chart colours for the quality labs, on the dark lesson surface (#131A2B).
// Categorical order validated for colour-vision deficiency (dataviz palette, dark steps);
// status colours are reserved for good / warning / critical states and always come with a label.
export const CAT = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#008300", "#9085e9", "#e66767"];
export const STATUS = { good: "#0ca30c", warning: "#fab219", serious: "#ec835a", critical: "#d03b3b" };
export const INK = { primary: "#E7EBF3", secondary: "#C5CDDD", muted: "#8A96B0", grid: "rgba(231,235,243,0.08)", surface: "#131A2B" };
export const fmt = (v: number, d = 3) => (Number.isFinite(v) ? v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: 0 }) : "—");
