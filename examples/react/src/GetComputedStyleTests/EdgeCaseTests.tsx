import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function EdgeCaseTests() {
  const animationsMTRef = useMainThreadRef<ReturnType<typeof animate>[]>([]);
  const testElementsRef = useMainThreadRef<{
    hiddenElement: MainThread.Element | null;
    displayNoneElement: MainThread.Element | null;
    zeroOpacityElement: MainThread.Element | null;
    nestedElement: MainThread.Element | null;
    transform3dElement: MainThread.Element | null;
    animatedParent: MainThread.Element | null;
  }>({
    hiddenElement: null,
    displayNoneElement: null,
    zeroOpacityElement: null,
    nestedElement: null,
    transform3dElement: null,
    animatedParent: null,
  });

  function startEdgeCaseTests() {
    'main thread';

    const elements = testElementsRef.current;
    if (!elements) return;

    const animations: ReturnType<typeof animate>[] = [];

    // Test 1: Hidden Elements (visibility: hidden)
    if (elements.hiddenElement) {
      const animation = animate(
        elements.hiddenElement,
        {
          scale: [1, 1.5, 1],
          opacity: [0, 1, 0]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 2: Display: none elements
    if (elements.displayNoneElement) {
      setTimeout(() => {
        if (elements.displayNoneElement) {
          const animation = animate(
            elements.displayNoneElement,
            {
              translateY: [50, 0],
              opacity: [0, 1]
            },
            { duration: 1, ease: 'ease-out' }
          );
          animations.push(animation);
        }
      }, 1000);
    }

    // Test 3: Zero opacity elements
    if (elements.zeroOpacityElement) {
      const animation = animate(
        elements.zeroOpacityElement,
        {
          opacity: [0, 1, 0.5, 1],
          scale: [0.8, 1.1, 1]
        },
        { duration: 2.5, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 4: Deeply nested elements
    if (elements.nestedElement) {
      const animation = animate(
        elements.nestedElement,
        {
          translateX: [0, 100, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 5: Complex 3D transforms
    if (elements.transform3dElement) {
      const animation = animate(
        elements.transform3dElement,
        {
          rotateX: [0, 180, 360],
          rotateY: [0, 90, 180],
          rotateZ: [0, 45, 90],
          translateZ: [0, 50, 0]
        },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 6: Parent animation
    if (elements.animatedParent) {
      const animation = animate(
        elements.animatedParent,
        {
          scale: [1, 1.5, 1],
          rotate: [0, 45, 0]
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 7: Rapid style changes during animation
    if (elements.zeroOpacityElement) {
      const animation = animate(
        elements.zeroOpacityElement,
        {
          borderRadius: ['0%', '50%', '0%'],
          borderWidth: [1, 5, 1]
        },
        { duration: 2, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 8: Concurrent animations
    const elementsToAnimate = [
      elements.hiddenElement,
      elements.zeroOpacityElement,
      elements.nestedElement
    ].filter(Boolean) as MainThread.Element[];

    elementsToAnimate.forEach((element, index) => {
      const delay = index * 0.5;
      const animation = animate(
        element,
        {
          translateY: [20, -20, 20],
          scale: [0.9, 1.1, 0.9]
        },
        { duration: 2, delay, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    });

    // Store all animations for cleanup
    animationsMTRef.current = animations;
  }

  function endEdgeCaseTests() {
    'main thread';
    // Stop all animations
    animationsMTRef.current.forEach(animation => {
      if (animation && typeof animation.stop === 'function') {
        animation.stop();
      }
    });
    animationsMTRef.current = [];
  }

  useEffect(() => {
    runOnMainThread(startEdgeCaseTests)();
    return () => {
      runOnMainThread(endEdgeCaseTests);
    };
  });

  return (
    <view className='case-container'>
      <text className='title'>Edge Case Tests</text>
      <text className='description'>Testing motion's internal computed style handling in edge cases:</text>
      
      <view className='edge-case-grid'>
        {/* Hidden Element */}
        <view className='test-card'>
          <text className='test-title'>Hidden Element</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.hiddenElement = el}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#ef4444',
              visibility: 'hidden'
            }}
          />
        </view>

        {/* Display None Element */}
        <view className='test-card'>
          <text className='test-title'>Display: None</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.displayNoneElement = el}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#3b82f6',
              display: 'none'
            }}
          />
        </view>

        {/* Zero Opacity Element */}
        <view className='test-card'>
          <text className='test-title'>Zero Opacity</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.zeroOpacityElement = el}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#10b981',
              opacity: 0
            }}
          />
        </view>

        {/* Nested Element */}
        <view className='test-card'>
          <text className='test-title'>Nested Element</text>
          <view style={{ padding: '10px', border: '1px solid #e5e7eb' }}>
            <view
              main-thread:ref={(el) => testElementsRef.current.nestedElement = el}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#8b5cf6'
              }}
            />
          </view>
        </view>

        {/* 3D Transform Element */}
        <view className='test-card'>
          <text className='test-title'>3D Transform</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.transform3dElement = el}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#f59e0b',
              transform: 'perspective(100px) rotateX(15deg) rotateY(15deg)'
            }}
          />
        </view>

        {/* Parent-Child Animation */}
        <view className='test-card'>
          <text className='test-title'>Parent-Child</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.animatedParent = el}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#ec4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <view
              className='child-element'
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#fbbf24'
              }}
            />
          </view>
        </view>
      </view>
    </view>
  );
}