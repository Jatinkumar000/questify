import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

function Planet({ position, color, size = 1, speed = 1 }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <Sphere args={[size, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        {/* Glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size * 1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const points = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#a855f7" transparent opacity={0.6} />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Subject Planets */}
        <Planet position={[-3, 2, -2]} color="#a855f7" size={0.8} speed={1.2} /> {/* Math - Purple */}
        <Planet position={[3.5, 1, -3]} color="#10b981" size={1} speed={0.8} /> {/* Science - Green */}
        <Planet position={[-2, -2, -4]} color="#f59e0b" size={0.6} speed={1.5} /> {/* History - Orange */}
        <Planet position={[2, -1.5, -2]} color="#ec4899" size={0.7} speed={1} /> {/* Language - Pink */}
        <Planet position={[0, 3, -5]} color="#06b6d4" size={0.9} speed={0.9} /> {/* Art - Cyan */}
        
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
