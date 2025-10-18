'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function PixelArtImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [isInView, setIsInView] = useState(false);
  const [currentResolution, setCurrentResolution] = useState(32); // Start mit sehr niedriger Auflösung
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  // Lade Bild und ermittle Seitenverhältnis
  useEffect(() => {
    if (!props.src || typeof props.src !== 'string') return;

    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = props.src;

    // Bild vorladen für spätere Canvas-Nutzung
    img.onload = () => {
      // Bild ist geladen und bereit
    };
  }, [props.src]);

  // Progressive Auflösungs-Animation
  useEffect(() => {
    if (!isInView) {
      setCurrentResolution(32); // Zurück auf niedrige Auflösung
      return;
    }

    // Auflösungs-Stufen: 32 → 64 → 128 → 256 → 512 (hochauflösend)
    const resolutionSteps = [32, 64, 128, 256, 512];
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < resolutionSteps.length) {
        setCurrentResolution(resolutionSteps[stepIndex]);
      } else {
        clearInterval(interval);
      }
    }, 150); // Jede Stufe dauert 150ms

    return () => clearInterval(interval);
  }, [isInView]);

  // Rendere Canvas mit aktueller Auflösung und korrektem Seitenverhältnis
  useEffect(() => {
    if (!props.src || typeof props.src !== 'string') return;
    if (!canvasRef.current) return;

    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = props.src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Canvas-Größe basierend auf Seitenverhältnis
      const aspectRatio = img.width / img.height;
      if (aspectRatio > 1) {
        // Querformat
        canvas.width = currentResolution;
        canvas.height = Math.round(currentResolution / aspectRatio);
      } else {
        // Hochformat oder quadratisch
        canvas.height = currentResolution;
        canvas.width = Math.round(currentResolution * aspectRatio);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [props.src, currentResolution]);

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {/* Canvas für progressive Auflösung */}
      <canvas
        ref={canvasRef}
        className='h-full w-full object-cover'
        style={{
          imageRendering: currentResolution < 512 ? 'pixelated' : 'auto',
          opacity: isInView && currentResolution >= 512 ? 0 : 1,
          transition: 'opacity 1.5s ease-out',
        }}
      />

      {/* Finales hochauflösendes Bild */}
      <motion.img
        ref={imgRef}
        {...props}
        className={props.className}
        style={{
          ...(props.style || {}),
          position: 'absolute',
          inset: 0,
        }}
        initial={{ opacity: 0 }}
        animate={
          isInView && currentResolution >= 512 ? { opacity: 1 } : { opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}
