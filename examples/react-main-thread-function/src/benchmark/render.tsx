import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

export function render(App: () => JSX.Element) {
  root.render(<App />);
}
