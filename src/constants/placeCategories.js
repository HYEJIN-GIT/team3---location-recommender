export const PLACE_CATEGORY_CODE_BY_NAME = {
  culturalFacility: "CT1",
  touristAttraction: "AT4",
  restaurant: "FD6",
  cafe: "CE7",
};

export const PLACE_CATEGORY_NAME_BY_CODE = Object.fromEntries(
  Object.entries(PLACE_CATEGORY_CODE_BY_NAME).map(([name, code]) => [code, name]),
);

export const NEARBY_PLACE_CATEGORY_CODES = Object.keys(PLACE_CATEGORY_NAME_BY_CODE);

export const PLACE_CATEGORY_STYLE_BY_CODE = {
  CT1: {
    marker: "border-indigo-500 bg-indigo-50 text-indigo-700",
    badge: "bg-indigo-100 text-indigo-700",
  },
  AT4: {
    marker: "border-emerald-500 bg-emerald-50 text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
  },
  FD6: {
    marker: "border-rose-500 bg-rose-50 text-rose-700",
    badge: "bg-rose-100 text-rose-700",
  },
  CE7: {
    marker: "border-amber-500 bg-amber-50 text-amber-700",
    badge: "bg-amber-100 text-amber-700",
  },
};

export const DEFAULT_PLACE_CATEGORY_STYLE = {
  marker: "border-slate-400 bg-white text-slate-800",
  badge: "bg-slate-100 text-slate-700",
};