import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function BasicAnimationTests() {
  const animateMTRef = useMainThreadRef<ReturnType<typeof animate> | null>(null);
  const boxMTRef = useMainThreadRef<MainThread.Element>(null);

  function startAnimation() {
    'main thread';

    if (boxMTRef.current) {
      // Test case: Animation that starts from current state
      // Motion handles relative animations internally
      const scaleAnimation = animate(
        boxMTRef.current,
        { 
          scale: [1, 1.5, 1]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Rotate animation
      const rotateAnimation = animate(
        boxMTRef.current,
        { 
          rotate: ['0deg', '180deg', '360deg']
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Translate animation
      const translateAnimation = animate(
        boxMTRef.current,
        { 
          translateX: [0, 50, 0],
          translateY: [0, 30, 0]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      // Test case: Opacity animation
      const opacityAnimation = animate(
        boxMTRef.current,
        { 
          opacity: [1, 0.5, 1]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );

      animateMTRef.current = scaleAnimation;
    }
  }

  function endAnimation() {
    'main thread';
    animateMTRef.current?.stop();
  }

  useEffect(() => {
    runOnMainThread(startAnimation)();
    return () => {
      runOnMainThread(endAnimation);
    };
  });

  return (
    <view className='case-container'>
      <view className="test-description">
        <text>Testing basic animation scenarios:</text>
        <text>• Scale animations from current state</text>
        <text>• Rotate animations</text>
        <text>• Translate animations</text>
        <text>• Opacity animations</text>
      </view>
      <view
        main-thread:ref={boxMTRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#8df0cc',
          borderRadius: '10px',
          opacity: 0.8,
          transform: 'scale(1) rotate(0deg) translateX(0px) translateY(0px)',
        }}
      >
      </view>
    </view>
  );
}