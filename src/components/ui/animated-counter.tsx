"use client"

import { useCountUp } from "@/hooks/use-animations"

interface AnimatedCounterProps {
  end: number
  duration?: number
  start?: boolean
}

export function AnimatedCounter({ end, duration = 2000, start = true }: AnimatedCounterProps) {
  const count = useCountUp(end, duration, start)
  return <>{count.toLocaleString("en-IN")}</>
}
