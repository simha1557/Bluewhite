"use client";
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, useState } from "react";
import { Color, Mesh, ShaderMaterial } from "three";
;

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

interface SilkPlaneProps {
  uniforms: {
    uSpeed: { value: number };
    uScale: { value: number };
    uNoiseIntensity: { value: number };
    uColor: { value: Color };
    uRotation: { value: number };
    uTime: { value: number };
  };
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    if (ref && typeof ref === 'object' && ref.current) {
      const material = ref.current.material as ShaderMaterial;
      // Limit animation speed for better performance
      const adjustedDelta = Math.min(delta, 1/30); // Cap at 30fps minimum
      material.uniforms.uTime.value += 0.1 * adjustedDelta;
    }
  });

  // Cleanup function for Three.js resources
  useEffect(() => {
    const currentRef = ref && typeof ref === 'object' ? ref.current : null;
    return () => {
      if (currentRef) {
        const mesh = currentRef;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const material = mesh.material as ShaderMaterial;
          material.dispose();
        }
      }
    };
  }, [ref]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

interface SilkProps {
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  noiseIntensity = 1.5,
  rotation = 0,
}) => {
  const meshRef = useRef<Mesh>(null);

  // Dark theme only - elegant purple silk
  const silkColor = "#8B5CF6"; // Elegant purple for dark theme
  const silkIntensity = noiseIntensity * 1.5; // Subtle intensity for elegance

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: silkIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(silkColor)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, silkIntensity, silkColor, rotation]
  );

  // Error boundary for WebGL compatibility
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        if (process.env.NODE_ENV === 'development') {
          console.warn('🎨 Silk Background: WebGL not supported, using CSS fallback');
        }
      } else {
        // Test shader compilation support with proper WebGL context
        const webglContext = gl as WebGLRenderingContext;
        const vertexShader = webglContext.createShader(webglContext.VERTEX_SHADER);
        const fragmentShader = webglContext.createShader(webglContext.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) {
          setHasWebGL(false);
          if (process.env.NODE_ENV === 'development') {
            console.warn('🎨 Silk Background: Shader compilation not supported, using CSS fallback');
          }
        }
      }
    } catch {
      setHasWebGL(false);
      if (process.env.NODE_ENV === 'development') {
        console.warn('🎨 Silk Background: WebGL check failed, using CSS fallback');
      }
    }
  }, []);

  if (!hasWebGL) {
    const fallbackGradient = `linear-gradient(45deg, ${silkColor}40, ${silkColor}30, ${silkColor}35, ${silkColor}25)`;
      
    return (
      <div 
        className="w-full h-full silk-fallback"
        style={{ 
          background: fallbackGradient,
          backgroundSize: '400% 400%',
        }}
      />
    );
  }

  return (
    <Canvas 
      dpr={[1, 2]} 
      frameloop="always"
      performance={{ min: 0.5 }}
      gl={{ 
        antialias: false,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
};

export default Silk;