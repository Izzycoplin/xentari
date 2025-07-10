'use client';
import * as THREE from 'three';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function SphereCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={new THREE.Vector3(5, 5, 5)} intensity={1.2} />
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}




