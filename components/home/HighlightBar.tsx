"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const features = [
  "One-click invoices",
  "Auto-reminders",
  "Instant PDFs",
  "Track everything",
  "Zero monthly fees",
  "Unlimited clients",
  "Clean interface",
];

export default function HighlightBar() {
  return (
    <div className="bg-foreground-warm py-4">
      <Carousel
        opts={{ loop: true, dragFree: true }}
        plugins={[
          AutoScroll({
            speed: 1.5,
            startDelay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {[...features, ...features].map((feature, i) => (
            <CarouselItem key={i} className="basis-auto pl-4">
              <div className="flex items-center gap-2 whitespace-nowrap font-bold">
                • {feature}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
