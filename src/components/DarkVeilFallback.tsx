'use client'

import React from 'react';

interface DarkVeilFallbackProps {
  className?: string;
  style?: React.CSSProperties;
}

const DarkVeilFallback: React.FC<DarkVeilFallbackProps> = ({
  className = "",
  style = {}
}) => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 20% 80%, rgba(123, 116, 129, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(123, 116, 129, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(123, 116, 129, 0.15) 0%, transparent 50%),
      linear-gradient(45deg, rgba(123, 116, 129, 0.1), rgba(123, 116, 129, 0.05), rgba(123, 116, 129, 0.08), rgba(123, 116, 129, 0.03))
    `,
    backgroundSize: '400% 400%, 300% 300%, 200% 200%, 400% 400%',
    animation: 'darkveil-fallback-animation 20s ease infinite',
    zIndex: 0,
    ...style
  };

  return (
    <>
      <style jsx>{`
        @keyframes darkveil-fallback-animation {
          0% {
            background-position: 0% 50%, 0% 0%, 0% 0%, 0% 50%;
          }
          25% {
            background-position: 100% 50%, 100% 100%, 50% 50%, 100% 50%;
          }
          50% {
            background-position: 0% 50%, 0% 0%, 100% 100%, 0% 50%;
          }
          75% {
            background-position: 100% 50%, 100% 100%, 50% 50%, 100% 50%;
          }
          100% {
            background-position: 0% 50%, 0% 0%, 0% 0%, 0% 50%;
          }
        }
        
        .darkveil-fallback {
          position: relative;
          overflow: hidden;
        }
        
        .darkveil-fallback::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 60% 40%, rgba(123, 116, 129, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(123, 116, 129, 0.08) 0%, transparent 35%);
          animation: darkveil-fallback-shimmer 15s ease-in-out infinite alternate;
        }
        
        .darkveil-fallback::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(123, 116, 129, 0.02) 2px,
              rgba(123, 116, 129, 0.02) 4px
            );
          animation: darkveil-fallback-scanlines 8s linear infinite;
        }
        
        @keyframes darkveil-fallback-shimmer {
          0% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.2) rotate(180deg);
          }
        }
        
        @keyframes darkveil-fallback-scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
      <div 
        className={`darkveil-fallback ${className}`}
        style={baseStyle}
        role="presentation"
        aria-hidden="true"
      />
    </>
  );
};

export default DarkVeilFallback; 