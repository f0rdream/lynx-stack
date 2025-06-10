import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import './styles.css';
import { animate } from '@lynx-js/motion-lynx';
import type { MainThread } from '@lynx-js/types';

export default function Basic() {
  const animateMTRef = useMainThreadRef<ReturnType<typeof animate> | null>(
    null,
  );
  const boxMTRef = useMainThreadRef<MainThread.Element>(null);

  function startAnimation() {
    'main thread';

    if (boxMTRef.current) {
      animateMTRef.current = animate(
        boxMTRef.current,
        {
          backgroundColor: ['#ff0088', '#0d63f8'],
        },
        {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        },
      );
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
        }}
      >
      </view>
    </view>
  );
}
