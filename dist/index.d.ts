import { J as JobCategory, L as Locale, C as ContractType, a as ContractDuration, S as SortOption, b as Salary, c as JobListItem, d as SiteSlug, e as Job } from './types-LSLj__Vv.js';
export { f as JobCounts, g as JobsApiConfig, h as SalaryType } from './types-LSLj__Vv.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

declare const JOB_CATEGORIES: readonly [{
    readonly value: "gp-permanent";
    readonly en: "GP Permanent";
    readonly es: "GP Permanente";
}, {
    readonly value: "gp-locum";
    readonly en: "GP Locum";
    readonly es: "GP Locum";
}, {
    readonly value: "consultant";
    readonly en: "Consultant";
    readonly es: "Consultant";
}, {
    readonly value: "registrar-sho";
    readonly en: "Registrar & SHO";
    readonly es: "Hospital / NCHD";
}, {
    readonly value: "other";
    readonly en: "Other Roles";
    readonly es: "Otros";
}];
declare function getCategoryLabel(category: JobCategory, locale: Locale): string;
declare const CATEGORY_COLORS: Record<JobCategory, {
    bg: string;
    text: string;
    glow: string;
}>;
declare const CATEGORY_BADGE_COLORS: Record<JobCategory, string>;

declare const IRISH_COUNTIES: readonly ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Kerry", "Mayo", "Sligo", "Donegal", "Louth", "Meath", "Kildare", "Wicklow", "Wexford", "Kilkenny", "Tipperary", "Clare", "Roscommon", "Leitrim", "Longford", "Westmeath", "Offaly", "Laois", "Carlow", "Cavan", "Monaghan"];
type IrishCounty = (typeof IRISH_COUNTIES)[number];

