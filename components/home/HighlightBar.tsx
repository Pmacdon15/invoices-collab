"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const features = [
  "Add Your Customers",
  "Catalog Your Products",
  "Generate Invoices",
  "Track Payments",
  "Send Reminders",
  "Stay organized",
  "Get paid on time",
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
            // biome-ignore lint/suspicious/noArrayIndexKey: List is static, index is stable
            <CarouselItem key={i} className="basis-auto pl-4">
              <div className="flex items-center gap-4 whitespace-nowrap font-bold">
                <span>•</span> {feature}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
