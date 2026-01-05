// app/help-guides/_components/side-nav.tsx
import Link from "next/link";
import type { DocNode } from "@/lib/guides";
import Image from "next/image";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

type DocItem = { slug: string; title: string; sort: number };

type Section = {
  key: string;
  title?: string; // folder title
  items: DocItem[];
};

export default function HelpSideNav({
  tree,
  activeSlug,
  basePath,
}: {
  tree: DocNode[];
  activeSlug: string; // "folder/doc" (same as your slug)
  basePath: string; // "/help-guides"
}) {
  const sections = toSections(tree);

  return (
    <aside className="space-y-4">
      <Link href="/" className="flex items-center gap-3">
          <Image
            src="/asaman-logo-for-white.png"
            alt="Asaman"
            width={115}
            height={49}
            priority
          />
      </Link>
      <ul className="space-y-4" role="list">
        {sections.map((sec) => (
          <li key={sec.key} className="space-y-2">
            {sec.title ? (
              <div className="text-xs font-semibold text-slate-600">
                {sec.title}
              </div>
            ) : null}

            <ul className="space-y-1" role="list">
              {sec.items.map((doc) => {
                const href = `${basePath}/${doc.slug}`.replace(/\/+/g, "/");
                const active = doc.slug === activeSlug;

                return (
                  <li key={doc.slug}>
                    <Link
                      href={href}
                      scroll={false}
                      prefetch
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

/* ---------------- helpers ---------------- */

function toSections(nodes: DocNode[]): Section[] {
  const sections: Section[] = [];

  // docs at root (if any)
  const rootDocs = nodes
    .filter((n) => n.type === "doc" && n.published)
    .map((n) => ({ slug: n.slug, title: n.title, sort: n.sort }))
    .sort(sorterDoc);

  if (rootDocs.length) {
    sections.push({ key: "root", items: rootDocs });
  }

  // each folder becomes a section
  for (const n of nodes) {
    if (n.type !== "folder") continue;

    const items = collectDocs(n)
      .filter((d) => d) as DocItem[];

    if (!items.length) continue;

    sections.push({
      key: n.slug,
      title: n.title,
      items: items.sort(sorterDoc),
    });
  }

  return sections;
}

function collectDocs(folder: Extract<DocNode, { type: "folder" }>): DocItem[] {
  const out: DocItem[] = [];
  for (const c of folder.children) {
    if (c.type === "doc" && c.published) out.push({ slug: c.slug, title: c.title, sort: c.sort });
    if (c.type === "folder") out.push(...collectDocs(c));
  }
  return out;
}

function sorterDoc(a: DocItem, b: DocItem) {
  if (a.sort !== b.sort) return a.sort - b.sort;
  return a.title.localeCompare(b.title);
}