declare const MEDICAL_SPECIALTIES: readonly [{
    readonly value: "anaesthesiology";
    readonly en: "Anaesthesiology";
    readonly es: "Anestesiología";
}, {
    readonly value: "cardiology";
    readonly en: "Cardiology";
    readonly es: "Cardiología";
}, {
    readonly value: "chemical-pathology";
    readonly en: "Chemical Pathology";
    readonly es: "Patología Química";
}, {
    readonly value: "clinical-genetics";
    readonly en: "Clinical Genetics";
    readonly es: "Genética Clínica";
}, {
    readonly value: "clinical-pharmacology";
    readonly en: "Clinical Pharmacology";
    readonly es: "Farmacología Clínica";
}, {
    readonly value: "dermatology";
    readonly en: "Dermatology";
    readonly es: "Dermatología";
}, {
    readonly value: "emergency-medicine";
    readonly en: "Emergency Medicine";
    readonly es: "Medicina de Urgencias";
}, {
    readonly value: "endocrinology";
    readonly en: "Endocrinology";
    readonly es: "Endocrinología";
}, {
    readonly value: "gastroenterology";
    readonly en: "Gastroenterology";
    readonly es: "Gastroenterología";
}, {
    readonly value: "general-internal-medicine";
    readonly en: "General Internal Medicine";
    readonly es: "Medicina Interna General";
}, {
    readonly value: "general-practice";
    readonly en: "General Practice";
    readonly es: "Medicina General";
}, {
    readonly value: "general-surgery";
    readonly en: "General Surgery";
    readonly es: "Cirugía General";
}, {
    readonly value: "genito-urinary-medicine";
    readonly en: "Genito-Urinary Medicine";
    readonly es: "Medicina Genitourinaria";
}, {
    readonly value: "geriatric-medicine";
    readonly en: "Geriatric Medicine";
    readonly es: "Geriatría";
}, {
    readonly value: "haematology";
    readonly en: "Haematology";
    readonly es: "Hematología";
}, {
    readonly value: "histopathology";
    readonly en: "Histopathology";
    readonly es: "Histopatología";
}, {
    readonly value: "immunology";
    readonly en: "Immunology";
    readonly es: "Inmunología";
}, {
    readonly value: "infectious-diseases";
    readonly en: "Infectious Diseases";
    readonly es: "Enfermedades Infecciosas";
}, {
    readonly value: "internal-medicine";
    readonly en: "Internal Medicine";
    readonly es: "Medicina Interna";
}, {
    readonly value: "medical-oncology";
    readonly en: "Medical Oncology";
    readonly es: "Oncología Médica";
}, {
    readonly value: "microbiology";
    readonly en: "Microbiology";
    readonly es: "Microbiología";
}, {
    readonly value: "neonatology";
    readonly en: "Neonatology";
    readonly es: "Neonatología";
}, {
    readonly value: "nephrology";
    readonly en: "Nephrology";
    readonly es: "Nefrología";
}, {
    readonly value: "neurology";
    readonly en: "Neurology";
    readonly es: "Neurología";
}, {
    readonly value: "neuropathology";
    readonly en: "Neuropathology";
    readonly es: "Neuropatología";
}, {
    readonly value: "neurosurgery";
    readonly en: "Neurosurgery";
    readonly es: "Neurocirugía";
}, {
    readonly value: "obstetrics-gynaecology";
    readonly en: "Obstetrics & Gynaecology";
    readonly es: "Obstetricia y Ginecología";
}, {
    readonly value: "occupational-medicine";
    readonly en: "Occupational Medicine";
    readonly es: "Medicina del Trabajo";
}, {
    readonly value: "oncology";
    readonly en: "Oncology";
    readonly es: "Oncología";
}, {
    readonly value: "ophthalmology";
    readonly en: "Ophthalmology";
    readonly es: "Oftalmología";
}, {
    readonly value: "oral-maxillofacial-surgery";
    readonly en: "Oral & Maxillofacial Surgery";
    readonly es: "Cirugía Oral y Maxilofacial";
}, {
    readonly value: "orthopaedics";
    readonly en: "Orthopaedics";
    readonly es: "Traumatología";
}, {
    readonly value: "otolaryngology";
    readonly en: "Otolaryngology (ENT)";
    readonly es: "Otorrinolaringología";
}, {
    readonly value: "paediatric-surgery";
    readonly en: "Paediatric Surgery";
    readonly es: "Cirugía Pediátrica";
}, {
    readonly value: "paediatrics";
    readonly en: "Paediatrics";
    readonly es: "Pediatría";
}, {
    readonly value: "palliative-medicine";
    readonly en: "Palliative Medicine";
    readonly es: "Medicina Paliativa";
}, {
    readonly value: "pathology";
    readonly en: "Pathology";
    readonly es: "Patología";
}, {
    readonly value: "pharmaceutical-medicine";
    readonly en: "Pharmaceutical Medicine";
    readonly es: "Medicina Farmacéutica";
}, {
    readonly value: "plastic-surgery";
    readonly en: "Plastic Surgery";
    readonly es: "Cirugía Plástica";
}, {
    readonly value: "psychiatry";
    readonly en: "Psychiatry";
    readonly es: "Psiquiatría";
}, {
    readonly value: "public-health-medicine";
    readonly en: "Public Health Medicine";
    readonly es: "Salud Pública";
}, {
    readonly value: "radiation-oncology";
    readonly en: "Radiation Oncology";
    readonly es: "Oncología Radioterápica";
}, {
    readonly value: "radiology";
    readonly en: "Radiology";
    readonly es: "Radiología";
}, {
    readonly value: "rehabilitation-medicine";
    readonly en: "Rehabilitation Medicine";
    readonly es: "Medicina de Rehabilitación";
}, {
    readonly value: "respiratory-medicine";
    readonly en: "Respiratory Medicine";
    readonly es: "Neumología";
}, {
    readonly value: "rheumatology";
    readonly en: "Rheumatology";
    readonly es: "Reumatología";
}, {
    readonly value: "sports-exercise-medicine";
    readonly en: "Sports & Exercise Medicine";
    readonly es: "Medicina Deportiva";
}, {
    readonly value: "tropical-medicine";
    readonly en: "Tropical Medicine";
    readonly es: "Medicina Tropical";
}, {
    readonly value: "urology";
    readonly en: "Urology";
    readonly es: "Urología";
}, {
    readonly value: "vascular-surgery";
    readonly en: "Vascular Surgery";
    readonly es: "Cirugía Vascular";
}];
type MedicalSpecialty = (typeof MEDICAL_SPECIALTIES)[number]['value'];

declare const CONTRACT_TYPES: readonly [{
    readonly value: "permanent";
    readonly en: "Permanent";
    readonly es: "Permanente";
}, {
    readonly value: "fixed-term";
    readonly en: "Fixed Term";
    readonly es: "Temporal";
}, {
    readonly value: "locum";
    readonly en: "Locum";
    readonly es: "Locum";
}, {
    readonly value: "maternity";
    readonly en: "Maternity Cover";
    readonly es: "Cobertura";
}];
declare const CONTRACT_DURATIONS: readonly [{
    readonly value: "permanent";
    readonly en: "Permanent";
    readonly es: "Permanente";
}, {
    readonly value: "temporal";
    readonly en: "Temporary";
    readonly es: "Temporal";
}];
declare const CONTRACT_TYPE_TO_DURATION: Record<ContractType, ContractDuration>;
declare const CONTRACT_COLORS: Record<ContractType, string>;
declare function getContractLabel$1(type: ContractType, locale: Locale): string;

