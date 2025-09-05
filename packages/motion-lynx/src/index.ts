// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import './shim.js';

import { animate, stagger } from 'motion';

import { registerCallable } from './registeredFunction.js';

let animateHandle = 1;
let staggerHandle = 2;

if (__MAIN_THREAD__) {
  animateHandle = registerCallable(animate, 1);
  staggerHandle = registerCallable(stagger, 2);
}

function animateMT(
  ...args: Parameters<typeof animate>
): ReturnType<typeof animate> {
  'main thread';
  // @ts-expect-error error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return runOnRegistered(animateHandle)(...args);
}

function staggerMT(
  ...args: Parameters<typeof stagger>
): ReturnType<typeof stagger> {
  'main thread';
  // @ts-expect-error error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return runOnRegistered(staggerHandle)(...args);
}

export { animateMT as animate, staggerMT as stagger };
