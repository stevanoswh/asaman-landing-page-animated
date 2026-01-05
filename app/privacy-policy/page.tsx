import { buildTree, findFirstDoc, getDocBySlug } from "@/lib/guides";
import type { DocNode } from "@/lib/guides";
import HelpArticle from "./_components/article";
import HelpNav from "./_components/side-nav";
import { Navbar } from "@/components/layout/navbar";
import { PrivacyPolicyHero } from "./_components/hero";

export const dynamic = "force-static";
export const revalidate = false;

// helper to find the nearest parent folder title (for the section heading)
type FolderNode = Extract<DocNode, { type: "folder" }>;
type DocumentNode = Extract<DocNode, { type: "doc" }>;

function isFolder(node: DocNode): node is FolderNode {
  return node.type === "folder";
}

function isDocument(node: DocNode): node is DocumentNode {
  return node.type === "doc";
}

function findPath(
  nodes: DocNode[],
  targetSlug: string,
  path: DocNode[] = []
): DocNode[] | null {
  for (const node of nodes) {
    if (isDocument(node) && node.slug === targetSlug) {
      return [...path, node];
    }

    if (isFolder(node)) {
      const result = findPath(node.children, targetSlug, [...path, node]);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

export default function HelpGuidesLanding() {
  const tree = buildTree();
  const first = findFirstDoc(tree);

  const doc = getDocBySlug(first.slug);

  // Section title from nearest parent folder (e.g., “FAQs”)
  const path = findPath(tree, first.slug) || [];
  const lastFolder = [...path].reverse().find((n) => n.type === "folder");
  const sectionTitle = lastFolder?.title ?? null;

  return (
    <div>
      <Navbar />
      <PrivacyPolicyHero/>
      <section className="mx-auto max-w-6xl px-4 bg-white">

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
          <aside className="md:pr-2">
            <HelpNav basePath="/privacy-policy" tree={tree} activeSlug={first.slug} />
          </aside>

          <div>
            {sectionTitle && (
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-slate-900">{sectionTitle}</h2>
                <div className="mt-3 h-px bg-slate-300" />
              </div>
            )}

            <HelpArticle
              title={doc?.title ?? "Not Found"}
              markdown={doc?.content ?? "_Document not found_"}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
