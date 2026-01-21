import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground.tsx
 * 
 * Creates a mystical animated background using Vanta.js FOG effect
 * combined with rising embers for the preloader.
 */

// Declare Vanta types for TypeScript
declare global {
  interface Window {
    VANTA: {
      FOG: (options: {
        el: HTMLElement | null;
        THREE?: unknown;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        highlightColor?: number;
        midtoneColor?: number;
        lowlightColor?: number;
        baseColor?: number;
        blurFactor?: number;
        speed?: number;
        zoom?: number;
      }) => { destroy: () => void };
    };
    THREE: unknown;
  }
}

interface AnimatedBackgroundProps {
  className?: string;
}

// Helper to load scripts dynamically
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initVanta = async () => {
      try {
        // Load Three.js first, then Vanta
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js');

        if (!isMounted || !vantaRef.current) return;

        // Initialize Vanta FOG effect with Euphuism theme colors
        vantaEffect.current = window.VANTA.FOG({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x2d3e10,    // Euphuism green
          midtoneColor: 0x2d3e10,      // Euphuism green
          lowlightColor: 0xf9f2d0,     // Euphuism beige
          baseColor: 0x2d3e10,         // Euphuism green as base
          blurFactor: 0.6,
          speed: 1.5,
          zoom: 1.2
        });
      } catch (error) {
        console.error('Failed to initialize Vanta.js:', error);
      }
    };

    initVanta();

    return () => {
      isMounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Vanta.js FOG background */}
      <div 
        ref={vantaRef}
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--euphuism-green)' }}
      />
    </div>
  );
};

export default AnimatedBackground;
