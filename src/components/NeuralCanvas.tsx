"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 170;
const MAX_LINE_SEGMENTS = 700;
const CONNECTION_DISTANCE = 128;
const CURSOR_DISTANCE = 180;

const MYSTIC_MINT = [0.85, 0.91, 0.89] as const;
const FORSYTHIA = [1, 0.78, 0] as const;

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const canvasElement: HTMLCanvasElement = canvas;

    let frameId = 0;
    let isMounted = true;
    let disposeScene = () => {};

    async function init() {
      const THREE = await import("three");

      if (!isMounted) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        canvas: canvasElement,
        powerPreference: "high-performance",
      });

      renderer.setClearAlpha(0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -100, 100);

      const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
      const particleColors = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = new Float32Array(PARTICLE_COUNT * 2);
      const linePositions = new Float32Array(MAX_LINE_SEGMENTS * 2 * 3);
      const lineColors = new Float32Array(MAX_LINE_SEGMENTS * 2 * 3);
      const cursor = { active: false, x: 0, y: 0 };
      const bounds = { width: 1, height: 1, halfWidth: 0.5, halfHeight: 0.5 };

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3),
      );
      particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(particleColors, 3),
      );

      const particleMaterial = new THREE.PointsMaterial({
        size: 2.4,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.78,
        vertexColors: true,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions, 3),
      );
      lineGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(lineColors, 3),
      );
      lineGeometry.setDrawRange(0, 0);

      const lineMaterial = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.24,
        vertexColors: true,
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      function randomizeParticles() {
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          const positionIndex = i * 3;
          const velocityIndex = i * 2;
          const isAccentParticle = i % 9 === 0;
          const color = isAccentParticle ? FORSYTHIA : MYSTIC_MINT;

          particlePositions[positionIndex] =
            (Math.random() - 0.5) * bounds.width;
          particlePositions[positionIndex + 1] =
            (Math.random() - 0.5) * bounds.height;
          particlePositions[positionIndex + 2] = 0;
          particleColors[positionIndex] = color[0];
          particleColors[positionIndex + 1] = color[1];
          particleColors[positionIndex + 2] = color[2];
          velocities[velocityIndex] = (Math.random() - 0.5) * 0.32;
          velocities[velocityIndex + 1] = (Math.random() - 0.5) * 0.32;
        }

        particleGeometry.attributes.position.needsUpdate = true;
        particleGeometry.attributes.color.needsUpdate = true;
      }

      function resize() {
        const width = canvasElement.clientWidth || 1;
        const height = canvasElement.clientHeight || 1;

        bounds.width = width;
        bounds.height = height;
        bounds.halfWidth = width / 2;
        bounds.halfHeight = height / 2;

        camera.left = -bounds.halfWidth;
        camera.right = bounds.halfWidth;
        camera.top = bounds.halfHeight;
        camera.bottom = -bounds.halfHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        randomizeParticles();
      }

      function setCursorFromEvent(event: PointerEvent) {
        const rect = canvasElement.getBoundingClientRect();
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        cursor.active = inside;

        if (inside) {
          cursor.x = event.clientX - rect.left - bounds.halfWidth;
          cursor.y = bounds.halfHeight - (event.clientY - rect.top);
        }
      }

      function hideCursorEffect() {
        cursor.active = false;
      }

      function addLine(
        lineIndex: number,
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        colorStart: readonly [number, number, number],
        colorEnd: readonly [number, number, number],
      ) {
        const positionIndex = lineIndex * 6;

        linePositions[positionIndex] = startX;
        linePositions[positionIndex + 1] = startY;
        linePositions[positionIndex + 2] = 0;
        linePositions[positionIndex + 3] = endX;
        linePositions[positionIndex + 4] = endY;
        linePositions[positionIndex + 5] = 0;
        lineColors[positionIndex] = colorStart[0];
        lineColors[positionIndex + 1] = colorStart[1];
        lineColors[positionIndex + 2] = colorStart[2];
        lineColors[positionIndex + 3] = colorEnd[0];
        lineColors[positionIndex + 4] = colorEnd[1];
        lineColors[positionIndex + 5] = colorEnd[2];
      }

      function animate() {
        let lineCount = 0;

        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          const positionIndex = i * 3;
          const velocityIndex = i * 2;
          let x = particlePositions[positionIndex] + velocities[velocityIndex];
          let y = particlePositions[positionIndex + 1] + velocities[velocityIndex + 1];

          if (cursor.active) {
            const dx = x - cursor.x;
            const dy = y - cursor.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared > 0 && distanceSquared < CURSOR_DISTANCE * CURSOR_DISTANCE) {
              const distance = Math.sqrt(distanceSquared);
              const force = (1 - distance / CURSOR_DISTANCE) * 1.7;

              x += (dx / distance) * force;
              y += (dy / distance) * force;
            }
          }

          if (x < -bounds.halfWidth || x > bounds.halfWidth) {
            velocities[velocityIndex] *= -1;
            x = Math.max(-bounds.halfWidth, Math.min(bounds.halfWidth, x));
          }

          if (y < -bounds.halfHeight || y > bounds.halfHeight) {
            velocities[velocityIndex + 1] *= -1;
            y = Math.max(-bounds.halfHeight, Math.min(bounds.halfHeight, y));
          }

          particlePositions[positionIndex] = x;
          particlePositions[positionIndex + 1] = y;
        }

        for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINE_SEGMENTS; i += 1) {
          const firstIndex = i * 3;
          const firstX = particlePositions[firstIndex];
          const firstY = particlePositions[firstIndex + 1];

          if (cursor.active) {
            const cursorDx = firstX - cursor.x;
            const cursorDy = firstY - cursor.y;
            const cursorDistanceSquared = cursorDx * cursorDx + cursorDy * cursorDy;

            if (cursorDistanceSquared < CURSOR_DISTANCE * CURSOR_DISTANCE) {
              addLine(
                lineCount,
                firstX,
                firstY,
                cursor.x,
                cursor.y,
                MYSTIC_MINT,
                FORSYTHIA,
              );
              lineCount += 1;
            }
          }

          for (
            let j = i + 1;
            j < PARTICLE_COUNT && lineCount < MAX_LINE_SEGMENTS;
            j += 1
          ) {
            const secondIndex = j * 3;
            const dx = firstX - particlePositions[secondIndex];
            const dy = firstY - particlePositions[secondIndex + 1];
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
              addLine(
                lineCount,
                firstX,
                firstY,
                particlePositions[secondIndex],
                particlePositions[secondIndex + 1],
                MYSTIC_MINT,
                MYSTIC_MINT,
              );
              lineCount += 1;
            }
          }
        }

        particleGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineCount * 2);
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      }

      resize();
      animate();

      window.addEventListener("pointermove", setCursorFromEvent, { passive: true });
      window.addEventListener("pointerleave", hideCursorEffect);
      window.addEventListener("resize", resize, { passive: true });

      disposeScene = () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("pointermove", setCursorFromEvent);
        window.removeEventListener("pointerleave", hideCursorEffect);
        window.removeEventListener("resize", resize);
        particleGeometry.dispose();
        particleMaterial.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        renderer.dispose();
      };
    }

    init();

    return () => {
      isMounted = false;
      disposeScene();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}
