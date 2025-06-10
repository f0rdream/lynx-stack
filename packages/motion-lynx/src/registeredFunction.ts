// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { useMemo, useRef } from '@lynx-js/react';

const registeredCallableMap = new Map(); // Regular Map for primitive keys
let globalIdCounter = 0;

export function registerCallable(func: CallableFunction): number {
  registeredCallableMap.set(++globalIdCounter, func);

  return globalIdCounter;
}

// Custom hook with auto-incrementing ID
export function useRegistered(func: CallableFunction): number {
  const idRef = useRef<number>(globalIdCounter);

  // Generate ID only once per component instance
  idRef.current ??= ++globalIdCounter;

  useMemo(() => {
    if (__MAIN_THREAD__) {
      registeredCallableMap.set(idRef.current, func);

      return () => {
        registeredCallableMap.delete(idRef.current);
      };
    }
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    return () => {};
  }, [func]);

  return idRef.current;
}

function runOnRegistered(id: number) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const func = registeredCallableMap.get(id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return func;
}

// @ts-expect-error error
globalThis.runOnRegistered = runOnRegistered;
