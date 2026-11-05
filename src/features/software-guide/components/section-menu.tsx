import type { GuideContent } from "../types";

export function SectionMenu({ content }: { content: GuideContent["menu"] }) {
  return (
    <nav aria-label={content.label} className="border-y border-border bg-bg">
      <ul className="mx-auto flex max-w-5xl flex-wrap gap-x-5 gap-y-1 px-4 py-2">
        {content.items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-text hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
