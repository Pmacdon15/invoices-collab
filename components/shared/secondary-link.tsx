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
      className="border-transparent border-b-2 font-semibold text-primary text-sm duration-200 hover:border-primary md:text-base"
    >
      {text}
    </Link>
  );
}
