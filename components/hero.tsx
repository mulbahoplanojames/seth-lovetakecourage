"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { weddingData } from "@/lib/wedding-data"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

export function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = new Date(weddingData.eventDate.targetIso).getTime()

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isComplete: false })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden"
    >
      {/* Immersive background image with editorial gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={weddingData.hero.backgroundImage}
          alt={`${weddingData.couple.partnerOne} and ${weddingData.couple.partnerTwo} laughing together`}
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover transition-transform duration-1000"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf4]/40 via-[#fdfaf4]/10 to-[#fdfaf4]/95" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-end px-6 pt-36 pb-16 text-center lg:pb-24">
        {/* Monogram and scripture quote */}
        <div className="transition-all duration-1000 ease-out">
          <div className="text-foreground/90 inline-flex items-center justify-center">
            <div className="relative h-20 w-32 sm:h-24 sm:w-36">
              <Image
                src={weddingData.couple.monogramUrl}
                alt="C & A Monogram"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          <p className="tracking-editorial mt-6 text-[0.7rem] text-[#dcd8d5] uppercase">
            {weddingData.quote.scripture}
          </p>
        </div>

        {/* Names headline */}
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[0.08em] uppercase sm:text-7xl lg:text-[6rem]">
          {weddingData.couple.partnerOne} &amp; {weddingData.couple.partnerTwo}
        </h1>

        <div className="mx-auto mt-6 flex items-center gap-6">
          <p className="tracking-editorial bg-[#dcd8d5] text-xs text-[#7b6f66] uppercase">
            {weddingData.eventDate.displayDate} — {weddingData.eventDate.city},{" "}
            {weddingData.eventDate.country}
          </p>
        </div>

        {/* Live Countdown */}
        <div className="mt-10 grid grid-cols-4 gap-6 sm:gap-12">
          <div className="flex flex-col items-center">
            <span className="text-foreground font-serif text-3xl tabular-nums sm:text-5xl">
              {mounted ? String(timeLeft.days).padStart(2, "0") : "--"}
            </span>
            <span className="tracking-editorial mt-2 text-[0.6rem] text-[#7b6f66] uppercase">
              Days
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-foreground font-serif text-3xl tabular-nums sm:text-5xl">
              {mounted ? String(timeLeft.hours).padStart(2, "0") : "--"}
            </span>
            <span className="tracking-editorial mt-2 text-[0.6rem] text-[#7b6f66] uppercase">
              Hours
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-foreground font-serif text-3xl tabular-nums sm:text-5xl">
              {mounted ? String(timeLeft.minutes).padStart(2, "0") : "--"}
            </span>
            <span className="tracking-editorial mt-2 text-[0.6rem] text-[#7b6f66] uppercase">
              Minutes
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-foreground font-serif text-3xl tabular-nums sm:text-5xl">
              {mounted ? String(timeLeft.seconds).padStart(2, "0") : "--"}
            </span>
            <span className="tracking-editorial mt-2 text-[0.6rem] text-[#7b6f66] uppercase">
              Seconds
            </span>
          </div>
        </div>

        {/* Scroll down trigger */}
        <a
          href="#date-reveal"
          className="tracking-editorial hover:text-foreground group mt-12 inline-flex flex-col items-center gap-3 text-[0.65rem] text-[#7b6f66] uppercase transition-colors"
        >
          Scroll
          <span className="block h-10 w-px animate-pulse bg-current transition-all duration-300 group-hover:h-12" />
        </a>
      </div>
    </section>
  )
}
