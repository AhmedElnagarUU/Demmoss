export function QuizLink({ label }: { label: string }) {
  return (
    <a
      href="#quiz"
      className="w-fit font-semibold text-primary underline underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      {label}
    </a>
  );
}
