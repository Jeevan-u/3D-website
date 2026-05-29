"use client"

import { useMousePosition } from "@/hooks/use-animations"

export function CursorGlow() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500"
      style={{ opacity: 0.4 }}
    >
      <div
        className="absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          background:
            "radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />
    </div>
  )
}
