import { weddingData } from "@/lib/wedding-data";

export function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-24 px-6 py-28 sm:py-36 lg:px-10 bg-[#f4ece1]/40">
      <div className="mx-auto mb-20 max-w-2xl text-center fade-up">
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">The Weekend</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl">
          Schedule
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </div>

      <div className="mx-auto grid max-w-3xl gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {weddingData.schedule.map((item) => (
          <article
            key={item.title}
            className="fade-up flex flex-col gap-3 bg-background p-10 transition-colors hover:bg-[#faf6ed]"
          >
            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">{item.day}</p>
            <p className="font-serif text-xl italic">{item.time}</p>
            <h3 className="font-serif text-2xl">{item.title}</h3>
            <p className="text-sm text-[#7b6f66]">{item.location}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
