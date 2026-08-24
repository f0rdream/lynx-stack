# MainThreadObject real-page benchmark fixture

This temporary fixture records the exact page shapes used to compare the
`MainThreadRef` MotionValue workaround with `MainThreadObject`. It is kept off
the implementation PR because this is a one-time design comparison, not a
long-lived regression workload.

Tested revisions:

- comparison parent: `d8f80cd019ecafddbacb7749e16a3eb293b28727`
- MainThreadObject PR head: `2c05c4e5acaa1b6f8b1af2b4b2ead2664191ed83`

Build the PR-head fixture after the repository-wide install and build:

```sh
pnpm exec rspeedy build --config examples/react-main-thread-function/lynx.benchmark.config.js
```

The three production entries use the same page and native style update:

- `baseline`: an element ref and tap handler, without a reactive value;
- `workaround`: a second `MainThreadRef` populated with a real MotionValue by
  `runOnMainThread` from an effect;
- `object`: the same real MotionValue created by `useMainThreadObject`.

All variants were built from the same checkout and opened in OSS LynxExplorer
(`com.lynx.explorer`) on the same Android 10 `aries_10` device. Production
bundles were served over ADB-reversed localhost. Startup traces used Agent
Lynx/Perfetto with counterbalanced page order. Update latency used 30 identical
taps per reactive implementation. Bundle sizes are exact filesystem bytes and
`gzip -9` bytes.

The packaged Motion shim import is intentional. A source-file import was
tree-shaken in the experiment and left Lynx without `queueMicrotask`; using the
package's declared `dist/polyfill/shim.js` side effect made both variants render.
