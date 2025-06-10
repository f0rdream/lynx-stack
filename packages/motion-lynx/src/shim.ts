// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import { document, setupDocument } from '@lynx-js/react/internal/document';

if (__MAIN_THREAD__) {
  setupDocument();

  const performance = {
    now: () => Date.now(),
  };

  function queueMicrotask(fn: CallableFunction) {
    void Promise.resolve().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      fn();
    });
  }

  class NodeList {}

  class SVGElement {}

  const window = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    getComputedStyle: (ele: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ele.getComputedStyle();
    },
  };

  class HTMLElement {}

  // @ts-expect-error error
  globalThis.document = document;
  // @ts-expect-error error
  globalThis.performance = performance;
  globalThis.queueMicrotask = queueMicrotask;
  // @ts-expect-error error
  document.querySelector = lynx.querySelector;
  // @ts-expect-error error
  document.querySelectorAll = lynx.querySelectorAll;
  // @ts-expect-error error
  globalThis.NodeList = NodeList;
  // @ts-expect-error error
  globalThis.SVGElement = SVGElement;
  // @ts-expect-error error
  globalThis.window = window;
  // @ts-expect-error error
  globalThis.HTMLElement = HTMLElement;
}
