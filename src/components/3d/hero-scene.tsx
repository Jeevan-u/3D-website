"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"

function ParticleField({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null!)
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const positionsAttrib = mesh.current.geometry.attributes.position
    const array = positionsAttrib.array as Float32Array
    for (let i = 0; i < count; i++) {
      const x = array[i * 3]
      const y = array[i * 3 + 1]
      const z = array[i * 3 + 2]
      array[i * 3] = x + Math.sin(time * 0.2 + y) * 0.001
      array[i * 3 + 1] = y + Math.cos(time * 0.2 + z) * 0.001
      array[i * 3 + 2] = z + Math.sin(time * 0.2 + x) * 0.001
    }
    positionsAttrib.needsUpdate = true
  })

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#d4a574"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function DNAHelix() {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.15
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  const pairs = 20
  const elements: React.ReactNode[] = []

  for (let i = 0; i < pairs; i++) {
    const t = (i / pairs) * Math.PI * 4
    const yPos = (i / pairs) * 8 - 4
    const radius = 0.12
    const offset = 1.5

    const p1 = new THREE.Vector3(
      Math.cos(t) * offset,
      yPos,
      Math.sin(t) * offset
    )
    const p2 = new THREE.Vector3(
      Math.cos(t + Math.PI) * offset,
      yPos,
      Math.sin(t + Math.PI) * offset
    )

    const lineObj = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([p1, p2]),
      new THREE.LineBasicMaterial({ color: "#d4a574", transparent: true, opacity: 0.15 })
    )

    elements.push(
      <group key={i}>
        <mesh position={p1}>
          <sphereGeometry args={[radius * 2, 16, 16]} />
          <meshPhysicalMaterial
            color="#d4a574"
            emissive="#d4a574"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={p2}>
          <sphereGeometry args={[radius * 2, 16, 16]} />
          <meshPhysicalMaterial
            color="#f5e6d0"
            emissive="#f5e6d0"
            emissiveIntensity={0.1}
            transparent
            opacity={0.4}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
        <primitive object={lineObj} />
      </group>
    )
  }
  return <group ref={group}>{elements}</group>
}

function SerumSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere args={[1.8, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#d4a574"
          emissive="#d4a574"
          emissiveIntensity={0.15}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={2}
        />
      </Sphere>
    </Float>
  )
}

function LaserBeams() {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  const beams = []
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    beams.push(
      <mesh
        key={i}
        position={[Math.cos(angle) * 5, 0, Math.sin(angle) * 5]}
        rotation={[0, -angle, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.01, 0.02, 10, 8]} />
        <meshPhysicalMaterial
          color="#d4a574"
          emissive="#d4a574"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
        />
      </mesh>
    )
  }
  return <group ref={group}>{beams}</group>
}

function FloatingCards() {
  const cards = useMemo(() => {
    return [
      { position: [-4, 1, -3], label: "95%", sub: "Satisfaction" },
      { position: [4, -1, -4], label: "10K+", sub: "Happy Clients" },
      { position: [-3, -2, -5], label: "100%", sub: "Safe" },
      { position: [3.5, 2, -3.5], label: "FDA", sub: "Approved" },
    ]
  }, [])

  return (
    <>
      {cards.map((card, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={0.1}
          floatIntensity={0.5 + i * 0.2}
        >
          <group position={card.position as [number, number, number]}>
            <mesh>
              <planeGeometry args={[1.8, 0.8]} />
              <meshPhysicalMaterial
                color="#14141f"
                transparent
                opacity={0.6}
                roughness={0.1}
                metalness={0.5}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#d4a574" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f5e6d0" />
        <ParticleField count={300} />
        <DNAHelix />
        <SerumSphere />
        <LaserBeams />
        <FloatingCards />
      </Canvas>
    </div>
  )
}
