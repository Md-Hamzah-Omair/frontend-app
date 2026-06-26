"use client";

import { type MouseEvent, type ReactNode, useRef } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  maxOffset?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function MagneticButton({
  children,
  maxOffset = 18,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  function updateTransform() {
    frameRef.current = null;

    const element = containerRef.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = pointerRef.current.x - centerX;
    const deltaY = pointerRef.current.y - centerY;
    const distance = Math.hypot(deltaX, deltaY) || 1;
    const proximity = Math.max(
      0,
      1 - distance / Math.max(rect.width, rect.height),
    );
    const translateX = clamp(deltaX * 0.18 * (0.6 + proximity), -maxOffset, maxOffset);
    const translateY = clamp(deltaY * 0.18 * (0.6 + proximity), -maxOffset, maxOffset);

    element.style.transition = "transform 80ms ease-out";
    element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(updateTransform);
    }
  }

  function handleMouseLeave() {
    const element = containerRef.current;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (!element) {
      return;
    }

    element.style.transition = "transform 0.3s ease-out";
    element.style.transform = "translate3d(0px, 0px, 0)";
  }

  return (
    <span
      ref={containerRef}
      className="inline-flex will-change-transform"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
    </span>
  );
}
