'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function RevealImage({ src, alt, className = "" }: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale from 1.2 down to 1 as the user scrolls past the image
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ scale, width: '100%', height: '100%' }} className="origin-center">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
