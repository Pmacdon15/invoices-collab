export function CurveUnderLine({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      {text}
      <svg
        className="pointer-events-none absolute -bottom-10 left-0 w-full"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 10 Q50 20 100 10 Q150 0 200 10"
          stroke="var(--foreground-warm)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
