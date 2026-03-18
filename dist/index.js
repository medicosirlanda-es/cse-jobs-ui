'use client';
import {
  useJobFilters
} from "./chunk-DN3ITOAD.js";
import {
  CATEGORY_BADGE_COLORS,
  CATEGORY_COLORS,
  JOB_CATEGORIES,
  getCategoryLabel
} from "./chunk-WGB7TBXP.js";

// src/constants/counties.ts
var IRISH_COUNTIES = [
  "Dublin",
  "Cork",
  "Galway",
  "Limerick",
  "Waterford",
  "Kerry",
  "Mayo",
  "Sligo",
  "Donegal",
  "Louth",
  "Meath",
  "Kildare",
  "Wicklow",
  "Wexford",
  "Kilkenny",
  "Tipperary",
  "Clare",
  "Roscommon",
  "Leitrim",
  "Longford",
  "Westmeath",
  "Offaly",
  "Laois",
  "Carlow",
  "Cavan",
  "Monaghan"
];

// src/constants/specialties.ts
var MEDICAL_SPECIALTIES = [
  { value: "anaesthesiology", en: "Anaesthesiology", es: "Anestesiolog\xEDa" },
  { value: "cardiology", en: "Cardiology", es: "Cardiolog\xEDa" },
  { value: "chemical-pathology", en: "Chemical Pathology", es: "Patolog\xEDa Qu\xEDmica" },
  { value: "clinical-genetics", en: "Clinical Genetics", es: "Gen\xE9tica Cl\xEDnica" },
  { value: "clinical-pharmacology", en: "Clinical Pharmacology", es: "Farmacolog\xEDa Cl\xEDnica" },
  { value: "dermatology", en: "Dermatology", es: "Dermatolog\xEDa" },
  { value: "emergency-medicine", en: "Emergency Medicine", es: "Medicina de Urgencias" },
  { value: "endocrinology", en: "Endocrinology", es: "Endocrinolog\xEDa" },
  { value: "gastroenterology", en: "Gastroenterology", es: "Gastroenterolog\xEDa" },
  { value: "general-internal-medicine", en: "General Internal Medicine", es: "Medicina Interna General" },
  { value: "general-practice", en: "General Practice", es: "Medicina General" },
  { value: "general-surgery", en: "General Surgery", es: "Cirug\xEDa General" },
  { value: "genito-urinary-medicine", en: "Genito-Urinary Medicine", es: "Medicina Genitourinaria" },
  { value: "geriatric-medicine", en: "Geriatric Medicine", es: "Geriatr\xEDa" },
  { value: "haematology", en: "Haematology", es: "Hematolog\xEDa" },
  { value: "histopathology", en: "Histopathology", es: "Histopatolog\xEDa" },
  { value: "immunology", en: "Immunology", es: "Inmunolog\xEDa" },
  { value: "infectious-diseases", en: "Infectious Diseases", es: "Enfermedades Infecciosas" },
  { value: "internal-medicine", en: "Internal Medicine", es: "Medicina Interna" },
  { value: "medical-oncology", en: "Medical Oncology", es: "Oncolog\xEDa M\xE9dica" },
  { value: "microbiology", en: "Microbiology", es: "Microbiolog\xEDa" },
  { value: "neonatology", en: "Neonatology", es: "Neonatolog\xEDa" },
  { value: "nephrology", en: "Nephrology", es: "Nefrolog\xEDa" },
  { value: "neurology", en: "Neurology", es: "Neurolog\xEDa" },
  { value: "neuropathology", en: "Neuropathology", es: "Neuropatolog\xEDa" },
  { value: "neurosurgery", en: "Neurosurgery", es: "Neurocirug\xEDa" },
  { value: "obstetrics-gynaecology", en: "Obstetrics & Gynaecology", es: "Obstetricia y Ginecolog\xEDa" },
  { value: "occupational-medicine", en: "Occupational Medicine", es: "Medicina del Trabajo" },
  { value: "oncology", en: "Oncology", es: "Oncolog\xEDa" },
  { value: "ophthalmology", en: "Ophthalmology", es: "Oftalmolog\xEDa" },
  { value: "oral-maxillofacial-surgery", en: "Oral & Maxillofacial Surgery", es: "Cirug\xEDa Oral y Maxilofacial" },
  { value: "orthopaedics", en: "Orthopaedics", es: "Traumatolog\xEDa" },
  { value: "otolaryngology", en: "Otolaryngology (ENT)", es: "Otorrinolaringolog\xEDa" },
  { value: "paediatric-surgery", en: "Paediatric Surgery", es: "Cirug\xEDa Pedi\xE1trica" },
  { value: "paediatrics", en: "Paediatrics", es: "Pediatr\xEDa" },
  { value: "palliative-medicine", en: "Palliative Medicine", es: "Medicina Paliativa" },
  { value: "pathology", en: "Pathology", es: "Patolog\xEDa" },
  { value: "pharmaceutical-medicine", en: "Pharmaceutical Medicine", es: "Medicina Farmac\xE9utica" },
  { value: "plastic-surgery", en: "Plastic Surgery", es: "Cirug\xEDa Pl\xE1stica" },
  { value: "psychiatry", en: "Psychiatry", es: "Psiquiatr\xEDa" },
  { value: "public-health-medicine", en: "Public Health Medicine", es: "Salud P\xFAblica" },
  { value: "radiation-oncology", en: "Radiation Oncology", es: "Oncolog\xEDa Radioter\xE1pica" },
  { value: "radiology", en: "Radiology", es: "Radiolog\xEDa" },
  { value: "rehabilitation-medicine", en: "Rehabilitation Medicine", es: "Medicina de Rehabilitaci\xF3n" },
  { value: "respiratory-medicine", en: "Respiratory Medicine", es: "Neumolog\xEDa" },
  { value: "rheumatology", en: "Rheumatology", es: "Reumatolog\xEDa" },
  { value: "sports-exercise-medicine", en: "Sports & Exercise Medicine", es: "Medicina Deportiva" },
  { value: "tropical-medicine", en: "Tropical Medicine", es: "Medicina Tropical" },
  { value: "urology", en: "Urology", es: "Urolog\xEDa" },
  { value: "vascular-surgery", en: "Vascular Surgery", es: "Cirug\xEDa Vascular" }
];

// src/constants/contracts.ts
var CONTRACT_TYPES = [
  { value: "permanent", en: "Permanent", es: "Permanente" },
  { value: "fixed-term", en: "Fixed Term", es: "Temporal" },
  { value: "locum", en: "Locum", es: "Locum" },
  { value: "maternity", en: "Maternity Cover", es: "Cobertura" }
];
var CONTRACT_DURATIONS = [
  { value: "permanent", en: "Permanent", es: "Permanente" },
  { value: "temporal", en: "Temporary", es: "Temporal" }
];
var CONTRACT_TYPE_TO_DURATION = {
  permanent: "permanent",
  "fixed-term": "temporal",
  locum: "temporal",
  maternity: "temporal"
};
var CONTRACT_COLORS = {
  "fixed-term": "bg-primary/10 text-primary",
  locum: "bg-primary/10 text-primary",
  maternity: "bg-primary/10 text-primary",
  permanent: "bg-slate-100 text-slate-600"
};
function getContractLabel(type, locale) {
  const ct = CONTRACT_TYPES.find((c) => c.value === type);
  return ct ? ct[locale] : type;
}

// src/constants/sort.ts
var SORT_OPTIONS = [
  { value: "newest", en: "Newest", es: "M\xE1s recientes" },
  { value: "closing", en: "Closing soon", es: "Cierre pr\xF3ximo" }
];
function getSortLabel(sort, locale) {
  const opt = SORT_OPTIONS.find((s) => s.value === sort);
  return opt ? opt[locale] : sort;
}

