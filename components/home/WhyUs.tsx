export default function WhyUs() {
  return (
    <div className="flex flex-col items-center gap-10 bg-secondary p-5 md:p-10">
      <h5 className="max-w-fit rounded-full bg-primary px-4 py-2 font-bold text-secondary text-sm">
        Why VivaPro Exists
      </h5>
      <h3 className="max-w-205 font-bold text-4xl text-muted-primary leading-12">
        Most invoicing apps demand constant attention.
        <span className="font-normal font-serif text-foreground">
          {" "}
          VivaPro is built to be effective.
        </span>
        <br />
        It quietly creates, tracks, and organizes every invoice so you never
        have to think about it.
      </h3>
    </div>
  );
}
