import React from 'react'
import { motion } from 'framer-motion'

const GeometricShape = ({ type = '', className = '', delay = 0 }) => {
  const baseAnimation = {
    y: [0, -20, 0],
    rotate: [0, 360],
    scale: [1, 1.1, 1],
  }

  const floatingAnimation = {
    animate: baseAnimation,
    transition: {
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }
  }

  switch (type) {
    case 'square':
      return (
        <motion.div 
          className={`w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-lg ${className}`}
          {...floatingAnimation}
        />
      );
    case 'circle':
      return (
        <motion.div 
          className={`w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg ${className}`}
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
          className={`w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 transform rotate-45 shadow-lg ${className}`}
          {...floatingAnimation}
        />
      );
    case 'hexagon':
      return (
        <motion.div 
          className={`w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg ${className}`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
          {...floatingAnimation}
        />
      );
    case 'star':
      return (
        <motion.div 
          className={`w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg ${className}`}
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

const AnimatedBackground = ({ className = "fixed inset-0", asBackground = false }) => {
  const shapes = [
    { type: 'circle', position: 'top-10 left-10', delay: 0 },
    { type: 'square', position: 'top-20 right-16', delay: 1 },
    { type: 'triangle', position: 'top-1/3 left-1/4', delay: 2 },
    { type: 'hexagon', position: 'top-1/4 right-1/3', delay: 0.5 },
    { type: 'square2', position: 'top-1/2 left-12', delay: 1.5 },
    { type: 'star', position: 'top-2/3 right-20', delay: 2.5 },
    { type: 'circle', position: 'bottom-1/3 left-1/3', delay: 3 },
    { type: 'triangle2', position: 'bottom-20 right-1/4', delay: 1.2 },
    { type: 'square', position: 'bottom-1/4 left-16', delay: 2.8 },
    { type: 'hexagon', position: 'bottom-10 right-10', delay: 0.8 },
    { type: 'star', position: 'top-3/4 left-3/4', delay: 3.5 },
    { type: 'triangle', position: 'top-1/2 right-1/2', delay: 4 },
  ];

  return (
    <div className={`${className} overflow-hidden ${asBackground ? 'absolute inset-0' : 'pointer-events-none'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600" />
      
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

      {shapes.map((shape, index) => (
        <div key={index} className={`absolute ${shape.position}`}>
          <GeometricShape 
            type={shape.type} 
            delay={shape.delay}
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ))}

      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
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