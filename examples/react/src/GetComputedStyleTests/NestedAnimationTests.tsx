import React, { useRef, useEffect } from 'react';
import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function NestedAnimationTests() {
  const animateMTRef = useMainThreadRef<ReturnType<typeof animate> | null>(null);
  const parentMTRef = useMainThreadRef<MainThread.Element>(null);
  const childMTRef = useMainThreadRef<MainThread.Element>(null);

  function startNestedAnimationTests() {
    'main thread';

    if (parentMTRef.current && childMTRef.current) {
      // Test case: Parent animation
      const parentTransformAnimation = animate(
        parentMTRef.current,
        { 
          scale: [1, 1.3, 1],
          rotate: ['0deg', '15deg', '0deg']
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Child animation
      const childTransformAnimation = animate(
        childMTRef.current,
        { 
          scale: [1, 1.5, 1],
          rotate: ['0deg', '45deg', '0deg']
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Parent color animation
      const parentColorAnimation = animate(
        parentMTRef.current,
        { 
          backgroundColor: ['#4f46e5', '#10b981', '#4f46e5']
        },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Child color animation
      const childColorAnimation = animate(
        childMTRef.current,
        { 
          backgroundColor: ['#ef4444', '#f59e0b', '#ef4444']
        },
        { duration: 2.5, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Sequential nested animation
      const sequentialAnimation = animate(
        parentMTRef.current,
        { 
          translateX: [0, 100, 0]
        },
        { 
          duration: 3,
          repeat: Number.POSITIVE_INFINITY
        }
      );

      // Child animation
      animate(
        childMTRef.current,
        { 
          translateX: [0, -50, 0]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      animateMTRef.current = parentTransformAnimation;
    }
  }

  function endNestedAnimationTests() {
    'main thread';
    animateMTRef.current?.stop();
  }

  useEffect(() => {
    runOnMainThread(startNestedAnimationTests)();
    return () => {
      runOnMainThread(endNestedAnimationTests);
    };
  });

  return (
    <view className='case-container'>
      <text className='title'>Nested Animation Tests</text>
      <text className='description'>Testing nested element animations:</text>
      <view className='feature-list'>
        <text className='feature-item'>• Parent-child transform animations</text>
        <text className='feature-item'>• Nested color animations</text>
        <text className='feature-item'>• Sequential nested animations</text>
      </view>
      <view
        main-thread:ref={parentMTRef}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#4f46e5',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <view
          main-thread:ref={childMTRef}
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#ef4444',
            borderRadius: '8px',
          }}
        />
      </view>
    </view>
  );
}