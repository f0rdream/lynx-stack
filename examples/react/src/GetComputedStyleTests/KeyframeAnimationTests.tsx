import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function KeyframeAnimationTests() {
  const animateMTRef = useMainThreadRef<ReturnType<typeof animate> | null>(null);
  const boxMTRef = useMainThreadRef<MainThread.Element>(null);

  function startAnimation() {
    'main thread';

    if (boxMTRef.current) {
      // Test case: Keyframe animation that needs to read current scale
      // Motion needs to read current scale to properly animate through keyframes
      const scaleKeyframeAnimation = animate(
        boxMTRef.current,
        { 
          scale: [1, 1.2, 0.8, 1.5, 1]
        },
        { 
          duration: 3,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity 
        }
      );

      // Test case: Keyframe animation that needs to read current rotation
      // Motion needs to read current rotation to properly animate through keyframes
      const rotateKeyframeAnimation = animate(
        boxMTRef.current,
        { 
          rotate: ['0deg', '90deg', '180deg', '270deg', '360deg']
        },
        { 
          duration: 4,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity 
        }
      );

      // Test case: Keyframe animation that needs to read current background color
      // Motion needs to read current color to properly interpolate through keyframes
      const colorKeyframeAnimation = animate(
        boxMTRef.current,
        { 
          backgroundColor: ['#8df0cc', '#ff0088', '#0d63f8', '#ffaa00', '#8df0cc']
        },
        { 
          duration: 5,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity 
        }
      );

      // Test case: Keyframe animation that needs to read current position
      // Motion needs to read current position to properly animate through keyframes
      const positionKeyframeAnimation = animate(
        boxMTRef.current,
        { 
          x: [0, 50, -30, 80, 0],
          y: [0, -20, 40, -10, 0]
        },
        { 
          duration: 3.5,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity 
        }
      );

      animateMTRef.current = scaleKeyframeAnimation;
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
      <view
        main-thread:ref={boxMTRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#8df0cc',
          borderRadius: '10px',
          transform: 'scale(1) rotate(0deg) translateX(0px) translateY(0px)',
        }}
      >
      </view>
    </view>
  );
}