type SiteSlug = 'cseconnect' | 'medicosirlanda' | 'doctorstoireland';
type Locale = 'en' | 'es';
type JobCategory = 'gp-permanent' | 'gp-locum' | 'consultant' | 'registrar-sho' | 'other';
type ContractType = 'permanent' | 'fixed-term' | 'locum' | 'maternity';
type SalaryType = 'annual' | 'session' | 'hourly';
type ContractDuration = 'permanent' | 'temporal';
type SortOption = 'newest' | 'closing';
interface Salary {
    min?: number | null;
    max?: number | null;
    type?: SalaryType | null;
}
interface JobListItem {
    id: string;
    title: string;
    slug: string;
    category: JobCategory;
    county: string;
    contractType?: ContractType | null;
    salary?: Salary | null;
    closingDate?: string | null;
    publishedAt?: string | null;
    descriptionSummary?: string | null;
    specialties?: string[] | null;
    hospitals?: string[] | null;
    crmVacancyId?: string | null;
    externalLink?: string | null;
}
interface Job extends JobListItem {
    description?: string | null;
    descriptionHtml?: string | null;
    requirements?: string | null;
    startDate?: string | null;
    contractDuration?: string | null;
    sessionsPerWeek?: number | null;
    imcDivisionRequired?: string | null;
    source?: string | null;
    sites?: {
        slug: string;
    }[];
}
interface JobCounts {
    'gp-permanent': number;
    'gp-locum': number;
    consultant: number;
    'registrar-sho': number;
    other: number;
    total: number;
}
interface JobsApiConfig {
    payloadUrl: string;
    apiKey?: string;
    siteSlug: SiteSlug;
    locale?: Locale;
    revalidate?: number;
}

export type { ContractType as C, JobCategory as J, Locale as L, SortOption as S, ContractDuration as a, Salary as b, JobListItem as c, SiteSlug as d, Job as e, JobCounts as f, JobsApiConfig as g, SalaryType as h };
