import React, { useRef, useEffect } from 'react';
import { animate, stagger } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function StaggeredAnimationTests() {
  const animateMTRef = useMainThreadRef<ReturnType<typeof animate> | null>(null);
  const containerMTRef = useMainThreadRef<MainThread.Element>(null);
  const boxesMTRef = useMainThreadRef<MainThread.Element[]>([]);

  function startStaggeredAnimationTests() {
    'main thread';

    if (containerMTRef.current && boxesMTRef.current.length > 0) {
      // Test case: Staggered scale animation
      const scaleAnimation = animate(
        boxesMTRef.current,
        { 
          scale: [1, 1.5, 1]
        },
        { 
          duration: 1.5,
          delay: stagger(0.1),
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      // Test case: Staggered position animation
      const positionAnimation = animate(
        boxesMTRef.current,
        { 
          translateX: [0, 50, 0],
          translateY: [0, 30, 0]
        },
        { 
          duration: 2,
          delay: stagger(0.15),
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      // Test case: Staggered opacity animation
      const opacityAnimation = animate(
        boxesMTRef.current,
        { 
          opacity: [0.3, 1, 0.3]
        },
        { 
          duration: 1.8,
          delay: stagger(0.2),
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      animateMTRef.current = scaleAnimation;
    }
  }

  function endStaggeredAnimationTests() {
    'main thread';
    animateMTRef.current?.stop();
  }

  useEffect(() => {
    runOnMainThread(startStaggeredAnimationTests)();
    return () => {
      runOnMainThread(endStaggeredAnimationTests);
    };
  });

  return (
    <view className='case-container'>
      <text className='title'>Staggered Animation Tests</text>
      <text className='description'>Testing staggered animations:</text>
      <view className='feature-list'>
        <text className='feature-item'>• Staggered scale animations</text>
        <text className='feature-item'>• Staggered position animations</text>
        <text className='feature-item'>• Staggered opacity animations</text>
      </view>
      <view
        main-thread:ref={containerMTRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <view
            key={i}
            main-thread:ref={(el) => {
              if (el && !boxesMTRef.current.includes(el)) {
                boxesMTRef.current.push(el);
              }
            }}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: `hsl(${i * 60}, 70%, 50%)`,
              borderRadius: '8px',
              opacity: 0.3,
            }}
          />
        ))}
      </view>
    </view>
  );
}