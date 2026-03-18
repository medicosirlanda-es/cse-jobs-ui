'use client';

// src/constants/categories.ts
var JOB_CATEGORIES = [
  { value: "gp-permanent", en: "GP Permanent", es: "GP Permanente" },
  { value: "gp-locum", en: "GP Locum", es: "GP Locum" },
  { value: "consultant", en: "Consultant", es: "Consultant" },
  { value: "registrar-sho", en: "Registrar & SHO", es: "Hospital / NCHD" },
  { value: "other", en: "Other Roles", es: "Otros" }
];
function getCategoryLabel(category, locale) {
  const cat = JOB_CATEGORIES.find((c) => c.value === category);
  return cat ? cat[locale] : category;
}
var CATEGORY_COLORS = {
  "gp-permanent": { bg: "bg-emerald-50", text: "text-emerald-700", glow: "rgba(16, 185, 129, 0.12)" },
  "gp-locum": { bg: "bg-amber-50", text: "text-amber-700", glow: "rgba(245, 158, 11, 0.12)" },
  consultant: { bg: "bg-blue-50", text: "text-blue-700", glow: "rgba(45, 100, 176, 0.15)" },
  "registrar-sho": { bg: "bg-violet-50", text: "text-violet-700", glow: "rgba(139, 92, 246, 0.12)" },
  other: { bg: "bg-slate-50", text: "text-slate-600", glow: "rgba(100, 116, 139, 0.10)" }
};
var CATEGORY_BADGE_COLORS = {
  "gp-permanent": "bg-teal-50 text-teal-700",
  "gp-locum": "bg-orange-50 text-orange-700",
  consultant: "bg-violet-50 text-violet-700",
  "registrar-sho": "bg-blue-50 text-blue-700",
  other: "bg-gray-50 text-gray-700"
};

export {
  JOB_CATEGORIES,
  getCategoryLabel,
  CATEGORY_COLORS,
  CATEGORY_BADGE_COLORS
};
//# sourceMappingURL=chunk-WGB7TBXP.js.map