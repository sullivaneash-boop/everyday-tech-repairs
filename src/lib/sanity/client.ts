import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only client for PUBLISHED content. No token is used anywhere on the
 * website: the dataset only ever holds content meant for the public.
 */
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // responses are cached by Next.js (see content.ts), so always read fresh
      perspective: "published",
      timeout: 8_000, // reach the fallback before a slow API stalls rendering
      maxRetries: 0,
    })
  : null;
