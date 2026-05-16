import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Rotating DNA double-helix built from two strands of spheres + rungs. */
function Helix() {
  const group = useRef<THREE.Group>(null);
  const COUNT = 34;
  const RADIUS = 1.25;
  const HEIGHT = 8;

  const nodes = useMemo(() => {
    const arr: { y: number; angle: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({ y: (i / (COUNT - 1) - 0.5) * HEIGHT, angle: (i / COUNT) * Math.PI * 5 });
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} rotation={[0.12, 0, 0.16]}>
      {nodes.map((n, i) => {
        const x1 = Math.cos(n.angle) * RADIUS;
        const z1 = Math.sin(n.angle) * RADIUS;
        const x2 = Math.cos(n.angle + Math.PI) * RADIUS;
        const z2 = Math.sin(n.angle + Math.PI) * RADIUS;
        return (
          <group key={i}>
            <mesh position={[x1, n.y, z1]}>
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial
                color="#3CE0FF"
                emissive="#02A7E3"
                emissiveIntensity={1.3}
                roughness={0.25}
                metalness={0.6}
              />
            </mesh>
            <mesh position={[x2, n.y, z2]}>
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial
                color="#9C7BFF"
                emissive="#6D4AFF"
                emissiveIntensity={1.3}
                roughness={0.25}
                metalness={0.6}
              />
            </mesh>
            {i % 2 === 0 && (
              <mesh
                position={[(x1 + x2) / 2, n.y, (z1 + z2) / 2]}
                onUpdate={(self) => self.lookAt(x1, n.y, z1)}
              >
                <cylinderGeometry args={[0.022, 0.022, RADIUS * 2, 6]} />
                <meshStandardMaterial
                  color="#4f93b8"
                  emissive="#1f6f96"
                  emissiveIntensity={0.25}
                  roughness={0.6}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/** Drifting particle field. */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 20;
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#3CE0FF" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.75} />
      <pointLight position={[6, 6, 6]} intensity={130} color="#3CE0FF" />
      <pointLight position={[-6, -3, 4]} intensity={80} color="#6D4AFF" />
      <pointLight position={[0, 0, 6]} intensity={45} color="#ffffff" />
      {/* helix pushed to the right so the headline stays clear */}
      <group position={[2.7, 0, 0]} scale={0.92}>
        <Helix />
      </group>
      <Particles />
    </Canvas>
  );
}
