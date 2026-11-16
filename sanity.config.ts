"use client";

/**
 * Sanity Studio configuration. The Studio is embedded in the site at /studio.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/lib/sanity/env";
import { schemaTypes, SINGLETONS } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const singletonTypes = new Set<string>(SINGLETONS);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "everyday-tech-repair",
  title: "Everyday Tech Repair",
  basePath: "/studio",
  projectId: projectId ?? "missing",
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the global "+" menu.
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    // Singletons can be published but not deleted or duplicated.
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter((a) => a.action && singletonActions.has(a.action))
        : actions,
  },
});
