"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return position
}

export function useCountUp(end: number, duration = 2000, start = true) {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  const animate = useCallback((timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp
    const progress = Math.min((timestamp - startTime.current) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setCount(Math.floor(eased * end))
    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate)
    }
  }, [end, duration])

  useEffect(() => {
    if (start) {
      startTime.current = null
      frameRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [start, animate])

  return count
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

export function useDeviceCapability() {
  const [capabilities, setCapabilities] = useState({
    reducedMotion: false,
    lowPerformance: false,
    touchDevice: false,
  })

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const lowPerformance = reducedMotion || navigator.hardwareConcurrency <= 4

    setCapabilities({ reducedMotion, lowPerformance, touchDevice })
  }, [])

  return capabilities
}
