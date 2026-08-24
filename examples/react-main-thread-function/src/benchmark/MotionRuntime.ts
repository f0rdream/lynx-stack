// Import the packaged side-effect shim. Importing its source file directly can
// be removed by tree shaking because the package's sideEffects declaration is
// expressed in terms of dist/polyfill/shim.js.
import '../../../../packages/motion/dist/polyfill/shim.js';

export { motionValue } from '../../../../packages/motion/dist/polyfill/MotionValue.js';
