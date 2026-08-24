import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import { motionValue } from './MotionRuntime.js' with { runtime: 'shared' };
import { Page } from './Page.jsx';
import { render } from './render.jsx';

type NumberMotionValue = ReturnType<typeof motionValue<number>>;

function App() {
  const boxRef = useMainThreadRef<MainThread.Element>(null);
  const valueRef = useMainThreadRef<NumberMotionValue>(null);

  function initializeValue(initialValue: number) {
    'main thread';
    valueRef.current = motionValue(initialValue);
  }

  useEffect(() => {
    void runOnMainThread(initializeValue)(1);
  }, []);

  function onTap() {
    'main thread';
    const value = valueRef.current;
    if (!value) return;

    const next = value.get() === 1 ? 1.1 : 1;
    value.set(next);
    boxRef.current?.setStyleProperties({ transform: `scale(${next})` });
  }

  return (
    <Page
      label='MainThreadRef workaround'
      boxRef={boxRef}
      onTap={onTap}
    />
  );
}

render(App);