// src/utils/format.ts
var SALARY_TYPE_LABELS = {
  annual: { en: "/year", es: "/a\xF1o" },
  session: { en: "/session", es: "/sesi\xF3n" },
  hourly: { en: "/hour", es: "/hora" }
};
function formatSalary(salary, locale = "en") {
  if (!salary) return null;
  const { min, max, type } = salary;
  if (!min && !max) return null;
  const suffix = type ? SALARY_TYPE_LABELS[type][locale] : "";
  const from = locale === "es" ? "Desde" : "From";
  const to = locale === "es" ? "Hasta" : "Up to";
  if (min && max) {
    return `\u20AC${min.toLocaleString()} - \u20AC${max.toLocaleString()}${suffix}`;
  }
  if (min) {
    return `${from} \u20AC${min.toLocaleString()}${suffix}`;
  }
  if (max) {
    return `${to} \u20AC${max.toLocaleString()}${suffix}`;
  }
  return null;
}
function formatCounty(county) {
  if (!county) return "";
  if (county.startsWith("Co. ")) return county;
  return `Co. ${county.charAt(0).toUpperCase()}${county.slice(1)}`;
}
function formatSpecialty(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function formatDuration(duration, locale = "en") {
  const num = parseInt(duration, 10);
  if (isNaN(num)) return duration;
  if (num >= 12 && num % 12 === 0) {
    const years = num / 12;
    const unit2 = years === 1 ? locale === "es" ? "a\xF1o" : "year" : locale === "es" ? "a\xF1os" : "years";
    return `${years} ${unit2}`;
  }
  const unit = num === 1 ? locale === "es" ? "mes" : "month" : locale === "es" ? "meses" : "months";
  return `${num} ${unit}`;
}
function getContractLabel2(type, locale) {
  const labels = {
    permanent: { en: "Permanent", es: "Permanente" },
    "fixed-term": { en: "Fixed Term", es: "Temporal" },
    locum: { en: "Locum", es: "Locum" },
    maternity: { en: "Maternity Cover", es: "Cobertura" }
  };
  return labels[type]?.[locale] ?? type;
}
function parseConsultantTitle(title) {
  const fallback = { specialty: title, county: null, term: null, displayTitle: title };
  if (!title.includes("\u2014")) {
    return fallback;
  }
  const parts = title.split("\u2014").map((p) => p.trim());
  if (parts.length < 2) return fallback;
  let specialty = parts[0];
  if (specialty.toLowerCase().startsWith("consultant ")) {
    specialty = specialty.substring(11).trim();
  }
  let county = null;
  if (parts[1] && parts[1].startsWith("Co. ")) {
    county = parts[1].substring(4).trim();
  } else if (parts[1]) {
    county = parts[1];
  }
  const term = parts[2] || null;
  const displayTitle = term ? `${specialty} - ${term}` : specialty;
  return { specialty, county, term, displayTitle };
}
function truncateSummary(text, maxLength = 300) {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "\u2026";
}

// src/utils/closing-date.ts
import { isValid, isFuture, differenceInDays } from "date-fns";
function getClosingDateInfo(closingDate, locale = "en") {
  if (!closingDate) return null;
  const date = new Date(closingDate);
  if (!isValid(date)) return null;
  if (!isFuture(date)) {
    return {
      text: locale === "es" ? "Cerrada" : "Closed",
      daysLeft: 0,
      urgent: false,
      color: "gray",
      pulse: false
    };
  }
  const daysLeft = differenceInDays(date, /* @__PURE__ */ new Date());
  const prefix = locale === "es" ? "Cierra en" : "Closes in";
  const dayWord = (n) => {
    if (locale === "es") return n === 1 ? "d\xEDa" : "d\xEDas";
    return n === 1 ? "day" : "days";
  };
  if (daysLeft === 0) {
    return {
      text: locale === "es" ? "Cierra hoy" : "Closes today",
      daysLeft: 0,
      urgent: true,
      color: "red",
      pulse: true
    };
  }
  if (daysLeft <= 3) {
    return {
      text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
      daysLeft,
      urgent: true,
      color: "red",
      pulse: true
    };
  }
  if (daysLeft <= 7) {
    return {
      text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
      daysLeft,
      urgent: true,
      color: "amber",
      pulse: false
    };
  }
  if (daysLeft <= 30) {
    return {
      text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
      daysLeft,
      urgent: false,
      color: "emerald",
      pulse: false
    };
  }
  return {
    text: `${prefix} ${daysLeft} ${dayWord(daysLeft)}`,
    daysLeft,
    urgent: false,
    color: "emerald",
    pulse: false
  };
}
function getClosedDate(closingDate, locale = "en") {
  if (!closingDate) return null;
  const date = new Date(closingDate);
  if (!isValid(date)) return null;
  const month = date.toLocaleString(locale === "es" ? "es" : "en", { month: "short" });
  const year = String(date.getFullYear()).slice(2);
  return `${month} '${year}`;
}

// src/utils/filter.ts
var DEFAULT_FILTERS = {
  categories: [],
  specialties: [],
  counties: [],
  duration: [],
  sort: "newest"
};
function filterJobs(jobs, filters) {
  let filtered = [...jobs];
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(
      (job) => filters.categories.includes(job.category)
    );
  }
  if (filters.specialties && filters.specialties.length > 0) {
    filtered = filtered.filter((job) => {
      if (job.specialties && job.specialties.length > 0) {
        const jobSpecialtiesLower = job.specialties.map((s) => s.toLowerCase());
        return filters.specialties.some((spec) => {
          const specLower = spec.toLowerCase();
          return jobSpecialtiesLower.some(
            (jobSpec) => jobSpec === specLower || jobSpec.includes(specLower) || specLower.includes(jobSpec)
          );
        });
      }
      const titleLower = job.title.toLowerCase();
      return filters.specialties.some((spec) => {
        const searchTerms = spec.replace(/-/g, " ").toLowerCase();
        return titleLower.includes(searchTerms);
      });
    });
  }
  if (filters.counties && filters.counties.length > 0) {
    const countiesLower = filters.counties.map((c) => c.toLowerCase());
    filtered = filtered.filter(
      (job) => countiesLower.includes(job.county.toLowerCase())
    );
  }
  if (filters.duration && filters.duration.length > 0) {
    filtered = filtered.filter((job) => {
      if (!job.contractType) return true;
      const jobDuration = CONTRACT_TYPE_TO_DURATION[job.contractType];
      return filters.duration.includes(jobDuration);
    });
  }
  return filtered;
}
function sortJobs(jobs, sortOption) {
  const sorted = [...jobs];
  switch (sortOption) {
    case "newest":
      return sorted.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    case "closing":
      return sorted.sort((a, b) => {
        if (!a.closingDate && !b.closingDate) return 0;
        if (!a.closingDate) return 1;
        if (!b.closingDate) return -1;
        const dateA = new Date(a.closingDate).getTime();
        const dateB = new Date(b.closingDate).getTime();
        return dateA - dateB;
      });
    default:
      return sorted;
  }
}
function filterAndSortJobs(jobs, filters) {
  const filtered = filterJobs(jobs, filters);
  return sortJobs(filtered, filters.sort || "newest");
}

// src/utils/i18n.ts
var STRINGS = {
  "view_offer": { en: "View", es: "Ver oferta" },
  "view": { en: "View", es: "Ver" },
  "closed": { en: "Closed", es: "Cerrada" },
  "past_offers": { en: "Past Offers", es: "Ofertas pasadas" },
  "past_offers_count_one": { en: "closed offer", es: "oferta cerrada" },
  "past_offers_count_other": { en: "closed offers", es: "ofertas cerradas" },
  "past_offers_note": {
    en: "These offers are no longer accepting applications, but you can view the details for reference.",
    es: "Estas ofertas ya no aceptan candidaturas, pero puedes ver los detalles para referencia."
  },
  "no_results": { en: "No results found", es: "No se encontraron resultados" },
  "clear_selection": { en: "Clear selection", es: "Limpiar selecci\xF3n" },
  "clear_all": { en: "Clear all", es: "Limpiar todo" },
  "clear": { en: "Clear", es: "Limpiar" },
  "apply_filters": { en: "Apply filters", es: "Aplicar filtros" },
  "filters": { en: "Filters", es: "Filtros" },
  "more": { en: "more", es: "m\xE1s" },
  "sort_by": { en: "Sort:", es: "Ordenar:" },
  "select": { en: "Select", es: "Seleccionar" },
  "category": { en: "Category", es: "Categor\xEDa" },
  "specialty": { en: "Specialty", es: "Especialidad" },
  "county": { en: "County", es: "Condado" },
  "duration": { en: "Duration", es: "Duraci\xF3n" },
  "search": { en: "Search...", es: "Buscar..." },
  "search_specialty": { en: "Search specialty...", es: "Buscar especialidad..." },
  "search_county": { en: "Search county...", es: "Buscar condado..." },
  "sort_by_label": { en: "Sort by", es: "Ordenar por" },
  "remove_filter": { en: "Remove filter:", es: "Eliminar filtro:" },
  "active_filters": { en: "active filters", es: "filtros activos" },
  "no_active_filters": { en: "No active filters", es: "Sin filtros activos" },
  "close_filter_panel": { en: "Close filter panel", es: "Cerrar panel de filtros" },
  "close_filters": { en: "Close filters", es: "Cerrar filtros" },
  "close": { en: "Close", es: "Cerrar" },
  // Apply modal
  "apply_to_offer": { en: "Apply to this offer", es: "Aplicar a esta oferta" },
  "name": { en: "Name", es: "Nombre" },
  "name_placeholder": { en: "Your name...", es: "Tu nombre\u2026" },
  "email": { en: "Email", es: "Email" },
  "email_placeholder": { en: "your@email.com", es: "tu@email.com" },
  "phone": { en: "Phone", es: "Tel\xE9fono" },
  "phone_placeholder": { en: "Your phone (optional)", es: "Tu tel\xE9fono (opcional)" },
  "cv_upload": { en: "Upload CV", es: "Subir CV" },
  "cv_formats": { en: "PDF or Word, max 5MB", es: "PDF o Word, m\xE1x 5MB" },
  "cv_required": { en: "Required field", es: "Campo requerido" },
  "cover_letter": { en: "Additional message", es: "Mensaje adicional" },
  "cover_letter_placeholder": {
    en: "Tell us why you're interested in this offer (optional)...",
    es: "Cu\xE9ntanos por qu\xE9 te interesa esta oferta (opcional)\u2026"
  },
  "optional": { en: "optional", es: "opcional" },
  "privacy_consent": {
    en: "I have read and accept the",
    es: "He le\xEDdo y acepto la"
  },
  "privacy_policy": { en: "privacy policy", es: "pol\xEDtica de privacidad" },
  "privacy_consent_suffix": {
    en: "and consent to the processing of my personal data to process my application.",
    es: "y consiento el tratamiento de mis datos personales para procesar mi candidatura."
  },
  "submit_application": { en: "Submit application", es: "Enviar aplicaci\xF3n" },
  "submitting": { en: "Submitting...", es: "Enviando\u2026" },
  "submit_cv": { en: "Submit my CV", es: "Enviar mi CV" },
  "application_sent": { en: "Application sent!", es: "\xA1Aplicaci\xF3n enviada!" },
  "application_sent_message": {
    en: "We have received your CV. We will contact you soon.",
    es: "Hemos recibido tu CV correctamente. Nos pondremos en contacto contigo pronto."
  },
  "cv_stored_securely": {
    en: "Your CV is stored securely on our servers",
    es: "Tu CV se almacena de forma segura en nuestros servidores"
  },
  "linkedin": { en: "LinkedIn", es: "LinkedIn" },
  "linkedin_placeholder": { en: "LinkedIn profile URL (optional)", es: "URL de perfil LinkedIn (opcional)" },
  "imc_registered": { en: "IMC Registered", es: "Registrado en IMC" },
  "yes": { en: "Yes", es: "S\xED" },
  "no": { en: "No", es: "No" },
  // Empty state
  "no_jobs_title": { en: "No positions available", es: "No hay ofertas disponibles" },
  "no_jobs_message": {
    en: "We don't have open positions matching your criteria right now, but new jobs are added regularly.",
    es: "No tenemos ofertas que coincidan con tus criterios en este momento, pero se a\xF1aden nuevas ofertas regularmente."
  },
  "send_cv_cta": { en: "Send us your CV", es: "Env\xEDanos tu CV" }
};
function t(key, locale) {
  return STRINGS[key]?.[locale] ?? key;
}

