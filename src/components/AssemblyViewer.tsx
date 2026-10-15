"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerformanceMonitor,
  Preload,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import React, { Suspense, useRef, useState } from "react";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { Mesh } from "three";

// Preload the model for faster loading
useGLTF.preload("/animations/assembly.glb");

// Main scene component with lighting and controls
function Scene({
  onDprChange,
  onModelReady,
}: {
  onDprChange?: (fn: (dpr: number) => number) => void;
  onModelReady?: () => void;
}) {
  return (
    <>
      <PerformanceMonitor
        onIncline={() => onDprChange?.((dpr) => Math.min(dpr + 0.25, 1.5))}
        onDecline={() => onDprChange?.((dpr) => Math.max(dpr - 0.25, 0.75))}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={null}>
        <Model onModelReady={onModelReady} />
        <Preload all />
      </Suspense>
      <EffectComposer enableNormalPass={false} multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={0.6} intensity={1.2} />
        <Noise opacity={0.05} />
        <ToneMapping
          adaptive
          resolution={256}
          middleGrey={0.4}
          maxLuminance={16.0}
          averageLuminance={1.0}
          adaptationRate={1.0}
        />
      </EffectComposer>
    </>
  );
}

interface ModelProps {
  onModelReady?: () => void;
}

const Model = ({ onModelReady }: ModelProps) => {
  // console.log('[Model] Component rendering...');
  const hasSignaledReady = useRef(false);

  const gltf = useGLTF("/animations/assembly.glb") as GLTF;
  // console.log('[Model] GLTF loaded via useGLTF hook:', gltf);

  // Find meshes by name
  const meshRFDD = gltf.scene.getObjectByName("RFDD_0") as Mesh;
  const meshEdges = gltf.scene.getObjectByName("RFDD_edges_0") as Mesh;

  // console.log('[Model] Meshes found:', { meshRFDD: !!meshRFDD, meshEdges: !!meshEdges });

  // Clone and enhance the edges material for bloom effect
  const edgesMaterial = React.useMemo(() => {
    if (!meshEdges?.material) return null;
    const mat = (
      meshEdges.material as THREE.Material
    ).clone() as THREE.MeshStandardMaterial;
    mat.toneMapped = false;
    if ("emissiveIntensity" in mat) {
      mat.emissiveIntensity = 5.0;
    }
    return mat;
  }, [meshEdges?.material]);

  const groupRef = React.useRef<THREE.Group>(null);

  if (!meshRFDD || !meshEdges || !edgesMaterial) {
    console.warn("[Model] Missing meshes or material, returning null");
    return null;
  }

  // console.log('[Model] Rendering group with meshes');

  return (
    <group position={[2, -2, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
      <group ref={groupRef} dispose={null}>
        <mesh
          geometry={meshRFDD.geometry}
          material={meshRFDD.material}
          scale={[1, 1, 1]}
          position={[0, 0.13, 0.13]}
          onAfterRender={() => {
            if (!hasSignaledReady.current && onModelReady) {
              hasSignaledReady.current = true;
              onModelReady();
            }
          }}
        />
        <mesh
          geometry={meshEdges.geometry}
          material={edgesMaterial}
          scale={[1, 1, 1]}
          position={[0, 0.13, 0.13]}
        />
      </group>
    </group>
  );
};

const GRADIENT_BG_IMAGE =
  "radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), " +
  "radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), " +
  "radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), " +
  "radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), " +
  "linear-gradient(#202124, #202124)";

interface AssemblyViewerProps {
  onModelReady?: () => void;
}

const AssemblyViewer = ({ onModelReady }: AssemblyViewerProps) => {
  const [dpr, setDpr] = useState(1.25);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fallback, setFallback] = useState(false);

  // Hardware acceleration check (computed once)
  const [hasHWA] = useState(() => {
    if (typeof window === "undefined") return true;
    const test = (force: boolean) => {
      if (typeof OffscreenCanvas === "undefined") return "";
      const canvas = new OffscreenCanvas(200, 200);
      const ctx = canvas.getContext("2d", { willReadFrequently: force });
      if (!ctx) return "";
      ctx.moveTo(0, 0);
      ctx.lineTo(120, 121);
      ctx.stroke();
      return ctx.getImageData(0, 0, 200, 200).data.join();
    };

    const isVendorApple = navigator.vendor?.indexOf("Apple") > -1;
    const isNotCriOS = navigator.userAgent?.indexOf("CriOS") === -1;
    const isNotFxiOS = navigator.userAgent?.indexOf("FxiOS") === -1;
    const isSafari = isVendorApple && isNotCriOS && isNotFxiOS;

    return isSafari || test(true) !== test(false);
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "1rem",
        backgroundImage: GRADIENT_BG_IMAGE,
      }}
    >
      {hasHWA && !fallback ? (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              pointerEvents: "none",
            }}
            camera={{ position: [0, 0, 12], fov: 75 }}
            dpr={dpr}
            gl={{
              preserveDrawingBuffer: true,
              antialias: false,
              powerPreference: "high-performance",
            }}
          >
            <Scene
              onDprChange={(fn) => setDpr(fn)}
              onModelReady={onModelReady}
            />
          </Canvas>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <span>
            3D model could not be loaded or hardware acceleration is disabled.
          </span>
        </div>
      )}
    </div>
  );
};

export default AssemblyViewer;
