import React, { useEffect, useRef } from 'react';
import Pattern from '@/images/pattern.svg';
import Image from 'next/image';

export const PatternAnim = () => {
  const patternRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const pattern = patternRef.current;
      if (pattern) {
 
        const rect = pattern.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        pattern.style.maskImage = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)`;
        pattern.style.opacity = 0.56;
        pattern.style.webkitMaskImage = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)`;
        pattern.style.transition = `maskImage 0.5s ease-out`;
      }
    };

    const pattern = patternRef.current;
    if (pattern) {
      pattern.style.transition = 'mask-image 0.1s ease, -webkit-mask-image 0.1s ease'; // Smooth transition
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div  className="relative w-full h-screen overflow-hidden pt-div">
      {/* Replace this Image component or Pattern import with your desired image */}
      <Image ref={patternRef} src={Pattern} alt="pattern" layout="fill" objectFit="cover" />
    </div>
  );
};

