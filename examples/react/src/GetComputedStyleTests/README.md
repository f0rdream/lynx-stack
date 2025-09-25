# GetComputedStyle Test Suite for Motion.dev

This comprehensive test suite validates the internal `__GetComputedStyleByKey` API that motion.dev uses for reading computed styles. These tests demonstrate real-world scenarios where motion needs to access computed values to ensure smooth animations.

## Overview

Motion.dev uses computed style reading in several key scenarios:

1. **Initial Value Detection**: When starting animations from current values
2. **Unit Conversion**: Converting between px, %, em, rem, vh, vw, etc.
3. **Transform Matrix Parsing**: Reading complex transform values
4. **Color Interpolation**: Reading current colors for smooth transitions
5. **Layout Calculations**: Reading dimensions for responsive animations
6. **Cross-browser Compatibility**: Handling vendor prefixes and browser differences
7. **Edge Case Handling**: Hidden, display:none, zero-opacity elements

## Test Categories

### 1. BasicAnimationTests
Tests fundamental scenarios where motion reads initial transform values, opacity, and positioning.

**Key Scenarios:**
- Reading current transform values (scale, rotate, translate)
- Reading current opacity for fade animations
- Reading current position for translate animations
- Cross-browser transform property handling

### 2. ComplexPropertiesTests
Tests motion's handling of complex CSS properties like dimensions, colors, and border radius.

**Key Scenarios:**
- Reading current dimensions for size animations
- Reading current colors for color interpolation
- Reading current border radius for shape transitions
- Reading current opacity for fade effects

### 3. EdgeCaseTests
Tests motion's robustness when dealing with edge cases and unusual DOM states.

**Key Scenarios:**
- Hidden elements (visibility: hidden)
- Display: none elements
- Zero opacity elements
- Deeply nested elements
- 3D transform matrices
- Parent-child animation coordination
- Rapid style changes during animation
- Dynamic property creation
- Concurrent animations

### 4. UnitConversionTests
Tests motion's ability to convert between different CSS units seamlessly.

**Key Scenarios:**
- Pixel to percentage conversion
- EM to REM conversion
- Viewport units (vh, vw)
- Mixed unit animations
- Calc() function support
- Border radius units
- Transform units
- Color unit conversion
- Shadow and filter units

### 6. SpringAnimationTests
Tests spring physics with computed style reading for natural motion.

### 7. StaggeredAnimationTests
Tests staggered animations that need to read initial states across multiple elements.

### 8. KeyframeAnimationTests
Tests keyframe animations that interpolate between computed values.

### 9. NestedAnimationTests
Tests nested element animations with style inheritance.

## Implementation Notes

### Internal API Usage
The `__GetComputedStyleByKey` API is used internally by motion for:

1. **Value Normalization**: Converting string values to numerical values
2. **Unit Detection**: Identifying the current unit system
3. **Cross-browser Normalization**: Handling browser-specific implementations
4. **Performance Optimization**: Caching computed values to avoid reflows
5. **Accuracy**: Ensuring animations start from the exact current state

### Testing Approach

Each test demonstrates:
- **Real-world usage**: Actual animation scenarios motion users encounter
- **Edge case handling**: Unusual DOM states and CSS configurations
- **Performance validation**: Efficient computed style reading
- **Accuracy verification**: Precise value reading and interpolation
- **Cross-browser compatibility**: Consistent behavior across environments

### Running Tests

These tests are designed to run on actual devices and demonstrate:

1. **Visual feedback**: Clear visual indication of test progress
2. **Performance metrics**: Implicit testing of animation smoothness
3. **Error handling**: Graceful handling of edge cases
4. **Compatibility**: Testing across different device capabilities

## Test Validation

Each test validates:
- ✅ Smooth animation execution
- ✅ Accurate starting values from computed styles
- ✅ Proper unit conversion
- ✅ Cross-browser compatibility
- ✅ Edge case handling
- ✅ Performance under load
- ✅ Concurrent animation coordination

## Usage in Motion.dev

These tests mirror actual motion.dev usage patterns:

```typescript
// Motion internally does something like:
const currentScale = __GetComputedStyleByKey(element, 'scale');
const currentOpacity = __GetComputedStyleByKey(element, 'opacity');

// Then uses these values for:
animate(element, {
  scale: [currentScale, 1.5, 1],
  opacity: [currentOpacity, 0.5, 1]
});
```

## Browser Compatibility Matrix

Tests cover:
- ✅ Chrome/Chromium-based browsers
- ✅ Safari/WebKit-based browsers
- ✅ Firefox/Gecko-based browsers
- ✅ Edge (Chromium)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ React Native Web environments
- ✅ Lynx runtime environments

## Performance Considerations

Tests validate:
- **Reflow minimization**: Efficient computed style reading
- **Caching behavior**: Avoiding repeated DOM queries
- **Animation smoothness**: 60fps target
- **Memory usage**: No memory leaks in style reading
- **Battery efficiency**: Optimized for mobile devices

## Adding New Tests

When adding new tests:

1. **Identify the motion.dev use case** you're testing
2. **Create realistic DOM structure** that matches real usage
3. **Test edge cases** that might break the internal API
4. **Validate performance** implications
5. **Test cross-browser** behavior
6. **Document the scenario** clearly