declare const SORT_OPTIONS: readonly [{
    readonly value: "newest";
    readonly en: "Newest";
    readonly es: "Más recientes";
}, {
    readonly value: "closing";
    readonly en: "Closing soon";
    readonly es: "Cierre próximo";
}];
declare function getSortLabel(sort: SortOption, locale: Locale): string;

declare function formatSalary(salary?: Salary | null, locale?: Locale): string | null;
declare function formatCounty(county: string): string;
declare function formatSpecialty(slug: string): string;
declare function formatDuration(duration: string, locale?: Locale): string;
declare function getContractLabel(type: ContractType, locale: Locale): string;
interface ParsedConsultantTitle {
    specialty: string;
    county: string | null;
    term: string | null;
    displayTitle: string;
}
declare function parseConsultantTitle(title: string): ParsedConsultantTitle;
declare function truncateSummary(text: string, maxLength?: number): string;

interface ClosingDateInfo {
    text: string;
    daysLeft: number;
    urgent: boolean;
    color: 'red' | 'amber' | 'emerald' | 'gray';
    pulse: boolean;
}
declare function getClosingDateInfo(closingDate?: string | null, locale?: Locale): ClosingDateInfo | null;
declare function getClosedDate(closingDate?: string | null, locale?: Locale): string | null;

interface JobFiltersState {
    categories: string[];
    specialties: string[];
    counties: string[];
    duration: ContractDuration[];
    sort: SortOption;
}
declare const DEFAULT_FILTERS: JobFiltersState;
declare function filterJobs(jobs: JobListItem[], filters: Partial<JobFiltersState>): JobListItem[];
declare function sortJobs(jobs: JobListItem[], sortOption: SortOption): JobListItem[];
declare function filterAndSortJobs(jobs: JobListItem[], filters: Partial<JobFiltersState>): JobListItem[];

declare function t(key: string, locale: Locale): string;

interface JobCardProps {
    job: JobListItem;
    locale: Locale;
    href: string;
    index?: number;
    variant?: 'default' | 'magic';
    renderWrapper?: (props: {
        children: ReactNode;
        job: JobListItem;
        index: number;
    }) => ReactNode;
}
declare function JobCard({ job, locale, href, index, variant, renderWrapper, }: JobCardProps): react_jsx_runtime.JSX.Element;

interface JobCardGridProps {
    jobs: JobListItem[];
    locale: Locale;
    getHref: (job: JobListItem) => string;
    variant?: JobCardProps['variant'];
    renderWrapper?: JobCardProps['renderWrapper'];
    columns?: 2 | 3;
}
declare function JobCardGrid({ jobs, locale, getHref, variant, renderWrapper, columns, }: JobCardGridProps): react_jsx_runtime.JSX.Element;

interface PastJobCardProps {
    job: JobListItem;
    locale: Locale;
    href: string;
}
declare function PastJobCard({ job, locale, href }: PastJobCardProps): react_jsx_runtime.JSX.Element;

interface PastOffersSectionProps {
    count: number;
    locale: Locale;
    children: ReactNode;
}
declare function PastOffersSection({ count, locale, children }: PastOffersSectionProps): react_jsx_runtime.JSX.Element | null;

interface ClosingBadgeProps {
    closingDate?: string | null;
    locale?: Locale;
}
declare function ClosingBadge({ closingDate, locale }: ClosingBadgeProps): react_jsx_runtime.JSX.Element | null;

interface JobFiltersBarProps {
    mode: 'main' | 'consultant';
    locale: Locale;
}
declare function JobFiltersBar({ mode, locale }: JobFiltersBarProps): react_jsx_runtime.JSX.Element;

