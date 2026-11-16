import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { homePage } from "./homePage";
import { project } from "./project";
import { review } from "./review";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  aboutPage,
  service,
  project,
  review,
];

/** Single-document types: one fixed document each, no create/delete. */
export const SINGLETONS = ["siteSettings", "homePage", "aboutPage"] as const;
