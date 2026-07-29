import { Quote } from "lucide-react";

export default function QuoteRec() {
  return (
    <div className="flex flex-col items-center gap-8 bg-secondary p-5 md:p-10">
      <div>
        <Quote size={48} fill="var(--primary)" stroke="var(--primary)" />
      </div>
      <blockquote className="flex flex-col gap-8">
        <p className="font-normal font-serif text-foreground text-xl leading-relaxed md:text-2xl">
          "Simple, powerful, and exactly what we needed for our growing
          business."
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-lg text-primary">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">
              Dummy Anonymous
            </span>
            <span className="text-muted-foreground text-sm">
              Head of Strategy at !@#*&
            </span>
          </div>
        </div>
      </blockquote>
    </div>
  );
}
