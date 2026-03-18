'use client';
import "../chunk-7QHK2FRA.js";

// src/data/payload-client.ts
function toJobListItem(p) {
  const hospitals = Array.isArray(p.hospitals) ? p.hospitals.map((h) => typeof h === "string" ? h : h.name) : void 0;
  let summary = p.descriptionSummary || void 0;
  if (!summary && p.descriptionHtmlPublic) {
    summary = p.descriptionHtmlPublic.replace(/<[^>]*>/g, "").substring(0, 300);
  }
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    county: p.county || "",
    contractType: p.contractType || null,
    salary: p.salary ? {
      min: p.salary.min,
      max: p.salary.max,
      type: p.salary.type
    } : null,
    closingDate: p.closingDate || null,
    publishedAt: p.publishedAt || null,
    descriptionSummary: summary || null,
    specialties: p.specialties || null,
    hospitals: hospitals || null,
    crmVacancyId: p.crmVacancyId || null,
    externalLink: p.externalLink || null
  };
}
function toJob(p) {
  const item = toJobListItem(p);
  return {
    ...item,
    description: typeof p.description === "string" ? p.description : null,
    descriptionHtml: p.descriptionHtmlPublic || null,
    requirements: p.requirements || null,
    startDate: p.startDate || null,
    contractDuration: p.contractDuration || null,
    sessionsPerWeek: p.sessionsPerWeek ?? null,
    imcDivisionRequired: p.imcDivisionRequired || null,
    source: p.source || null,
    sites: p.sites || []
  };
}
async function payloadFetch(config, collection, params = {}) {
  const url = new URL(`/api/${collection}`, config.payloadUrl);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  if (config.locale) {
    url.searchParams.set("locale", config.locale);
  }
  const headers = {
    "Content-Type": "application/json"
  };
  if (config.apiKey) {
    headers["Authorization"] = `users API-Key ${config.apiKey}`;
  }
  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: config.revalidate ?? 60 }
  });
  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
function buildJobsWhere(siteSlug, category, status = "active") {
  const conditions = [
    { "sites.slug": { contains: siteSlug } }
  ];
  if (status === "active") {
    conditions.push({ jobStatus: { equals: "active" } });
  } else {
    conditions.push({
      or: [
        { jobStatus: { equals: "closed" } },
        { jobStatus: { equals: "filled" } },
        { jobStatus: { equals: "expired" } }
      ]
    });
    conditions.push({ displayOnPastOffers: { equals: true } });
    const sixtyDaysAgo = /* @__PURE__ */ new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    conditions.push({ closedAt: { greater_than: sixtyDaysAgo.toISOString() } });
  }
  if (category) {
    conditions.push({ category: { equals: category } });
  }
  return { and: conditions };
}
function createJobsApi(config) {
  const whereToQuery = (where) => {
    return { where: JSON.stringify(where) };
  };
  async function getActiveJobs(category) {
    const where = buildJobsWhere(config.siteSlug, category);
    const result = await payloadFetch(config, "jobs", {
      ...whereToQuery(where),
      sort: "-publishedAt",
      limit: "100",
      depth: "1"
    });
    return result.docs.map(toJobListItem);
  }
  async function getJobBySlug(slug) {
    const where = {
      and: [
        { slug: { equals: slug } },
        { "sites.slug": { contains: config.siteSlug } }
      ]
    };
    const result = await payloadFetch(config, "jobs", {
      where: JSON.stringify(where),
      limit: "1",
      depth: "1"
    });
    return result.docs.length > 0 ? toJob(result.docs[0]) : null;
  }
  async function getPastJobs(limit = 20) {
    const where = buildJobsWhere(config.siteSlug, void 0, "inactive");
    const result = await payloadFetch(config, "jobs", {
      ...whereToQuery(where),
      sort: "-closedAt",
      limit: String(limit),
      depth: "1"
    });
    return result.docs.map(toJobListItem);
  }
  async function getJobCounts() {
    const categories = ["gp-permanent", "gp-locum", "consultant", "registrar-sho", "other"];
    const results = await Promise.all(
      categories.map(async (cat) => {
        const where = buildJobsWhere(config.siteSlug, cat);
        const result = await payloadFetch(config, "jobs", {
          ...whereToQuery(where),
          limit: "0"
        });
        return [cat, result.totalDocs];
      })
    );
    const counts = Object.fromEntries(results);
    const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
    return { ...counts, total };
  }
  async function getSimilarJobs(category, excludeId, limit = 3) {
    const where = {
      and: [
        { "sites.slug": { contains: config.siteSlug } },
        { jobStatus: { equals: "active" } },
        { category: { equals: category } },
        { id: { not_equals: excludeId } }
      ]
    };
    const result = await payloadFetch(config, "jobs", {
      where: JSON.stringify(where),
      sort: "-publishedAt",
      limit: String(limit),
      depth: "1"
    });
    return result.docs.map(toJobListItem);
  }
  return {
    getActiveJobs,
    getJobBySlug,
    getPastJobs,
    getJobCounts,
    getSimilarJobs
  };
}
export {
  buildJobsWhere,
  createJobsApi
};
//# sourceMappingURL=index.js.map