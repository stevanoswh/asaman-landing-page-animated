"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DocNode } from "@/lib/guides"; // sesuaikan path kamu

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}
export function LegalSideNav({
  tree,
  activeSlug,
  basePath = "",
}: {
  tree: DocNode[];
  activeSlug: string;
  basePath?: string;
}) {
  const flat = useMemo(() => flattenForSidebar(tree), [tree]);

  return (
    <aside className="space-y-4">
      <ul className="space-y-4" role="list">
        {flat.map((section) => (
          <li key={section.key} className="space-y-2">
            {section.title ? (
              <div className="text-xs font-semibold text-slate-600">
                {section.title}
              </div>
            ) : null}

            <ul className="space-y-1" role="list">
              {section.items.map((doc) => {
                const href = `${basePath}/${doc.slug}`.replace(/\/+/g, "/");
                const active = doc.slug === activeSlug;

                return (
                  <li key={doc.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-2 py-1 text-[13px] leading-5 transition",
                        active
                          ? "text-sky-700 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:underline"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}


type SidebarDoc = { slug: string; title: string; sort: number };
type SidebarSection = { key: string; title?: string; items: SidebarDoc[] };

function flattenForSidebar(nodes: DocNode[]): SidebarSection[] {
  const sections: SidebarSection[] = [];

  const rootDocs: SidebarDoc[] = [];
  for (const n of nodes) {
    if (n.type === "doc" && n.published) {
      rootDocs.push({ slug: n.slug, title: n.title, sort: n.sort });
    }
  }
  if (rootDocs.length) {
    sections.push({
      key: "root",
      items: rootDocs.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title)),
    });
  }

  for (const n of nodes) {
    if (n.type !== "folder") continue;

    const docs: SidebarDoc[] = collectDocs(n).filter(Boolean) as SidebarDoc[];
    if (!docs.length) continue;

    sections.push({
      key: n.slug,
      title: n.title, // folder title
      items: docs.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title)),
    });
  }

  return sections;
}

function collectDocs(folder: Extract<DocNode, { type: "folder" }>): SidebarDoc[] {
  const out: SidebarDoc[] = [];

  for (const c of folder.children) {
    if (c.type === "doc" && c.published) {
      out.push({ slug: c.slug, title: c.title, sort: c.sort });
    } else if (c.type === "folder") {
      out.push(...collectDocs(c)); // flatten nested folders too
    }
  }

  return out;
}
