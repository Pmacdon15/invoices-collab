"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Demo from "@/components/home/Demo";
import GetStarted from "@/components/home/GetStarted";
import Hero from "@/components/home/Hero";
import HighlightBar from "@/components/home/HighlightBar";
import Process from "@/components/home/Process";
import QuoteRec from "@/components/home/QuoteRec";
import WhyUs from "@/components/home/WhyUs";
import Spinner from "@/components/shared/spinner";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/clients");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return <Spinner />;
  if (isSignedIn) return null;

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
      <GetStarted />
      <Footer />
    </div>
  );
}
