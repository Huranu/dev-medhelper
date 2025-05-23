"use client"
import React from 'react'
import { motion } from 'framer-motion'

const GeometricShape = ({ type = '', className = '', delay = 0, duration = 8 }) => {
  const baseAnimation = {
    y: [0, -20, 0],
    rotate: [0, 360],
    scale: [1, 1.1, 1],
  }

  const floatingAnimation = {
    animate: baseAnimation,
    transition: {
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }
  }

  switch (type) {
    case 'square':
      return (
        <motion.div 
          className={`w-12 h-12 bg-gradient-to-br from-cyan-400 to-white rounded-lg shadow-lg ${className}`}
          {...floatingAnimation}
        />
      );
    case 'circle':
      return (
        <motion.div 
          className={`w-16 h-16 bg-gradient-to-br to-cyan-400 from-blue-100 rounded-full shadow-lg ${className}`}
          {...floatingAnimation}
        />
      );
    case 'triangle':
      return (
        <motion.div 
          className={`w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-gradient-to-r from-green-400 to-emerald-500 ${className}`}
          style={{
            borderBottomColor: '#10b981',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))'
          }}
          {...floatingAnimation}
        />
      );
    case 'triangle2':
      return (
        <motion.div 
          className={`w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent ${className}`}
          style={{
            borderTopColor: '#f59e0b',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))'
          }}
          {...floatingAnimation}
        />
      );
    case 'square2':
      return (
        <motion.div 
          className={`w-10 h-10 bg-gradient-to-br from-cyan-200 to-white transform rotate-45 shadow-lg ${className}`}
          {...floatingAnimation}
        />
      );
    case 'hexagon':
      return (
        <motion.div 
          className={`w-14 h-14 bg-gradient-to-br from-cyan-200 to-white shadow-lg ${className}`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
          {...floatingAnimation}
        />
      );
    case 'star':
      return (
        <motion.div 
          className={`w-12 h-12 bg-gradient-to-br from-cyan-200 to-white shadow-lg ${className}`}
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
          {...floatingAnimation}
        />
      );
    default:
      return null;
  }
};

// Predefined values to ensure consistency between server and client
const PARTICLE_POSITIONS = [
  { left: 12.5, top: 25.3 }, { left: 87.2, top: 14.7 }, { left: 45.8, top: 73.2 },
  { left: 23.4, top: 56.7 }, { left: 78.9, top: 34.1 }, { left: 67.3, top: 82.4 },
  { left: 34.7, top: 91.2 }, { left: 89.1, top: 67.8 }, { left: 56.2, top: 23.9 },
  { left: 18.6, top: 45.3 }, { left: 72.8, top: 58.7 }, { left: 41.3, top: 16.5 },
  { left: 93.7, top: 39.8 }, { left: 28.9, top: 74.6 }, { left: 65.4, top: 87.1 },
  { left: 52.1, top: 12.4 }, { left: 84.6, top: 76.3 }, { left: 37.2, top: 29.8 },
  { left: 19.8, top: 63.5 }, { left: 76.4, top: 48.2 }
];

const PARTICLE_DELAYS = [0.2, 1.4, 2.8, 0.7, 3.1, 1.9, 0.5, 2.3, 4.2, 1.1, 3.7, 0.9, 2.6, 4.5, 1.6, 3.3, 0.8, 2.1, 4.8, 1.3];
const PARTICLE_DURATIONS = [8.2, 10.7, 9.4, 11.8, 8.9, 12.3, 9.1, 10.5, 8.7, 11.2, 9.8, 10.1, 12.6, 8.4, 11.5, 9.3, 10.9, 8.8, 11.7, 9.6];

const AnimatedBackground = ({ className = "fixed inset-0", asBackground = false }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const shapes = [
    { type: 'circle', position: 'top-10 left-10', delay: 0, duration: 8 },
    { type: 'square', position: 'top-20 right-16', delay: 1, duration: 10 },
    { type: 'triangle', position: 'top-1/3 left-1/4', delay: 2, duration: 9 },
    { type: 'hexagon', position: 'top-1/4 right-1/3', delay: 0.5, duration: 11 },
    { type: 'square2', position: 'top-1/2 left-12', delay: 1.5, duration: 8.5 },
    { type: 'star', position: 'top-2/3 right-20', delay: 2.5, duration: 12 },
    { type: 'circle', position: 'bottom-1/3 left-1/3', delay: 3, duration: 9.5 },
    { type: 'triangle2', position: 'bottom-20 right-1/4', delay: 1.2, duration: 10.5 },
    { type: 'square', position: 'bottom-1/4 left-16', delay: 2.8, duration: 8.8 },
    { type: 'hexagon', position: 'bottom-10 right-10', delay: 0.8, duration: 11.5 },
    { type: 'star', position: 'top-3/4 left-3/4', delay: 3.5, duration: 9.2 },
    { type: 'triangle', position: 'top-1/2 right-1/2', delay: 4, duration: 10.8 },
  ];

  return (
    <div className={`${className} overflow-hidden ${asBackground ? 'absolute inset-0' : 'pointer-events-none'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-[#39ae9f]" />
      
      {isMounted && (
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {shapes.map((shape, index) => (
        <div key={index} className={`absolute ${shape.position}`}>
          <GeometricShape 
            type={shape.type} 
            delay={shape.delay}
            duration={shape.duration}
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ))}

      {isMounted && PARTICLE_POSITIONS.map((position, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: PARTICLE_DURATIONS[index],
            repeat: Infinity,
            delay: PARTICLE_DELAYS[index],
            ease: "easeInOut"
          }}
        />
      ))}

      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}

export default AnimatedBackground