import {
  defineMainThreadObjectType,
  useMainThreadObject,
  useMainThreadRef,
} from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import { motionValue } from './MotionRuntime.js' with { runtime: 'shared' };
import { Page } from './Page.jsx';
import { render } from './render.jsx';

type NumberMotionValue = ReturnType<typeof motionValue<number>>;

const motionValueType = defineMainThreadObjectType<number, NumberMotionValue>({
  type: '@lynx-js/benchmark/MotionValue',
  create(initialValue) {
    'main thread';
    return motionValue(initialValue);
  },
});

function App() {
  const boxRef = useMainThreadRef<MainThread.Element>(null);
  const value = useMainThreadObject(motionValueType, 1);

  function onTap() {
    'main thread';
    const next = value.get() === 1 ? 1.1 : 1;
    value.set(next);
    boxRef.current?.setStyleProperties({ transform: `scale(${next})` });
  }

  return <Page label='MainThreadObject' boxRef={boxRef} onTap={onTap} />;
}

render(App);
