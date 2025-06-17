
import React, { useRef, useEffect, useState } from 'react';
import ProcessCard from './ProcessCard';

interface ProcessDesktopSliderProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
}

const ProcessDesktopSlider: React.FC<ProcessDesktopSliderProps> = ({ steps }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isScrolling) return;

    let animationId: number;
    let startTime: number;
    const scrollSpeed = 30; // pixels per second
    const pauseDuration = 2000; // pause at each end for 2 seconds
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // Calculate scroll position with pauses at both ends
      const cycleDuration = (maxScroll / scrollSpeed * 1000) + (pauseDuration * 2);
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
      
      let scrollPosition = 0;
      if (cycleProgress < 0.1) {
        // Pause at start
        scrollPosition = 0;
      } else if (cycleProgress < 0.45) {
        // Scroll to end
        const scrollProgress = (cycleProgress - 0.1) / 0.35;
        scrollPosition = scrollProgress * maxScroll;
      } else if (cycleProgress < 0.55) {
        // Pause at end
        scrollPosition = maxScroll;
      } else if (cycleProgress < 0.9) {
        // Scroll back to start
        const scrollProgress = (cycleProgress - 0.55) / 0.35;
        scrollPosition = maxScroll * (1 - scrollProgress);
      } else {
        // Pause at start
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isScrolling]);

  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex space-x-8 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Duplicate steps for seamless infinite scroll effect */}
      {[...steps, ...steps].map((step, index) => (
        <ProcessCard
          key={`${index}-${index >= steps.length ? 'duplicate' : 'original'}`}
          step={step}
          index={index}
          delay={(index % steps.length) * 0.15}
        />
      ))}
    </div>
  );
};

export default ProcessDesktopSlider;
