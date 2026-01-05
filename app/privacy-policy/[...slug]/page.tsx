// app/help-guides/[...slug]/page.tsx
import { buildTree, getDocBySlug } from "@/lib/guides";
import type { DocNode } from "@/lib/guides";
import Link from "next/link";

import HelpArticle from "@/app/privacy-policy/_components/article";
import HelpSideNav from "@/app/privacy-policy/_components/side-nav";
import { Navbar } from "@/components/layout/navbar";
import { PrivacyPolicyHero } from "../_components/hero";

export const dynamic = "force-static";
export const revalidate = false;

/* ----------------------------- Type guards ------------------------------ */
type FolderNode = Extract<DocNode, { type: "folder" }>;
type DocumentNode = Extract<DocNode, { type: "doc" }>;

function isFolder(node: DocNode): node is FolderNode {
  return node.type === "folder";
}
function isDocument(node: DocNode): node is DocumentNode {
  return node.type === "doc";
}

/* --------------------------- Static params (SSG) ------------------------ */
type PageParams = { slug: string[] };

export async function generateStaticParams(): Promise<PageParams[]> {
  const tree = buildTree();
  const slugs: string[] = [];

  const walk = (nodes: DocNode[]) => {
    for (const node of nodes) {
      if (isDocument(node) && node.published) slugs.push(node.slug);
      else if (isFolder(node)) walk(node.children);
    }
  };

  walk(tree);
  return slugs.map((s) => ({ slug: s.split("/") }));
}

/* --------------------------- Utilities ---------------------------------- */
type FlatDoc = { slug: string; title: string };

function flattenDocs(nodes: DocNode[], acc: FlatDoc[] = []): FlatDoc[] {
  for (const node of nodes) {
    if (isDocument(node) && node.published) {
      acc.push({ slug: node.slug, title: node.title });
    } else if (isFolder(node)) {
      flattenDocs(node.children, acc);
    }
  }
  return acc;
}

function findPath(
  nodes: DocNode[],
  targetSlug: string,
  path: DocNode[] = []
): DocNode[] | null {
  for (const node of nodes) {
    if (isDocument(node) && node.slug === targetSlug) return [...path, node];

    if (isFolder(node)) {
      const res = findPath(node.children, targetSlug, [...path, node]);
      if (res) return res;
    }
  }
  return null;
}

/* ------------------------------ Page ------------------------------------ */
export default async function HelpGuidesArticlePage({
  params,
}: {
  params: PageParams;
}) {
  const slug = params.slug.join("/");

  // IMPORTANT:
  // If this page route is /help-guides/[...slug], basePath should usually be "/help-guides".
  // Keep "/privacy-policy" only if you intentionally want links/nav to point there.
  const basePath = "/help-guides";

  const tree = buildTree();
  const doc = getDocBySlug(slug);

  const docs = flattenDocs(tree);
  const idx = docs.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? docs[idx - 1] : null;
  const next = idx >= 0 && idx < docs.length - 1 ? docs[idx + 1] : null;

  const path = findPath(tree, slug) ?? [];
  const lastFolder = [...path].reverse().find(isFolder);
  const sectionTitle = lastFolder?.title ?? null;

  return (
    <div>
      <Navbar />
      <PrivacyPolicyHero />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
            <aside className="md:pr-2">
              <HelpSideNav tree={tree} activeSlug={slug} basePath={basePath} />
            </aside>

            <div>
              {sectionTitle && (
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {sectionTitle}
                  </h1>
                  <div className="mt-3 h-px bg-slate-300" />
                </div>
              )}

              {doc ? (
                <>
                  <HelpArticle title={doc.title} markdown={doc.content} />

                  <nav className="mt-6 flex items-center justify-between">
                    {prev ? (
                      <Link
                        href={`${basePath}/${prev.slug}`}
                        scroll={false}
                        prefetch
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                        aria-label={`Previous: ${prev.title}`}
                      >
                        <span aria-hidden>←</span>
                        <span className="line-clamp-1">{prev.title}</span>
                      </Link>
                    ) : (
                      <span />
                    )}

                    {next ? (
                      <Link
                        href={`${basePath}/${next.slug}`}
                        scroll={false}
                        prefetch
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                        aria-label={`Next: ${next.title}`}
                      >
                        <span className="line-clamp-1">{next.title}</span>
                        <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <span />
                    )}
                  </nav>
                </>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  Document not found. Ensure the file exists under{" "}
                  <code>/content/legal/{slug}.mdx</code>.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
