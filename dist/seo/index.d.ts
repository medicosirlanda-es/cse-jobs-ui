import { e as Job, L as Locale, J as JobCategory } from '../types-LSLj__Vv.js';

interface JobPostingSchemaOptions {
    siteUrl: string;
    jobUrl: string;
    organizationName: string;
    organizationUrl: string;
    organizationLogo?: string;
    locale: Locale;
}
declare function generateJobPostingSchema(job: Job, options: JobPostingSchemaOptions): Record<string, unknown>;
declare function generateItemListSchema(jobs: {
    title: string;
    url: string;
}[]): {
    '@context': string;
    '@type': string;
    itemListElement: {
        '@type': string;
        position: number;
        name: string;
        url: string;
    }[];
};

interface MetadataOptions {
    siteUrl: string;
    siteName: string;
    locale: Locale;
}
declare function generateJobMetadata(job: Job, options: MetadataOptions): {
    title: string;
    description: string;
    openGraph: {
        title: string;
        description: string;
        type: string;
        siteName: string;
    };
    alternates: {
        canonical: string;
    };
};
declare function generateListMetadata(options: MetadataOptions & {
    category?: JobCategory;
}): {
    title: string;
    description: string;
    openGraph: {
        title: string;
        description: string;
        type: string;
        siteName: string;
    };
};

export { generateItemListSchema, generateJobMetadata, generateJobPostingSchema, generateListMetadata };
