import { g as JobsApiConfig, c as JobListItem, e as Job, f as JobCounts } from '../types-LSLj__Vv.js';

declare function buildJobsWhere(siteSlug: string, category?: string, status?: 'active' | 'inactive'): Record<string, unknown>;
declare function createJobsApi(config: JobsApiConfig): {
    getActiveJobs: (category?: string) => Promise<JobListItem[]>;
    getJobBySlug: (slug: string) => Promise<Job | null>;
    getPastJobs: (limit?: number) => Promise<JobListItem[]>;
    getJobCounts: () => Promise<JobCounts>;
    getSimilarJobs: (category: string, excludeId: string, limit?: number) => Promise<JobListItem[]>;
};

export { buildJobsWhere, createJobsApi };
