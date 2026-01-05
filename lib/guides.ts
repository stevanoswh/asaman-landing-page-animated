import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content/legal");

export type DocNode =
  | { type: "folder"; slug: string; title: string; sort: number; children: DocNode[] }
  | { type: "doc";    slug: string; title: string; sort: number; filepath: string; published: boolean };

type Meta = { title?: string; sort?: number; items?: Record<string, { title?: string; sort?: number }> };

function readMeta(dir: string): Meta {
  const f = path.join(dir, "_meta.json");
  if (fs.existsSync(f)) {
    try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return {}; }
  }
  return {};
}

export function buildTree(base = ROOT, baseSlug = ""): DocNode[] {
  const meta = readMeta(base);
  const entries = fs.readdirSync(base, { withFileTypes: true }).filter(e => e.name !== "_meta.json");
  const nodes: DocNode[] = [];

  for (const entry of entries) {
    const abs = path.join(base, entry.name);
    const nameNoExt = entry.isFile() ? entry.name.replace(/\.(md|mdx)$/i, "") : entry.name;
    const slug = [baseSlug, nameNoExt].filter(Boolean).join("/");

    if (entry.isDirectory()) {
      const children = buildTree(abs, slug).sort(sorter);
      const title =
        meta.items?.[entry.name]?.title ??
        (base === ROOT ? undefined : meta.title) ??
        entry.name;

      nodes.push({
        type: "folder",
        slug,
        title,
        sort: meta.items?.[entry.name]?.sort ?? 0,
        children,
      });
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      const raw = fs.readFileSync(abs, "utf8");
      const { data } = matter(raw);
      nodes.push({
        type: "doc",
        slug,
        title: meta.items?.[nameNoExt]?.title ?? (data.title as string) ?? nameNoExt,
        sort: meta.items?.[nameNoExt]?.sort ?? (data.sort as number) ?? 0,
        filepath: abs,
        published: (data.published as boolean) ?? true,
      });
    }
  }
  return nodes.sort(sorter);
}

function sorter(a: DocNode, b: DocNode) {
  if (a.sort !== b.sort) return a.sort - b.sort;
  return a.title.localeCompare(b.title, "id");
}

export function getDocBySlug(slug: string) {
  const candidates = [`${slug}.md`, `${slug}.mdx`].map(f => path.join(ROOT, f));
  const fp = candidates.find(fs.existsSync);
  if (!fp) return null;
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  return {
    title: (data.title as string) ?? slug.split("/").pop() ?? "",
    content,
    published: (data.published as boolean) ?? true,
  };
}

export function findFirstDoc(nodes: DocNode[]): { slug: string } | null {
  for (const n of nodes) {
    if (n.type === "doc" && n.published) return { slug: n.slug };
    if (n.type === "folder") {
      const hit = findFirstDoc(n.children);
      if (hit) return hit;
    }
  }
  return null;
}