interface FilterOption$1 {
    value: string;
    label: string;
}
interface FilterDropdownProps {
    label: string;
    options: readonly FilterOption$1[] | FilterOption$1[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    searchable?: boolean;
    searchPlaceholder?: string;
    className?: string;
    widePanel?: boolean;
    locale?: Locale;
}
declare function FilterDropdown({ label, options, selectedValues, onChange, searchable, searchPlaceholder, className, widePanel, locale, }: FilterDropdownProps): react_jsx_runtime.JSX.Element;

interface FilterChipsProps {
    chips: Array<{
        key: string;
        label: string;
        onRemove: () => void;
    }>;
    onClearAll: () => void;
    locale: Locale;
    maxVisible?: number;
}
declare function FilterChips({ chips, onClearAll, locale, maxVisible, }: FilterChipsProps): react_jsx_runtime.JSX.Element | null;

interface SortDropdownProps {
    value: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange: (value: string) => void;
    locale?: Locale;
}
declare function SortDropdown({ value, options, onChange, locale }: SortDropdownProps): react_jsx_runtime.JSX.Element;

interface FilterOption {
    value: string;
    label: string;
}
interface MobileFilterSheetProps {
    isOpen: boolean;
    onClose: () => void;
    locale: Locale;
    counties: string[];
    duration: string[];
    sort: SortOption;
    categories?: string[];
    specialties?: string[];
    onApply: (filters: {
        counties: string[];
        duration: string[];
        sort: SortOption;
        categories?: string[];
        specialties?: string[];
    }) => void;
    filterMode: 'categories' | 'specialties';
    categoryOptions?: readonly FilterOption[];
    specialtyOptions?: readonly FilterOption[];
    durationOptions?: readonly FilterOption[];
    sortOptions?: readonly FilterOption[];
}
declare function MobileFilterSheet({ isOpen, onClose, locale, counties, duration, sort, categories, specialties, onApply, filterMode, categoryOptions, specialtyOptions, durationOptions, sortOptions, }: MobileFilterSheetProps): react_jsx_runtime.JSX.Element | null;

interface ApplyModalProps {
    crmVacancyId: string;
    jobTitle: string;
    locale: Locale;
    source: SiteSlug;
    crmApiUrl: string;
    privacyPolicyUrl: string;
    glowEffect?: boolean;
    externalLink?: string;
    onApplicationSubmitted?: (applicationId: string) => void;
}
declare function ApplyModal({ crmVacancyId, jobTitle, locale, source, crmApiUrl, privacyPolicyUrl, glowEffect, externalLink, onApplicationSubmitted, }: ApplyModalProps): react_jsx_runtime.JSX.Element;

interface ApplyButtonProps {
    locale: Locale;
    glowEffect?: boolean;
    onClick?: () => void;
    href?: string;
    className?: string;
}
declare function ApplyButton({ locale, glowEffect, onClick, href, className }: ApplyButtonProps): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    locale: Locale;
    title?: string;
    message?: string;
    ctaText?: string;
    ctaHref?: string;
}
declare function EmptyState({ locale, title, message, ctaText, ctaHref }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface JobListSkeletonProps {
    count?: number;
    columns?: 2 | 3;
}
declare function JobListSkeleton({ count, columns }: JobListSkeletonProps): react_jsx_runtime.JSX.Element;

interface JobDetailHeaderProps {
    job: Job;
    locale: Locale;
}
declare function JobDetailHeader({ job, locale }: JobDetailHeaderProps): react_jsx_runtime.JSX.Element;

interface JobDetailDescriptionProps {
    job: Job;
    locale: Locale;
    renderRichText?: (content: unknown) => React.ReactNode;
}
declare function JobDetailDescription({ job, locale, renderRichText, }: JobDetailDescriptionProps): react_jsx_runtime.JSX.Element;

interface JobDetailSidebarProps {
    job: Job;
    locale: Locale;
    source: SiteSlug;
    crmApiUrl: string;
    privacyPolicyUrl: string;
    glowEffect?: boolean;
}
declare function JobDetailSidebar({ job, locale, source, crmApiUrl, privacyPolicyUrl, glowEffect, }: JobDetailSidebarProps): react_jsx_runtime.JSX.Element;

export { ApplyButton, ApplyModal, CATEGORY_BADGE_COLORS, CATEGORY_COLORS, CONTRACT_COLORS, CONTRACT_DURATIONS, CONTRACT_TYPES, CONTRACT_TYPE_TO_DURATION, ClosingBadge, type ClosingDateInfo, ContractDuration, ContractType, DEFAULT_FILTERS, EmptyState, FilterChips, FilterDropdown, type FilterOption$1 as FilterOption, IRISH_COUNTIES, type IrishCounty, JOB_CATEGORIES, Job, JobCard, JobCardGrid, type JobCardProps, JobCategory, JobDetailDescription, JobDetailHeader, JobDetailSidebar, JobFiltersBar, type JobFiltersState, JobListItem, JobListSkeleton, Locale, MEDICAL_SPECIALTIES, type MedicalSpecialty, MobileFilterSheet, PastJobCard, PastOffersSection, SORT_OPTIONS, Salary, SiteSlug, SortDropdown, SortOption, filterAndSortJobs, filterJobs, formatCounty, formatDuration, formatSalary, formatSpecialty, getCategoryLabel, getClosedDate, getClosingDateInfo, getContractLabel$1 as getContractDurationLabel, getContractLabel, getSortLabel, parseConsultantTitle, sortJobs, t, truncateSummary };
