export function QuizLink({ label }: { label: string }) {
  return (
    <a
      href="#quiz"
      className="w-fit rounded-full font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      {label}
    </a>
  );
}
