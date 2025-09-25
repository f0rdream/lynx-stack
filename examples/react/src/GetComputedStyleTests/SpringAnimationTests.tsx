import React, { useRef, useEffect } from 'react';
import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function SpringAnimationTests() {
  const animateMTRef = useMainThreadRef<ReturnType<typeof animate> | null>(null);
  const boxMTRef = useMainThreadRef<MainThread.Element>(null);

  function startSpringAnimationTests() {
    'main thread';

    if (boxMTRef.current) {
      // Test case: Spring animation with scale physics
      const scaleSpring = animate(
        boxMTRef.current,
        { 
          scale: [1, 1.8]
        },
        { 
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 1,
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      // Test case: Spring animation with position physics
      const positionSpring = animate(
        boxMTRef.current,
        { 
          translateX: [0, 100],
          translateY: [0, 50]
        },
        { 
          type: 'spring',
          stiffness: 200,
          damping: 15,
          mass: 1.2,
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      // Test case: Spring animation with rotation physics
      const rotationSpring = animate(
        boxMTRef.current,
        { 
          rotate: ['0deg', '180deg']
        },
        { 
          type: 'spring',
          stiffness: 250,
          damping: 18,
          mass: 0.8,
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      // Test case: Spring animation with opacity physics
      const opacitySpring = animate(
        boxMTRef.current,
        { 
          opacity: [0.5, 1]
        },
        { 
          type: 'spring',
          stiffness: 150,
          damping: 12,
          mass: 1,
          repeat: Number.POSITIVE_INFINITY 
        }
      );

      animateMTRef.current = scaleSpring;
    }
  }

  function endSpringAnimationTests() {
    'main thread';
    animateMTRef.current?.stop();
  }

  useEffect(() => {
    runOnMainThread(startSpringAnimationTests)();
    return () => {
      runOnMainThread(endSpringAnimationTests);
    };
  });

  return (
    <view className='case-container'>
      <text className='title'>Spring Animation Tests</text>
      <text className='description'>Testing spring physics animations:</text>
      <view className='feature-list'>
        <text className='feature-item'>• Scale spring physics</text>
        <text className='feature-item'>• Position spring physics</text>
        <text className='feature-item'>• Rotation spring physics</text>
        <text className='feature-item'>• Opacity spring physics</text>
      </view>
      <view
        main-thread:ref={boxMTRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#4f46e5',
          borderRadius: '8px',
          opacity: 0.5,
        }}
      >
      </view>
    </view>
  );
}
