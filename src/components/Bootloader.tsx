import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ACCENT, BG } from '../shared/lib/mockData';

export default function Bootloader({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Bootloader duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: BG,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: ACCENT,
            boxShadow: `0 0 ${p.size * 2}px ${ACCENT}`
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          color: ACCENT,
          fontSize: 24,
          fontWeight: 300,
          letterSpacing: 8,
          textTransform: 'uppercase',
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        Aura
      </motion.div>
    </div>
  );
}
