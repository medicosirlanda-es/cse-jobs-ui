'use client';
import {
  getCategoryLabel
} from "../chunk-WGB7TBXP.js";

// src/seo/job-posting-schema.ts
function generateJobPostingSchema(job, options) {
  const { siteUrl, jobUrl, organizationName, organizationUrl, organizationLogo, locale } = options;
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.descriptionHtml || job.descriptionSummary || "",
    datePosted: job.publishedAt || (/* @__PURE__ */ new Date()).toISOString(),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.county,
        addressCountry: "IE"
      }
    },
    hiringOrganization: {
      "@type": "Organization",
      name: organizationName,
      sameAs: organizationUrl,
      ...organizationLogo ? { logo: organizationLogo } : {}
    },
    url: jobUrl,
    employmentType: mapEmploymentType(job.contractType)
  };
  if (job.closingDate) {
    schema.validThrough = job.closingDate;
  }
  if (job.salary?.min || job.salary?.max) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        ...job.salary.min ? { minValue: job.salary.min } : {},
        ...job.salary.max ? { maxValue: job.salary.max } : {},
        unitText: job.salary.type === "annual" ? "YEAR" : job.salary.type === "hourly" ? "HOUR" : "MONTH"
      }
    };
  }
  return schema;
}
function mapEmploymentType(contractType) {
  switch (contractType) {
    case "permanent":
      return "FULL_TIME";
    case "fixed-term":
      return "CONTRACT";
    case "locum":
      return "TEMPORARY";
    case "maternity":
      return "TEMPORARY";
    default:
      return "FULL_TIME";
  }
}
function generateItemListSchema(jobs) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: jobs.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: job.title,
      url: job.url
    }))
  };
}

// src/seo/metadata.ts
function generateJobMetadata(job, options) {
  const { siteUrl, siteName, locale } = options;
  const description = job.descriptionSummary || job.title;
  const titleSuffix = locale === "es" ? "Ofertas de empleo" : "Healthcare Jobs";
  return {
    title: `${job.title} | ${titleSuffix} | ${siteName}`,
    description: description.substring(0, 160),
    openGraph: {
      title: job.title,
      description: description.substring(0, 200),
      type: "website",
      siteName
    },
    alternates: {
      canonical: `${siteUrl}/jobs/${job.slug}`
    }
  };
}
function generateListMetadata(options) {
  const { siteUrl, siteName, locale, category } = options;
  const title = category ? `${getCategoryLabel(category, locale)} | ${siteName}` : locale === "es" ? `Ofertas de empleo m\xE9dico en Irlanda | ${siteName}` : `Healthcare Jobs in Ireland | ${siteName}`;
  const description = locale === "es" ? `Encuentra ofertas de empleo m\xE9dico en Irlanda. GP, Consultant, Registrar y m\xE1s posiciones disponibles.` : `Find healthcare jobs in Ireland. GP, Consultant, Registrar and more positions available.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName
    }
  };
}
export {
  generateItemListSchema,
  generateJobMetadata,
  generateJobPostingSchema,
  generateListMetadata
};
//# sourceMappingURL=index.js.map