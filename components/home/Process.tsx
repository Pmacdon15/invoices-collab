const steps = [
  {
    number: "1",
    title: "Add Your Customers",
    description:
      "Build your client database with detailed information and billing preferences.",
  },
  {
    number: "2",
    title: "Catalog Your Products",
    description:
      "Create a comprehensive product catalog with pricing, descriptions, and categories.",
  },
  {
    number: "3",
    title: "Generate Invoices",
    description:
      "Combine customers and products to create professional invoices in seconds.",
  },
];

export default function Features() {
  return (
    <div className="flex flex-col gap-10 p-5 md:p-10">
      <h2 className="text-2xl text-foreground md:text-4xl">
        Three steps. Zero headaches.
        <br />
        Streamlined invoicing for everyone.
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: List is static, index is stable
            key={index}
            className="group flex flex-col gap-4 rounded-2xl border-2 border-border bg-background p-8 transition-all duration-200 hover:scale-108 hover:shadow-lg"
          >
            <div className="font-bold text-4xl text-muted-foreground transition-rotate duration-200 group-hover:rotate-4 md:text-8xl">
              {step.number}
            </div>
            <h3 className="font-bold text-base text-foreground md:text-xl">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
