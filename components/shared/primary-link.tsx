import Link from "next/link";

export default function PrimaryLink({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  return (
    <Link
      href={link}
      className="group flex max-w-fit items-center gap-2 rounded-full border-2 border-primary bg-primary px-4 py-2 font-semibold text-background duration-200 hover:scale-108 hover:bg-background hover:text-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.25em"
        height="1.25em"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <title>arrow forward</title>
        <circle
          cx="12"
          cy="12"
          r="6"
          fill="currentColor"
          className="transition-all duration-300 ease-in-out group-hover:scale-0 group-hover:opacity-0"
        />
        <path
          fill="currentColor"
          d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
          className="scale-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100"
        />
      </svg>
      {text}
    </Link>
  );
}