// src/components/job-card.tsx
import Link from "next/link";

// src/components/closing-badge.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var INLINE_COLORS = {
  red: "text-red-600",
  amber: "text-amber-600",
  emerald: "text-emerald-600",
  gray: "text-gray-500"
};
var PILL_COLORS = {
  red: "bg-red-50 text-red-700 border-red-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  gray: "bg-gray-100 text-gray-600 border-gray-200"
};
function ClosingBadge({ closingDate, locale = "en", variant = "inline" }) {
  const info = getClosingDateInfo(closingDate, locale);
  if (!info) return null;
  if (variant === "pill") {
    return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${PILL_COLORS[info.color]}`, children: [
      info.pulse && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-red-500 rounded-full motion-safe:animate-pulse" }),
      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
      info.text
    ] });
  }
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap ${INLINE_COLORS[info.color]}`, children: [
    info.pulse && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 motion-safe:animate-pulse" }),
    info.text
  ] });
}

// src/components/job-pill.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var SIZE_CLASSES = {
  xs: "px-2 py-0.5 text-[10px] gap-1",
  sm: "px-2.5 py-1 text-[11px] gap-1",
  md: "px-3 py-1.5 text-xs gap-1.5"
};
function JobPill({ icon, children, size = "sm" }) {
  return /* @__PURE__ */ jsxs2("span", { className: `inline-flex items-center font-medium rounded-full bg-primary/8 text-primary/90 ${SIZE_CLASSES[size]}`, children: [
    icon && /* @__PURE__ */ jsx2("span", { className: "shrink-0 text-primary/50", children: icon }),
    children
  ] });
}
function LocationIcon({ className = "w-3 h-3" }) {
  return /* @__PURE__ */ jsxs2("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
    /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
  ] });
}
function CalendarIcon({ className = "w-3 h-3" }) {
  return /* @__PURE__ */ jsx2("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) });
}

// src/components/job-card.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function capitalizeCounty(county) {
  if (!county) return "";
  return county.split(/[\s-]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function formatCounty2(county) {
  if (!county) return "";
  const cap = capitalizeCounty(county);
  if (cap.startsWith("Co.")) return cap;
  return `Co. ${cap}`;
}
function getContractBadge(job, locale) {
  if (!job.contractType) return null;
  if (job.contractType === "permanent") {
    return locale === "es" ? "Permanente" : "Permanent";
  }
  const typeLabel = job.contractType === "locum" ? "Locum" : job.contractType === "maternity" ? locale === "es" ? "Cobertura" : "Maternity" : locale === "es" ? "Temporal" : "Fixed Term";
  const monthMatch = job.title.match(/(\d+)\s*mo(?:nths?)?/i);
  if (monthMatch) {
    const months = parseInt(monthMatch[1], 10);
    if (months > 0) {
      const unit = locale === "es" ? months === 1 ? "mes" : "meses" : months === 1 ? "month" : "months";
      return `${typeLabel}: ${months} ${unit}`;
    }
  }
  return typeLabel;
}
function JobCard({
  job,
  locale,
  href,
  index = 0,
  variant = "default",
  renderWrapper
}) {
  const salaryText = formatSalary(job.salary, locale);
  const isConsultant = job.category === "consultant" || job.category === "registrar-sho";
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null;
  const categoryLabel = getCategoryLabel(job.category, locale);
  const specialty = parsed?.specialty || null;
  const county = job.county ? formatCounty2(job.county) : null;
  const contractBadge = getContractBadge(job, locale);
  const summary = job.descriptionSummary ? truncateSummary(job.descriptionSummary, 120) : null;
  const card = /* @__PURE__ */ jsx3(
    Link,
    {
      href,
      className: "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl",
      children: /* @__PURE__ */ jsx3("article", { className: "job-card-hover flex flex-col h-full bg-white rounded-xl border border-gray-200 job-card-border shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs3("div", { className: "p-5 flex flex-col flex-grow", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsx3("div", { children: contractBadge && /* @__PURE__ */ jsx3(JobPill, { icon: /* @__PURE__ */ jsx3(CalendarIcon, {}), children: contractBadge }) }),
          /* @__PURE__ */ jsx3("div", { children: county && /* @__PURE__ */ jsx3(JobPill, { icon: /* @__PURE__ */ jsx3(LocationIcon, {}), children: county }) })
        ] }),
        /* @__PURE__ */ jsx3("h3", { className: "text-lg font-bold text-primary transition-colors duration-300 group-hover:text-primary/80 mb-1", children: isConsultant && specialty ? /* @__PURE__ */ jsxs3(Fragment, { children: [
          /* @__PURE__ */ jsx3("span", { children: categoryLabel }),
          " ",
          /* @__PURE__ */ jsx3("span", { className: "specialty-shimmer", children: specialty })
        ] }) : /* @__PURE__ */ jsx3("span", { children: job.title }) }),
        summary && /* @__PURE__ */ jsx3("p", { className: "text-sm text-gray-500 line-clamp-2 mb-2", children: summary }),
        /* @__PURE__ */ jsx3("div", { className: "flex-grow" }),
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3 pt-3 border-t border-gray-100 mt-2", children: [
          /* @__PURE__ */ jsx3(ClosingBadge, { closingDate: job.closingDate, locale }),
          salaryText && /* @__PURE__ */ jsx3("span", { className: "text-sm font-semibold text-primary tabular-nums", children: salaryText }),
          /* @__PURE__ */ jsxs3("span", { className: "inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-200 ml-auto", children: [
            t("view_offer", locale),
            /* @__PURE__ */ jsx3("svg", { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx3("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ] })
        ] })
      ] }) })
    }
  );
  if (renderWrapper) {
    return /* @__PURE__ */ jsx3(Fragment, { children: renderWrapper({ children: card, job, index }) });
  }
  return card;
}

// src/components/job-card-grid.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function JobCardGrid({
  jobs,
  locale,
  getHref,
  variant = "default",
  renderWrapper,
  columns = 3
}) {
  const gridClass = columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  return /* @__PURE__ */ jsx4("div", { className: gridClass, children: jobs.map((job, index) => /* @__PURE__ */ jsx4(
    JobCard,
    {
      job,
      locale,
      href: getHref(job),
      index,
      variant,
      renderWrapper
    },
    job.id
  )) });
}

// src/components/past-job-card.tsx
import Link2 from "next/link";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function PastJobCard({ job, locale, href }) {
  const salaryText = formatSalary(job.salary, locale);
  const closedDate = getClosedDate(job.closingDate, locale);
  const isConsultant = job.category === "consultant";
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null;
  const displayTitle = parsed?.displayTitle || job.title;
  const countyForBadge = parsed?.county || job.county;
  return /* @__PURE__ */ jsx5(
    Link2,
    {
      href,
      className: "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-xl",
      children: /* @__PURE__ */ jsx5("article", { className: "flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden opacity-60 grayscale-[30%] transition-all duration-200 hover:opacity-80 hover:grayscale-0", children: /* @__PURE__ */ jsxs4("div", { className: "p-5 flex flex-col flex-grow", children: [
        /* @__PURE__ */ jsx5("div", { className: "flex items-center justify-between gap-2 mb-3", children: /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1.5 flex-wrap min-w-0", children: [
          /* @__PURE__ */ jsxs4("span", { className: "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-gray-200 text-gray-600", children: [
            /* @__PURE__ */ jsx5("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }),
            closedDate || t("closed", locale)
          ] }),
          isConsultant ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
            countyForBadge && /* @__PURE__ */ jsx5("span", { className: "px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500 truncate max-w-[100px]", children: countyForBadge }),
            job.contractType && /* @__PURE__ */ jsx5("span", { className: "px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500", children: getContractLabel2(job.contractType, locale) })
          ] }) : /* @__PURE__ */ jsx5("span", { className: "px-2 py-1 text-[10px] font-medium uppercase tracking-wide rounded-full bg-gray-100 text-gray-500", children: getCategoryLabel(job.category, locale) })
        ] }) }),
        /* @__PURE__ */ jsx5("h3", { className: "text-lg font-bold text-gray-600 mb-2 line-clamp-2 group-hover:text-gray-800 transition-colors", children: displayTitle }),
        !isConsultant && job.county && /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1.5 text-sm text-gray-500 mb-2", children: [
          /* @__PURE__ */ jsxs4("svg", { className: "w-4 h-4 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
            /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
          ] }),
          /* @__PURE__ */ jsx5("span", { className: "truncate", children: job.county })
        ] }),
        job.descriptionSummary && /* @__PURE__ */ jsx5("p", { className: "text-sm text-gray-500 line-clamp-2 mb-3 flex-grow", children: job.descriptionSummary }),
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between pt-3 border-t border-gray-200 mt-auto", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3", children: [
            salaryText && /* @__PURE__ */ jsx5("span", { className: "text-sm font-semibold text-gray-500 tabular-nums", children: salaryText }),
            !isConsultant && job.contractType && /* @__PURE__ */ jsx5("span", { className: "text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500", children: getContractLabel2(job.contractType, locale) })
          ] }),
          /* @__PURE__ */ jsxs4("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full group-hover:bg-gray-200 group-hover:text-gray-700 transition-all duration-200", children: [
            t("view", locale),
            /* @__PURE__ */ jsx5("svg", { className: "w-3 h-3 transition-transform group-hover:translate-x-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ] })
        ] })
      ] }) })
    }
  );
}

