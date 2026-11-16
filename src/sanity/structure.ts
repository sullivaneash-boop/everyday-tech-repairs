import type { StructureResolver } from "sanity/structure";
import { aboutPage } from "./schemaTypes/aboutPage";
import { homePage } from "./schemaTypes/homePage";
import { siteSettings } from "./schemaTypes/siteSettings";

/** Friendly left-hand menu for the owner: pages first, then lists of content. */
export const structure: StructureResolver = (S) => {
  const singleton = (type: { name: string; title?: string; icon?: unknown }) =>
    S.listItem()
      .title(type.title ?? type.name)
      .icon(type.icon as never)
      .child(S.document().schemaType(type.name).documentId(type.name).title(type.title ?? type.name));

  return S.list()
    .title("Website Content")
    .items([
      singleton(siteSettings),
      S.divider(),
      singleton(homePage),
      singleton(aboutPage),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("project").title("Completed Work"),
      S.documentTypeListItem("review").title("Customer Reviews"),
    ]);
};
