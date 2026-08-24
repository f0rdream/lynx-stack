import type { MainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import '../App.css';
import reactLynxLogo from '../assets/react-logo.png';

interface Props {
  label: string;
  boxRef: MainThreadRef<MainThread.Element>;
  onTap: () => void;
}

export function Page({ label, boxRef, onTap }: Props) {
  return (
    <view className='App'>
      <image
        src={reactLynxLogo}
        className='Logo--react'
        main-thread:ref={boxRef}
        main-thread:bindtap={onTap}
      />
      <text className='Description'>{label}</text>
    </view>
  );
}
