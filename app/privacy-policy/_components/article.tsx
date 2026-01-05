import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function HelpArticle({
  title,
  markdown,
}: {
  title: string;
  markdown: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4 border-b border-slate-200 pb-3">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      </header>

      <div
        className={`
          help-prose
          prose max-w-none
          text-slate-900
          prose-headings:text-slate-900
          prose-p:text-slate-900
          prose-strong:text-slate-900
          prose-code:text-slate-900
          prose-img:rounded-xl prose-img:border prose-img:border-slate-200
          [&_ul]:list-disc [&_ol]:list-decimal
          [&_ul]:pl-6 [&_ol]:pl-6
          [&_li]:my-1
          [&_li>ul]:mt-1 [&_li>ol]:mt-1
          [&_img]:w-19/20 [&_img]:h-auto
          [&_img]:mx-0 [&_img]:border [&_img]:border-black [&_img]:rounded-lg
          prose-p:my-4
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}   // <— this preserves single newlines as <br/>
          components={{
            // optional: tune spacing/line-height for paragraphs
            p: (p) => <p className="my-4 leading-7" {...p} />,
            h1: (p) => <h1 className="text-2xl font-bold" {...p} />,
            h2: (p) => <h2 className="mt-6 text-xl font-semibold" {...p} />,
            h3: (p) => <h2 className="mt-6 font-semibold" {...p} />,
            a:  (p) => <a className="text-sky-700 underline" {...p} />,
            img:(p) => <img {...p} loading="lazy" className="mx-auto" />
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </article>
  );
}
