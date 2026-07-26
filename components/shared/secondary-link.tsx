import Link from "next/link";

export default function SecondaryLink({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  return (
    <Link
      href={link}
      className="font-semibold text-primary text-sm md:text-base"
    >
      {text}
    </Link>
  );
}
