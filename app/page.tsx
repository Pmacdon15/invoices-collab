import Demo from "@/components/home/Demo";
import Hero from "@/components/home/Hero";
import HighlightBar from "@/components/home/HighlightBar";
import Process from "@/components/home/Process";
import QuoteRec from "@/components/home/QuoteRec";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <div className="flex flex-col">
        <Demo />
        <HighlightBar />
        <WhyUs />
      </div>
      <Process />
      <QuoteRec />
    </div>
  );
}