// src/components/past-offers-section.tsx
import { useState } from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function PastOffersSection({ count, locale, children }) {
  const [isOpen, setIsOpen] = useState(false);
  if (count === 0) return null;
  const countLabel = count === 1 ? t("past_offers_count_one", locale) : t("past_offers_count_other", locale);
  return /* @__PURE__ */ jsxs5("section", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        onClick: () => setIsOpen((prev) => !prev),
        className: "w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group",
        "aria-expanded": isOpen,
        "aria-controls": "past-offers-content",
        type: "button",
        children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx6("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 group-hover:bg-gray-300 transition-colors", children: /* @__PURE__ */ jsx6("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx6("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" }) }) }),
            /* @__PURE__ */ jsxs5("div", { className: "text-left", children: [
              /* @__PURE__ */ jsx6("h2", { className: "text-base md:text-lg font-semibold text-gray-700", children: t("past_offers", locale) }),
              /* @__PURE__ */ jsxs5("p", { className: "text-sm text-gray-500", children: [
                count,
                " ",
                countLabel
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx6(
            "svg",
            {
              className: `w-5 h-5 text-gray-400 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx6("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs5(
      "div",
      {
        id: "past-offers-content",
        className: `overflow-hidden transition-all duration-200 ease-out ${isOpen ? "max-h-[5000px] opacity-100 mt-6" : "max-h-0 opacity-0"}`,
        "aria-hidden": !isOpen,
        children: [
          children,
          /* @__PURE__ */ jsx6("p", { className: "mt-6 text-center text-sm text-gray-400", children: t("past_offers_note", locale) })
        ]
      }
    )
  ] });
}

// src/components/job-filters-bar.tsx
import { useState as useState5, useCallback as useCallback4 } from "react";

// src/components/filter-dropdown.tsx
import { useState as useState2, useRef, useEffect, useCallback } from "react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function FilterDropdown({
  label,
  options,
  selectedValues,
  onChange,
  searchable = false,
  searchPlaceholder,
  className = "",
  widePanel = false,
  locale = "en"
}) {
  const [isOpen, setIsOpen] = useState2(false);
  const [searchQuery, setSearchQuery] = useState2("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const filteredOptions = searchable && searchQuery ? options.filter(
    (opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  ) : options;
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
      buttonRef.current?.focus();
    }
  }, []);
  const toggleOption = (value) => {
    const newValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
    onChange(newValues);
  };
  const getButtonText = () => {
    if (selectedValues.length === 0) return label;
    if (selectedValues.length === 1) {
      const selected = options.find((o) => o.value === selectedValues[0]);
      return selected?.label || label;
    }
    return `${label} (${selectedValues.length})`;
  };
  const hasSelection = selectedValues.length > 0;
  const defaultSearchPlaceholder = searchPlaceholder || t("search", locale);
  return /* @__PURE__ */ jsxs6("div", { ref: dropdownRef, className: `relative ${className}`, children: [
    /* @__PURE__ */ jsxs6(
      "button",
      {
        ref: buttonRef,
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        onKeyDown: handleKeyDown,
        className: `
          flex items-center justify-between gap-2 w-full
          min-h-[44px] px-4 py-2.5
          text-sm font-medium rounded-lg border
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
          cursor-pointer
          ${hasSelection ? "bg-primary/5 border-primary text-primary shadow-sm" : "bg-white border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm"}
        `,
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
        children: [
          /* @__PURE__ */ jsx7("span", { className: "truncate", children: getButtonText() }),
          /* @__PURE__ */ jsx7(
            "svg",
            {
              className: `w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx7("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs6(
      "div",
      {
        className: `absolute z-50 mt-2 w-full max-h-[300px] overflow-hidden bg-white rounded-xl border border-gray-200/80 shadow-xl
            origin-top animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150
            ${widePanel ? "min-w-[280px]" : "min-w-[200px]"}`,
        role: "listbox",
        "aria-multiselectable": "true",
        onKeyDown: handleKeyDown,
        children: [
          searchable && /* @__PURE__ */ jsx7("div", { className: "p-2 border-b border-gray-100", children: /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
            /* @__PURE__ */ jsx7(
              "svg",
              {
                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx7("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
              }
            ),
            /* @__PURE__ */ jsx7(
              "input",
              {
                type: "text",
                name: "filter-search",
                autoComplete: "off",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: defaultSearchPlaceholder,
                className: "w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                autoFocus: true
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx7("div", { className: "overflow-y-auto max-h-[240px] p-1", children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx7("div", { className: "px-3 py-4 text-sm text-gray-500 text-center", children: t("no_results", locale) }) : filteredOptions.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return /* @__PURE__ */ jsxs6(
              "button",
              {
                type: "button",
                onClick: () => toggleOption(option.value),
                className: `
                      flex items-center gap-3 w-full
                      min-h-[44px] px-3 py-2
                      text-sm text-left rounded-lg
                      transition-colors duration-150
                      cursor-pointer
                      ${isSelected ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"}
                    `,
                role: "option",
                "aria-selected": isSelected,
                children: [
                  /* @__PURE__ */ jsx7(
                    "span",
                    {
                      className: `
                        flex items-center justify-center
                        w-5 h-5 rounded border-2
                        transition-all duration-200 ease-out
                        ${isSelected ? "bg-primary border-primary scale-100" : "border-gray-300 scale-100 hover:border-primary/50"}
                      `,
                      children: /* @__PURE__ */ jsx7(
                        "svg",
                        {
                          className: `w-3 h-3 text-white transition-all duration-200 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`,
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: /* @__PURE__ */ jsx7("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx7("span", { className: "truncate", children: option.label })
                ]
              },
              option.value
            );
          }) }),
          selectedValues.length > 0 && /* @__PURE__ */ jsx7("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              onClick: () => onChange([]),
              className: "w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
              children: t("clear_selection", locale)
            }
          ) })
        ]
      }
    )
  ] });
}

// src/components/filter-chips.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function FilterChips({
  chips,
  onClearAll,
  locale,
  maxVisible = 4
}) {
  if (chips.length === 0) return null;
  const visibleChips = chips.slice(0, maxVisible);
  const hiddenCount = chips.length - maxVisible;
  return /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2 flex-wrap", children: [
    visibleChips.map((chip) => /* @__PURE__ */ jsxs7(
      "span",
      {
        className: "group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full transition-all duration-200 hover:bg-primary/15 hover:shadow-sm",
        children: [
          /* @__PURE__ */ jsx8("span", { className: "truncate max-w-[120px]", children: chip.label }),
          /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              onClick: chip.onRemove,
              className: "flex-shrink-0 p-0.5 hover:bg-primary/30 active:scale-90 rounded-full transition-all duration-150",
              "aria-label": `${t("remove_filter", locale)} ${chip.label}`,
              children: /* @__PURE__ */ jsx8("svg", { className: "w-3.5 h-3.5 transition-transform duration-150 group-hover:scale-110", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx8("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ]
      },
      chip.key
    )),
    hiddenCount > 0 && /* @__PURE__ */ jsxs7("span", { className: "px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full", children: [
      "+",
      hiddenCount,
      " ",
      t("more", locale)
    ] }),
    /* @__PURE__ */ jsx8(
      "button",
      {
        type: "button",
        onClick: onClearAll,
        className: "px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:underline active:scale-95 transition-all duration-150",
        children: t("clear_all", locale)
      }
    )
  ] });
}

// src/components/sort-dropdown.tsx
import { useState as useState3, useRef as useRef2, useEffect as useEffect2, useCallback as useCallback2 } from "react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function SortDropdown({ value, options, onChange, locale = "en" }) {
  const [isOpen, setIsOpen] = useState3(false);
  const dropdownRef = useRef2(null);
  const buttonRef = useRef2(null);
  const selectedOption = options.find((o) => o.value === value);
  useEffect2(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);
  const handleKeyDown = useCallback2((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);
  return /* @__PURE__ */ jsxs8("div", { ref: dropdownRef, className: "relative", children: [
    /* @__PURE__ */ jsxs8(
      "button",
      {
        ref: buttonRef,
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        onKeyDown: handleKeyDown,
        className: "flex items-center justify-between gap-2 min-h-[44px] px-4 py-2.5 min-w-[160px] text-sm font-medium rounded-lg border transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer bg-white border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm",
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
        children: [
          /* @__PURE__ */ jsx9("span", { children: selectedOption?.label || t("select", locale) }),
          /* @__PURE__ */ jsx9(
            "svg",
            {
              className: `w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx9("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx9(
      "div",
      {
        className: "absolute right-0 z-50 mt-2 min-w-full bg-white rounded-xl border border-gray-200/80 shadow-xl origin-top animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 overflow-hidden",
        role: "listbox",
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsx9("div", { className: "p-1", children: options.map((option) => {
          const isSelected = option.value === value;
          return /* @__PURE__ */ jsxs8(
            "button",
            {
              type: "button",
              onClick: () => {
                onChange(option.value);
                setIsOpen(false);
              },
              className: `
                    flex items-center gap-3 w-full
                    min-h-[44px] px-3 py-2
                    text-sm text-left rounded-lg
                    transition-colors duration-150
                    cursor-pointer
                    ${isSelected ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"}
                  `,
              role: "option",
              "aria-selected": isSelected,
              children: [
                /* @__PURE__ */ jsx9("span", { className: `flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all duration-200 ${isSelected ? "border-primary" : "border-gray-300"}`, children: /* @__PURE__ */ jsx9("span", { className: `w-2 h-2 rounded-full bg-primary transition-all duration-200 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}` }) }),
                /* @__PURE__ */ jsx9("span", { children: option.label })
              ]
            },
            option.value
          );
        }) })
      }
    )
  ] });
}

// src/components/mobile-filter-sheet.tsx
import { useEffect as useEffect3, useState as useState4, useCallback as useCallback3 } from "react";
import { Fragment as Fragment3, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function MobileFilterSheet({
  isOpen,
  onClose,
  locale,
  counties,
  duration,
  sort,
  categories = [],
  specialties = [],
  onApply,
  filterMode,
  categoryOptions = [],
  specialtyOptions = [],
  durationOptions = [],
  sortOptions = []
}) {
  const [localCounties, setLocalCounties] = useState4(counties);
  const [localDuration, setLocalDuration] = useState4(duration);
  const [localSort, setLocalSort] = useState4(sort);
  const [localCategories, setLocalCategories] = useState4(categories);
  const [localSpecialties, setLocalSpecialties] = useState4(specialties);
  const [countySearch, setCountySearch] = useState4("");
  useEffect3(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);
  useEffect3(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  const handleApply = useCallback3(() => {
    onApply({
      counties: localCounties,
      duration: localDuration,
      sort: localSort,
      ...filterMode === "categories" ? { categories: localCategories } : {},
      ...filterMode === "specialties" ? { specialties: localSpecialties } : {}
    });
    onClose();
  }, [localCounties, localDuration, localSort, localCategories, localSpecialties, filterMode, onApply, onClose]);
  const handleClear = useCallback3(() => {
    setLocalCounties([]);
    setLocalDuration([]);
    setLocalSort("newest");
    setLocalCategories([]);
    setLocalSpecialties([]);
  }, []);
  const toggleArrayValue = (current, value, setter) => {
    setter(
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );
  };
  const filteredCounties = countySearch ? IRISH_COUNTIES.filter((c) => c.toLowerCase().includes(countySearch.toLowerCase())) : IRISH_COUNTIES;
  const primaryOptions = filterMode === "categories" ? categoryOptions : specialtyOptions;
  const primaryValues = filterMode === "categories" ? localCategories : localSpecialties;
  const setPrimaryValues = filterMode === "categories" ? setLocalCategories : setLocalSpecialties;
  const primaryLabel = filterMode === "categories" ? t("category", locale) : t("specialty", locale);
  const activeCount = localCounties.length + localDuration.length + primaryValues.length;
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs9(Fragment3, { children: [
    /* @__PURE__ */ jsx10(
      "div",
      {
        className: "fixed inset-0 bg-black/50 z-40 transition-opacity duration-200",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs9(
      "div",
      {
        className: "fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[90dvh] flex flex-col",
        style: { animation: "slide-up 0.2s ease-out" },
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t("filters", locale),
        children: [
          /* @__PURE__ */ jsxs9("div", { className: "flex items-center justify-between px-5 py-4 border-b border-gray-100", children: [
            /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx10(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-10 h-1 bg-gray-300 hover:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2 top-2 cursor-grab active:cursor-grabbing transition-colors",
                  "aria-label": t("close_filter_panel", locale)
                }
              ),
              /* @__PURE__ */ jsx10("h2", { className: "text-lg font-semibold text-gray-900", children: t("filters", locale) }),
              activeCount > 0 && /* @__PURE__ */ jsx10("span", { className: "px-2 py-0.5 text-xs font-medium bg-primary text-white rounded-full", children: activeCount })
            ] }),
            /* @__PURE__ */ jsx10(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-2 -mr-2 text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
                "aria-label": t("close_filters", locale),
                children: /* @__PURE__ */ jsx10("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs9("div", { className: "flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6", children: [
            /* @__PURE__ */ jsxs9("section", { children: [
              /* @__PURE__ */ jsx10("h3", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3", children: primaryLabel }),
              /* @__PURE__ */ jsx10("div", { className: "flex flex-wrap gap-2", children: primaryOptions.map((option) => {
                const isSelected = primaryValues.includes(option.value);
                return /* @__PURE__ */ jsxs9(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleArrayValue(primaryValues, option.value, setPrimaryValues),
                    className: `inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full min-h-[44px] transition-all duration-150 active:scale-95 ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsx10("svg", { className: "w-4 h-4 flex-shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M5 13l4 4L19 7" }) }),
                      option.label
                    ]
                  },
                  option.value
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs9("section", { children: [
              /* @__PURE__ */ jsx10("h3", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3", children: t("county", locale) }),
              /* @__PURE__ */ jsxs9("div", { className: "relative mb-3", children: [
                /* @__PURE__ */ jsx10("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
                /* @__PURE__ */ jsx10(
                  "input",
                  {
                    type: "text",
                    name: "county-search",
                    autoComplete: "off",
                    value: countySearch,
                    onChange: (e) => setCountySearch(e.target.value),
                    placeholder: t("search_county", locale),
                    className: "w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx10("div", { className: "flex flex-wrap gap-2 max-h-[180px] overflow-y-auto", children: filteredCounties.map((county) => {
                const isSelected = localCounties.includes(county);
                return /* @__PURE__ */ jsxs9(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleArrayValue(localCounties, county, setLocalCounties),
                    className: `inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg min-h-[44px] transition-all duration-150 active:scale-95 ${isSelected ? "bg-primary/10 text-primary border border-primary/30" : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsx10("svg", { className: "w-3.5 h-3.5 flex-shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M5 13l4 4L19 7" }) }),
                      county
                    ]
                  },
                  county
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs9("section", { children: [
              /* @__PURE__ */ jsx10("h3", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3", children: t("duration", locale) }),
              /* @__PURE__ */ jsx10("div", { className: "flex gap-3", children: durationOptions.map((option) => {
                const isSelected = localDuration.includes(option.value);
                return /* @__PURE__ */ jsxs9(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleArrayValue(localDuration, option.value, setLocalDuration),
                    className: `flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl min-h-[48px] transition-all duration-150 active:scale-95 ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsx10("svg", { className: "w-4 h-4 flex-shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M5 13l4 4L19 7" }) }),
                      option.label
                    ]
                  },
                  option.value
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs9("section", { children: [
              /* @__PURE__ */ jsx10("h3", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3", children: t("sort_by_label", locale) }),
              /* @__PURE__ */ jsx10("div", { className: "flex gap-3", children: sortOptions.map((option) => {
                const isSelected = localSort === option.value;
                return /* @__PURE__ */ jsxs9(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLocalSort(option.value),
                    className: `flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl min-h-[48px] transition-all duration-150 active:scale-95 ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsx10("svg", { className: "w-4 h-4 flex-shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M5 13l4 4L19 7" }) }),
                      option.label
                    ]
                  },
                  option.value
                );
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs9("div", { className: "flex gap-3 px-5 py-4 border-t border-gray-100 bg-white", children: [
            /* @__PURE__ */ jsx10(
              "button",
              {
                type: "button",
                onClick: handleClear,
                className: "flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-150 min-h-[48px]",
                children: t("clear", locale)
              }
            ),
            /* @__PURE__ */ jsx10(
              "button",
              {
                type: "button",
                onClick: handleApply,
                className: "flex-[2] px-4 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 min-h-[48px] shadow-md hover:shadow-lg",
                children: t("apply_filters", locale)
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx10("style", { children: `
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      ` })
  ] });
}

// src/components/job-filters-bar.tsx
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function JobFiltersBar({ mode, locale }) {
  const {
    filters,
    hasActiveFilters,
    activeFilterCount,
    toggleFilter,
    setFilter,
    setSort,
    clearFilters
  } = useJobFilters();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState5(false);
  const [sheetKey, setSheetKey] = useState5(0);
  const categoryOptions = JOB_CATEGORIES.map((c) => ({ value: c.value, label: c[locale] }));
  const specialtyOptions = MEDICAL_SPECIALTIES.map((s) => ({ value: s.value, label: s[locale] }));
  const countyOptions = IRISH_COUNTIES.map((c) => ({ value: c, label: c }));
  const durationOptions = CONTRACT_DURATIONS.map((d) => ({ value: d.value, label: d[locale] }));
  const sortOptions = SORT_OPTIONS.map((s) => ({ value: s.value, label: s[locale] }));
  const primaryFilterConfig = mode === "main" ? {
    label: t("category", locale),
    options: categoryOptions,
    values: filters.categories,
    filterKey: "categories"
  } : {
    label: t("specialty", locale),
    options: specialtyOptions,
    values: filters.specialties,
    filterKey: "specialties"
  };
  const handleMobileApply = useCallback4((newFilters) => {
    if (mode === "main" && newFilters.categories) {
      setFilter("categories", newFilters.categories);
    }
    if (mode === "consultant" && newFilters.specialties) {
      setFilter("specialties", newFilters.specialties);
    }
    setFilter("counties", newFilters.counties);
    setFilter("duration", newFilters.duration);
    setSort(newFilters.sort);
  }, [mode, setFilter, setSort]);
  const chips = [];
  if (mode === "main") {
    filters.categories.forEach((cat) => {
      const opt = categoryOptions.find((c) => c.value === cat);
      if (opt) chips.push({ key: `cat-${cat}`, label: opt.label, onRemove: () => toggleFilter("categories", cat) });
    });
  } else {
    filters.specialties.forEach((spec) => {
      const opt = specialtyOptions.find((s) => s.value === spec);
      if (opt) chips.push({ key: `spec-${spec}`, label: opt.label, onRemove: () => toggleFilter("specialties", spec) });
    });
  }
  filters.counties.forEach((c) => {
    chips.push({ key: `county-${c}`, label: c, onRemove: () => toggleFilter("counties", c) });
  });
  filters.duration.forEach((d) => {
    const opt = durationOptions.find((o) => o.value === d);
    if (opt) chips.push({ key: `dur-${d}`, label: opt.label, onRemove: () => toggleFilter("duration", d) });
  });
  const secondaryFilterCount = filters.counties.length + filters.duration.length;
  return /* @__PURE__ */ jsxs10("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx11("div", { className: "sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: hasActiveFilters ? `${activeFilterCount} ${t("active_filters", locale)}` : t("no_active_filters", locale) }),
    /* @__PURE__ */ jsxs10("div", { className: "bg-gradient-to-b from-white to-gray-50/80 rounded-xl border border-gray-200/80 shadow-md p-3 md:p-4", children: [
      /* @__PURE__ */ jsxs10("div", { className: "hidden md:flex items-center gap-3", children: [
        /* @__PURE__ */ jsx11(
          FilterDropdown,
          {
            label: primaryFilterConfig.label,
            options: primaryFilterConfig.options,
            selectedValues: primaryFilterConfig.values,
            onChange: (values) => setFilter(primaryFilterConfig.filterKey, values),
            searchable: mode === "consultant",
            searchPlaceholder: mode === "consultant" ? t("search_specialty", locale) : void 0,
            widePanel: mode === "consultant",
            locale,
            className: mode === "consultant" ? "min-w-[220px]" : "min-w-[180px]"
          }
        ),
        /* @__PURE__ */ jsx11(
          FilterDropdown,
          {
            label: t("county", locale),
            options: countyOptions,
            selectedValues: filters.counties,
            onChange: (values) => setFilter("counties", values),
            searchable: true,
            searchPlaceholder: t("search_county", locale),
            locale,
            className: "min-w-[160px]"
          }
        ),
        /* @__PURE__ */ jsx11(
          FilterDropdown,
          {
            label: t("duration", locale),
            options: durationOptions,
            selectedValues: filters.duration,
            onChange: (values) => setFilter("duration", values),
            locale,
            className: "min-w-[140px]"
          }
        ),
        /* @__PURE__ */ jsx11("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx11("span", { className: "text-sm text-gray-500", children: t("sort_by", locale) }),
          /* @__PURE__ */ jsx11(
            SortDropdown,
            {
              value: filters.sort,
              options: sortOptions,
              onChange: (value) => setSort(value),
              locale
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs10("div", { className: "flex md:hidden items-center gap-2", children: [
        /* @__PURE__ */ jsx11(
          FilterDropdown,
          {
            label: primaryFilterConfig.label,
            options: primaryFilterConfig.options,
            selectedValues: primaryFilterConfig.values,
            onChange: (values) => setFilter(primaryFilterConfig.filterKey, values),
            locale,
            className: "flex-1"
          }
        ),
        /* @__PURE__ */ jsxs10(
          "button",
          {
            type: "button",
            onClick: () => {
              setSheetKey((k) => k + 1);
              setIsMobileSheetOpen(true);
            },
            className: `flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium rounded-lg border transition-all duration-200 ease-out ${secondaryFilterCount > 0 ? "bg-primary/5 border-primary text-primary shadow-sm" : "bg-white border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm"}`,
            children: [
              /* @__PURE__ */ jsx11("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx11("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" }) }),
              /* @__PURE__ */ jsx11("span", { children: t("filters", locale) }),
              secondaryFilterCount > 0 && /* @__PURE__ */ jsx11("span", { className: "flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full", children: secondaryFilterCount })
            ]
          }
        )
      ] })
    ] }),
    hasActiveFilters && /* @__PURE__ */ jsx11("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx11(FilterChips, { chips, onClearAll: clearFilters, locale }) }),
    hasActiveFilters && /* @__PURE__ */ jsx11("div", { className: "md:hidden", children: /* @__PURE__ */ jsx11(FilterChips, { chips, onClearAll: clearFilters, locale, maxVisible: 3 }) }),
    /* @__PURE__ */ jsx11(
      MobileFilterSheet,
      {
        isOpen: isMobileSheetOpen,
        onClose: () => setIsMobileSheetOpen(false),
        locale,
        counties: filters.counties,
        duration: filters.duration,
        sort: filters.sort,
        categories: mode === "main" ? filters.categories : void 0,
        specialties: mode === "consultant" ? filters.specialties : void 0,
        onApply: handleMobileApply,
        filterMode: mode === "main" ? "categories" : "specialties",
        categoryOptions,
        specialtyOptions,
        durationOptions,
        sortOptions
      },
      sheetKey
    )
  ] });
}

// src/components/apply-modal.tsx
import { useState as useState6, useEffect as useEffect4, useRef as useRef3, useCallback as useCallback5 } from "react";
import { createPortal } from "react-dom";
import { Fragment as Fragment4, jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
function ApplyModal({
  crmVacancyId,
  jobTitle,
  locale,
  source,
  crmApiUrl,
  privacyPolicyUrl,
  glowEffect = false,
  externalLink,
  onApplicationSubmitted
}) {
  const [isOpen, setIsOpen] = useState6(false);
  const [isPending, setIsPending] = useState6(false);
  const [formState, setFormState] = useState6({ success: false, error: null, applicationId: null });
  const [privacyConsent, setPrivacyConsent] = useState6(false);
  const [cvFile, setCvFile] = useState6(null);
  const modalRef = useRef3(null);
  const triggerRef = useRef3(null);
  const formRef = useRef3(null);
  const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const handleKeyDown = useCallback5((e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (e.key === "Tab" && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusableElements.length === 0) return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, []);
  useEffect4(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleKeyDown]);
  useEffect4(() => {
    if (isOpen && modalRef.current) modalRef.current.focus();
  }, [isOpen]);
  useEffect4(() => {
    if (!isOpen && triggerRef.current) triggerRef.current.focus();
  }, [isOpen]);
  useEffect4(() => {
    if (formState.success) {
      formRef.current?.reset();
      setCvFile(null);
      setPrivacyConsent(false);
      if (formState.applicationId && onApplicationSubmitted) {
        onApplicationSubmitted(formState.applicationId);
      }
      const timer = setTimeout(() => setIsOpen(false), 3e3);
      return () => clearTimeout(timer);
    }
  }, [formState.success, formState.applicationId, onApplicationSubmitted]);
  const sourceMap = {
    cseconnect: "website_cseconnect",
    medicosirlanda: "website_medicosirlanda",
    doctorstoireland: "website_doctorstoireland"
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setFormState({ success: false, error: null, applicationId: null });
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("source", sourceMap[source]);
      if (cvFile) formData.set("cv_file", cvFile);
      const res = await fetch(
        `${crmApiUrl}/api/consultant-offers/${crmVacancyId}/apply`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!res.ok) {
        setFormState({ success: false, error: data.error || `Error: ${res.status}`, applicationId: null });
        return;
      }
      setFormState({ success: true, error: null, applicationId: data.application_id });
    } catch {
      setFormState({ success: false, error: locale === "es" ? "Error de conexi\xF3n. Int\xE9ntalo de nuevo." : "Connection error. Please try again.", applicationId: null });
    } finally {
      setIsPending(false);
    }
  };
  if (!crmVacancyId && externalLink) {
    return /* @__PURE__ */ jsxs11(
      "a",
      {
        href: externalLink,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `flex items-center justify-center w-full gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl ${glowEffect ? "animated-border-glow" : ""}`,
        children: [
          t("submit_cv", locale),
          /* @__PURE__ */ jsx12("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx12("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
        ]
      }
    );
  }
  const inputClassName = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-gray-900 placeholder:text-gray-400";
  return /* @__PURE__ */ jsxs11(Fragment4, { children: [
    /* @__PURE__ */ jsx12(
      "button",
      {
        ref: triggerRef,
        onClick: () => setIsOpen(true),
        className: `flex items-center justify-center w-full gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl ${glowEffect ? "animated-border-glow" : ""}`,
        children: t("submit_cv", locale)
      }
    ),
    isOpen && typeof document !== "undefined" && createPortal(
      /* @__PURE__ */ jsx12(
        "div",
        {
          className: "fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-8 sm:pt-4 overflow-y-auto overscroll-contain",
          onClick: (e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          },
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "apply-modal-title",
          children: /* @__PURE__ */ jsxs11(
            "div",
            {
              ref: modalRef,
              tabIndex: -1,
              className: "relative w-full max-w-lg max-h-[calc(100vh-4rem)] sm:max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col my-auto",
              children: [
                /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between p-5 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxs11("div", { children: [
                    /* @__PURE__ */ jsx12("h2", { id: "apply-modal-title", className: "text-lg font-bold text-gray-900", children: t("apply_to_offer", locale) }),
                    /* @__PURE__ */ jsx12("p", { className: "text-sm text-gray-500 truncate max-w-[350px]", children: jobTitle })
                  ] }),
                  /* @__PURE__ */ jsx12(
                    "button",
                    {
                      onClick: () => setIsOpen(false),
                      className: "p-2 text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100",
                      "aria-label": t("close", locale),
                      children: /* @__PURE__ */ jsx12("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx12("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx12("div", { className: "flex-1 overflow-y-auto p-5", children: formState.success ? /* @__PURE__ */ jsxs11("div", { className: "text-center py-8", children: [
                  /* @__PURE__ */ jsx12("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx12("svg", { className: "w-8 h-8 text-green-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx12("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
                  /* @__PURE__ */ jsx12("h3", { className: "text-xl font-bold text-gray-900 mb-2", children: t("application_sent", locale) }),
                  /* @__PURE__ */ jsx12("p", { className: "text-gray-600 mb-4", children: t("application_sent_message", locale) }),
                  /* @__PURE__ */ jsx12("button", { onClick: () => setIsOpen(false), className: "text-primary font-semibold hover:underline", children: t("close", locale) })
                ] }) : /* @__PURE__ */ jsxs11("form", { ref: formRef, onSubmit: handleSubmit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs11("div", { children: [
                    /* @__PURE__ */ jsxs11("label", { htmlFor: "apply-name", className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
                      t("name", locale),
                      " ",
                      /* @__PURE__ */ jsx12("span", { className: "text-red-500", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx12(
                      "input",
                      {
                        type: "text",
                        id: "apply-name",
                        name: "name",
                        required: true,
                        autoComplete: "name",
                        placeholder: t("name_placeholder", locale),
                        className: inputClassName,
                        disabled: isPending
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs11("div", { children: [
                    /* @__PURE__ */ jsxs11("label", { htmlFor: "apply-email", className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
                      t("email", locale),
                      " ",
                      /* @__PURE__ */ jsx12("span", { className: "text-red-500", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx12(
                      "input",
                      {
                        type: "email",
                        id: "apply-email",
                        name: "email",
                        required: true,
                        autoComplete: "email",
                        placeholder: t("email_placeholder", locale),
                        className: inputClassName,
                        disabled: isPending
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs11("div", { children: [
                    /* @__PURE__ */ jsxs11("label", { htmlFor: "apply-phone", className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
                      t("phone", locale),
                      " ",
                      /* @__PURE__ */ jsxs11("span", { className: "text-gray-400 font-normal", children: [
                        "(",
                        t("optional", locale),
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx12(
                      "input",
                      {
                        type: "tel",
                        id: "apply-phone",
                        name: "phone",
                        autoComplete: "tel",
                        placeholder: t("phone_placeholder", locale),
                        className: inputClassName,
                        disabled: isPending
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs11("div", { children: [
                    /* @__PURE__ */ jsxs11("label", { htmlFor: "apply-cv", className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
                      t("cv_upload", locale),
                      " ",
                      /* @__PURE__ */ jsx12("span", { className: "text-red-500", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx12(
                      "input",
                      {
                        type: "file",
                        id: "apply-cv",
                        name: "cv_file",
                        accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        onChange: (e) => setCvFile(e.target.files?.[0] || null),
                        className: "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20",
                        disabled: isPending
                      }
                    ),
                    /* @__PURE__ */ jsx12("p", { className: "mt-1 text-xs text-gray-500", children: t("cv_formats", locale) })
                  ] }),
                  /* @__PURE__ */ jsxs11("div", { children: [
                    /* @__PURE__ */ jsxs11("label", { htmlFor: "apply-cover", className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
                      t("cover_letter", locale),
                      " ",
                      /* @__PURE__ */ jsxs11("span", { className: "text-gray-400 font-normal", children: [
                        "(",
                        t("optional", locale),
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx12(
                      "textarea",
                      {
                        id: "apply-cover",
                        name: "cover_letter",
                        rows: 3,
                        placeholder: t("cover_letter_placeholder", locale),
                        className: `${inputClassName} resize-none`,
                        disabled: isPending
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs11("div", { className: "flex items-start gap-3 p-3 bg-gray-50 rounded-xl", children: [
                    /* @__PURE__ */ jsx12(
                      "input",
                      {
                        type: "checkbox",
                        id: "apply-privacy",
                        checked: privacyConsent,
                        onChange: (e) => setPrivacyConsent(e.target.checked),
                        className: "mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
                        disabled: isPending
                      }
                    ),
                    /* @__PURE__ */ jsxs11("label", { htmlFor: "apply-privacy", className: "text-sm text-gray-600", children: [
                      t("privacy_consent", locale),
                      " ",
                      /* @__PURE__ */ jsx12("a", { href: privacyPolicyUrl, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline font-medium", children: t("privacy_policy", locale) }),
                      " ",
                      t("privacy_consent_suffix", locale),
                      /* @__PURE__ */ jsx12("span", { className: "text-red-500 ml-1", children: "*" })
                    ] })
                  ] }),
                  formState.error && /* @__PURE__ */ jsx12("div", { className: "p-3 bg-red-50 border border-red-100 rounded-xl", role: "alert", children: /* @__PURE__ */ jsx12("p", { className: "text-sm text-red-700", children: formState.error }) }),
                  /* @__PURE__ */ jsx12(
                    "button",
                    {
                      type: "submit",
                      disabled: isPending || !cvFile || !privacyConsent,
                      className: "w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                      children: isPending ? /* @__PURE__ */ jsxs11(Fragment4, { children: [
                        /* @__PURE__ */ jsxs11("svg", { className: "motion-safe:animate-spin h-4 w-4", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                          /* @__PURE__ */ jsx12("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                          /* @__PURE__ */ jsx12("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                        ] }),
                        t("submitting", locale)
                      ] }) : t("submit_application", locale)
                    }
                  )
                ] }) }),
                !formState.success && /* @__PURE__ */ jsx12("div", { className: "p-3 bg-gray-50 border-t border-gray-100 text-center", children: /* @__PURE__ */ jsx12("p", { className: "text-xs text-gray-500", children: t("cv_stored_securely", locale) }) })
              ]
            }
          )
        }
      ),
      document.body
    )
  ] });
}

// src/components/apply-button.tsx
import { jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
function ApplyButton({ locale, glowEffect = false, onClick, href, className = "" }) {
  const baseClass = `flex items-center justify-center w-full gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl ${glowEffect ? "animated-border-glow" : ""} ${className}`;
  if (href) {
    return /* @__PURE__ */ jsxs12("a", { href, target: "_blank", rel: "noopener noreferrer", className: baseClass, children: [
      t("submit_cv", locale),
      /* @__PURE__ */ jsx13("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx13("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
    ] });
  }
  return /* @__PURE__ */ jsx13("button", { onClick, className: baseClass, children: t("submit_cv", locale) });
}

// src/components/empty-state.tsx
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
function EmptyState({ locale, title, message, ctaText, ctaHref }) {
  return /* @__PURE__ */ jsx14("div", { className: "flex flex-col items-center justify-center py-16 px-6 text-center", children: /* @__PURE__ */ jsxs13("div", { className: "w-full max-w-md rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-b from-gray-50 to-white p-10", children: [
    /* @__PURE__ */ jsx14("div", { className: "mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx14("svg", { className: "w-8 h-8 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx14("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
    /* @__PURE__ */ jsx14("h3", { className: "text-lg font-semibold text-gray-800 mb-2", children: title || t("no_jobs_title", locale) }),
    /* @__PURE__ */ jsx14("p", { className: "text-sm text-gray-500 mb-6", children: message || t("no_jobs_message", locale) }),
    ctaHref && /* @__PURE__ */ jsxs13(
      "a",
      {
        href: ctaHref,
        className: "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-colors",
        children: [
          ctaText || t("send_cv_cta", locale),
          /* @__PURE__ */ jsx14("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx14("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
        ]
      }
    )
  ] }) });
}

// src/components/job-list-skeleton.tsx
import { jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
function JobListSkeleton({ count = 6, columns = 3 }) {
  const gridClass = columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  return /* @__PURE__ */ jsx15("div", { className: gridClass, children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxs14(
    "div",
    {
      className: "h-[260px] rounded-xl border border-gray-200 bg-white p-5 animate-pulse",
      children: [
        /* @__PURE__ */ jsxs14("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx15("div", { className: "h-5 w-20 bg-gray-200 rounded-full" }),
          /* @__PURE__ */ jsx15("div", { className: "h-4 w-14 bg-gray-100 rounded-full ml-auto" })
        ] }),
        /* @__PURE__ */ jsx15("div", { className: "h-6 w-3/4 bg-gray-200 rounded mb-2" }),
        /* @__PURE__ */ jsx15("div", { className: "h-4 w-1/2 bg-gray-100 rounded mb-3" }),
        /* @__PURE__ */ jsxs14("div", { className: "space-y-2 mb-4", children: [
          /* @__PURE__ */ jsx15("div", { className: "h-3 w-full bg-gray-100 rounded" }),
          /* @__PURE__ */ jsx15("div", { className: "h-3 w-5/6 bg-gray-100 rounded" }),
          /* @__PURE__ */ jsx15("div", { className: "h-3 w-2/3 bg-gray-100 rounded" })
        ] }),
        /* @__PURE__ */ jsxs14("div", { className: "flex items-center justify-between pt-3 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx15("div", { className: "h-4 w-24 bg-gray-200 rounded" }),
          /* @__PURE__ */ jsx15("div", { className: "h-7 w-20 bg-gray-100 rounded-full" })
        ] })
      ]
    },
    i
  )) });
}

// src/components/job-detail-header.tsx
import { formatDistanceToNow } from "date-fns";
import { es as esLocale } from "date-fns/locale";
import { Fragment as Fragment5, jsx as jsx16, jsxs as jsxs15 } from "react/jsx-runtime";
function capitalizeCounty2(county) {
  if (!county) return "";
  return county.split(/[\s-]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function formatCounty3(county) {
  if (!county) return "";
  const cap = capitalizeCounty2(county);
  if (cap.startsWith("Co.")) return cap;
  return `Co. ${cap}`;
}
function getContractBadge2(contractType, contractDuration, locale = "en") {
  if (!contractType) return null;
  if (contractType === "permanent") {
    return locale === "es" ? "Permanente" : "Permanent";
  }
  const typeLabel = contractType === "locum" ? "Locum" : contractType === "maternity" ? locale === "es" ? "Cobertura" : "Maternity" : locale === "es" ? "Temporal" : "Fixed Term";
  if (contractDuration) {
    const months = parseInt(contractDuration, 10);
    if (!isNaN(months) && months > 0) {
      const unit = locale === "es" ? months === 1 ? "mes" : "meses" : months === 1 ? "month" : "months";
      return `${typeLabel}: ${months} ${unit}`;
    }
  }
  return typeLabel;
}
function JobDetailHeader({ job, locale }) {
  const isConsultant = job.category === "consultant" || job.category === "registrar-sho";
  const parsed = isConsultant ? parseConsultantTitle(job.title) : null;
  const categoryLabel = getCategoryLabel(job.category, locale);
  const specialty = parsed?.specialty || null;
  const county = job.county ? formatCounty3(job.county) : null;
  const contractBadge = getContractBadge2(job.contractType, job.contractDuration, locale);
  const publishedLabel = locale === "es" ? "Publicado" : "Published";
  const timeAgo = job.publishedAt ? formatDistanceToNow(new Date(job.publishedAt), {
    addSuffix: true,
    locale: locale === "es" ? esLocale : void 0
  }) : null;
  return /* @__PURE__ */ jsx16("div", { className: "rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50/50 border border-gray-200/80 shadow-sm p-6 md:p-8", children: /* @__PURE__ */ jsxs15("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-2 flex-wrap", children: [
      contractBadge && /* @__PURE__ */ jsx16(JobPill, { icon: /* @__PURE__ */ jsx16(CalendarIcon, { className: "w-3.5 h-3.5" }), size: "md", children: contractBadge }),
      county && /* @__PURE__ */ jsx16(JobPill, { icon: /* @__PURE__ */ jsx16(LocationIcon, { className: "w-3.5 h-3.5" }), size: "md", children: county })
    ] }),
    /* @__PURE__ */ jsx16("h1", { className: "text-2xl md:text-3xl font-bold text-primary tracking-tight leading-tight", children: isConsultant && specialty ? /* @__PURE__ */ jsxs15(Fragment5, { children: [
      /* @__PURE__ */ jsx16("span", { children: categoryLabel }),
      " ",
      /* @__PURE__ */ jsx16("span", { className: "specialty-shimmer", children: specialty })
    ] }) : job.title }),
    timeAgo && /* @__PURE__ */ jsxs15("p", { className: "text-sm text-gray-400", children: [
      publishedLabel,
      " ",
      timeAgo
    ] })
  ] }) });
}

// src/components/job-detail-description.tsx
import { jsx as jsx17, jsxs as jsxs16 } from "react/jsx-runtime";
function JobDetailDescription({
  job,
  locale,
  renderRichText
}) {
  const descriptionLabel = locale === "es" ? "Descripci\xF3n" : "Description";
  const requirementsLabel = locale === "es" ? "Requisitos" : "Requirements";
  return /* @__PURE__ */ jsxs16("div", { className: "space-y-8", children: [
    (job.descriptionHtml || job.description) && /* @__PURE__ */ jsxs16("section", { children: [
      /* @__PURE__ */ jsx17("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: descriptionLabel }),
      job.descriptionHtml ? /* @__PURE__ */ jsx17(
        "div",
        {
          className: "prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-primary",
          dangerouslySetInnerHTML: { __html: job.descriptionHtml }
        }
      ) : job.description && renderRichText ? /* @__PURE__ */ jsx17("div", { className: "prose prose-gray max-w-none", children: renderRichText(job.description) }) : null
    ] }),
    job.requirements && /* @__PURE__ */ jsxs16("section", { children: [
      /* @__PURE__ */ jsx17("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: requirementsLabel }),
      /* @__PURE__ */ jsx17(
        "div",
        {
          className: "prose prose-gray max-w-none prose-li:text-gray-600",
          dangerouslySetInnerHTML: { __html: job.requirements }
        }
      )
    ] })
  ] });
}

// src/components/job-detail-sidebar.tsx
import { jsx as jsx18, jsxs as jsxs17 } from "react/jsx-runtime";
function JobDetailSidebar({
  job,
  locale,
  source,
  crmApiUrl,
  privacyPolicyUrl,
  glowEffect = false
}) {
  const salaryText = formatSalary(job.salary, locale);
  const closingInfo = job.closingDate ? getClosingDateInfo(job.closingDate, locale) : null;
  const salaryLabel = locale === "es" ? "Salario" : "Salary";
  const locationLabel = locale === "es" ? "Ubicaci\xF3n" : "Location";
  const contractLabel = locale === "es" ? "Contrato" : "Contract";
  const closingLabel = locale === "es" ? "Fecha de cierre" : "Closing date";
  const durationLabel = locale === "es" ? "Duraci\xF3n" : "Duration";
  const specialtiesLabel = locale === "es" ? "Especialidades" : "Specialties";
  const hospitalLabel = locale === "es" ? "Hospital" : "Hospital";
  return /* @__PURE__ */ jsxs17("div", { className: "sticky top-6 space-y-6", children: [
    /* @__PURE__ */ jsx18("div", { className: `bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-4 ${glowEffect ? "animated-border-glow" : ""}`, children: /* @__PURE__ */ jsx18(
      ApplyModal,
      {
        crmVacancyId: job.crmVacancyId || "",
        jobTitle: job.title,
        locale,
        source,
        crmApiUrl,
        privacyPolicyUrl,
        glowEffect: false,
        externalLink: job.externalLink || void 0
      }
    ) }),
    /* @__PURE__ */ jsxs17("div", { className: "bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4", children: [
      salaryText && /* @__PURE__ */ jsx18(DetailRow, { label: salaryLabel, value: salaryText, highlight: true }),
      job.county && /* @__PURE__ */ jsx18(DetailRow, { label: locationLabel, value: formatCounty(job.county) }),
      job.contractType && /* @__PURE__ */ jsx18(DetailRow, { label: contractLabel, value: getContractLabel2(job.contractType, locale) }),
      job.contractDuration && /* @__PURE__ */ jsx18(DetailRow, { label: durationLabel, value: formatDuration(job.contractDuration, locale) }),
      closingInfo && /* @__PURE__ */ jsx18(DetailRow, { label: closingLabel, value: closingInfo.text }),
      job.specialties && job.specialties.length > 0 && /* @__PURE__ */ jsxs17("div", { className: "pt-3 border-t border-gray-100", children: [
        /* @__PURE__ */ jsx18("dt", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: specialtiesLabel }),
        /* @__PURE__ */ jsx18("dd", { className: "flex flex-wrap gap-1.5", children: job.specialties.map((s) => /* @__PURE__ */ jsx18("span", { className: "px-2 py-0.5 text-xs bg-violet-50 text-violet-700 rounded-full", children: s }, s)) })
      ] }),
      job.hospitals && job.hospitals.length > 0 && /* @__PURE__ */ jsxs17("div", { className: "pt-3 border-t border-gray-100", children: [
        /* @__PURE__ */ jsx18("dt", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: hospitalLabel }),
        /* @__PURE__ */ jsx18("dd", { className: "text-sm text-gray-700", children: job.hospitals.join(", ") })
      ] })
    ] })
  ] });
}
function DetailRow({ label, value, highlight = false }) {
  return /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between pt-3 first:pt-0 border-t border-gray-100 first:border-t-0", children: [
    /* @__PURE__ */ jsx18("dt", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide", children: label }),
    /* @__PURE__ */ jsx18("dd", { className: `text-sm font-semibold ${highlight ? "text-primary" : "text-gray-900"} tabular-nums`, children: value })
  ] });
}
export {
  ApplyButton,
  ApplyModal,
  CATEGORY_BADGE_COLORS,
  CATEGORY_COLORS,
  CONTRACT_COLORS,
  CONTRACT_DURATIONS,
  CONTRACT_TYPES,
  CONTRACT_TYPE_TO_DURATION,
  CalendarIcon,
  ClosingBadge,
  DEFAULT_FILTERS,
  EmptyState,
  FilterChips,
  FilterDropdown,
  IRISH_COUNTIES,
  JOB_CATEGORIES,
  JobCard,
  JobCardGrid,
  JobDetailDescription,
  JobDetailHeader,
  JobDetailSidebar,
  JobFiltersBar,
  JobListSkeleton,
  JobPill,
  LocationIcon,
  MEDICAL_SPECIALTIES,
  MobileFilterSheet,
  PastJobCard,
  PastOffersSection,
  SORT_OPTIONS,
  SortDropdown,
  filterAndSortJobs,
  filterJobs,
  formatCounty,
  formatDuration,
  formatSalary,
  formatSpecialty,
  getCategoryLabel,
  getClosedDate,
  getClosingDateInfo,
  getContractLabel as getContractDurationLabel,
  getContractLabel2 as getContractLabel,
  getSortLabel,
  parseConsultantTitle,
  sortJobs,
  t,
  truncateSummary
};
//# sourceMappingURL=index.js.map