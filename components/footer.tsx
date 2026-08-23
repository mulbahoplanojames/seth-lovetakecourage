import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-20 text-center">
      <div className="inline-flex items-center justify-center">
        <div className="relative h-20 w-32">
          <Image
            src={weddingData.couple.monogramUrl}
            alt="C & A monogram"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <p className="mt-6 font-serif text-xl italic text-[#7b6f66]">
        {weddingData.couple.partnerOne} &amp; {weddingData.couple.partnerTwo}
      </p>
      <p className="mt-2 text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
        {weddingData.eventDate.displayDate} — {weddingData.eventDate.city}, {weddingData.eventDate.country}
      </p>
      <div className="mx-auto mt-8 h-px w-24 bg-border" />
      <p className="mt-8 text-[0.89rem] uppercase tracking-editorial text-[#a89988]">
        {weddingData.couple.hashtag}
      </p>
    </footer>
  );
}
