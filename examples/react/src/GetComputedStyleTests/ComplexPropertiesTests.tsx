import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function ComplexPropertiesTests() {
  const animationsMTRef = useMainThreadRef<ReturnType<typeof animate>[]>([]);
  const boxMTRef = useMainThreadRef<MainThread.Element>(null);

  function startAnimation() {
    'main thread';

    if (boxMTRef.current) {
      // Test case: Size animation
      const sizeAnimation = animate(
        boxMTRef.current,
        { 
          width: ['100px', '200px', '150px'],
          height: ['100px', '150px', '100px']
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Color animation
      const colorAnimation = animate(
        boxMTRef.current,
        { 
          backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444']
        },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Border radius animation
      const borderRadiusAnimation = animate(
        boxMTRef.current,
        { 
          borderTopLeftRadius: ['8px', '50%', '8px'],
          borderBottomRightRadius: ['1px', '45%', '8px'],
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Opacity animation
      const opacityAnimation = animate(
        boxMTRef.current,
        { 
          opacity: [0.3, 1, 0.3]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      // Store all animations for cleanup
      animationsMTRef.current = [sizeAnimation, colorAnimation, borderRadiusAnimation, opacityAnimation];
    }
  }

  function endAnimation() {
    'main thread';
    // Stop all animations
    animationsMTRef.current.forEach(animation => {
      if (animation && typeof animation.stop === 'function') {
        animation.stop();
      }
    });
    animationsMTRef.current = [];
  }

  useEffect(() => {
    runOnMainThread(startAnimation)();
    return () => {
      runOnMainThread(endAnimation);
    };
  });

  return (
    <view className='case-container'>
      <text className='title'>Complex Properties Tests</text>
      <text className='description'>Testing complex property animations:</text>
      <view className='feature-list'>
        <text className='feature-item'>• Size animations</text>
        <text className='feature-item'>• Color animations</text>
        <text className='feature-item'>• Border radius animations</text>
        <text className='feature-item'>• Opacity animations</text>
      </view>
      <view
        main-thread:ref={boxMTRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#4f46e5',
          borderRadius: '8px',
          opacity: 0.3,
        }}
      >
      </view>
    </view>
  );
}
