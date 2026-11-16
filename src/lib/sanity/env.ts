/** Sanity connection settings. The project ID and dataset are public values. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || null;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-10-01";
export const isSanityConfigured = Boolean(projectId);
