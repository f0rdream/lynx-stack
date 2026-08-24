import { useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import { Page } from './Page.jsx';
import { render } from './render.jsx';

function App() {
  const boxRef = useMainThreadRef<MainThread.Element>(null);

  function onTap() {
    'main thread';
    boxRef.current?.setStyleProperties({ transform: 'scale(1.1)' });
  }

  return <Page label='No reactive value' boxRef={boxRef} onTap={onTap} />;
}

render(App);
