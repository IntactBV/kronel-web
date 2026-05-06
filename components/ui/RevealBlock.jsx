"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function RevealBlock({
  as: Component = "section",
  className = "",
  variant = "fade-up",
  children,
  style,
  appearOnMount = false,
  mountDelayMs = 0,
  ...props
}) {
  const rootRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (appearOnMount) {
      let frameA = 0;
      let frameB = 0;
      let timeoutId = 0;

      frameA = window.requestAnimationFrame(() => {
        frameB = window.requestAnimationFrame(() => {
          timeoutId = window.setTimeout(() => {
            setIsVisible(true);
          }, mountDelayMs);
        });
      });

      return () => {
        window.clearTimeout(timeoutId);
        window.cancelAnimationFrame(frameA);
        window.cancelAnimationFrame(frameB);
      };
    }

    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={rootRef}
      className={`reveal-block reveal-${variant} ${isVisible ? "is-visible" : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

