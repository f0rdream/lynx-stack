import { animate } from '@lynx-js/motion-lynx';
import { runOnMainThread, useEffect, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

export default function UnitConversionTests() {
  const animationsMTRef = useMainThreadRef<ReturnType<typeof animate>[]>([]);
  const testElementsRef = useMainThreadRef<{
    pxElement: MainThread.Element | null;
    percentElement: MainThread.Element | null;
    emElement: MainThread.Element | null;
    remElement: MainThread.Element | null;
    vhElement: MainThread.Element | null;
    vwElement: MainThread.Element | null;
    container: MainThread.Element | null;
  }>({
    pxElement: null,
    percentElement: null,
    emElement: null,
    remElement: null,
    vhElement: null,
    vwElement: null,
    container: null,
  });

  function startUnitConversionTests() {
    'main thread';

    const elements = testElementsRef.current;
    if (!elements) return;

    const animations: ReturnType<typeof animate>[] = [];

    // Test 1: Pixel to Percentage Conversion
    if (elements.pxElement && elements.container) {
      const animation = animate(
        elements.pxElement,
        {
          width: ['100px', '50%', '100px'],
          height: ['100px', '50%', '100px'],
          left: ['0px', '25%', '0px'],
          top: ['0px', '25%', '0px']
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 2: Percentage to Pixel Conversion
    if (elements.percentElement && elements.container) {
      const animation = animate(
        elements.percentElement,
        {
          width: ['50%', '150px', '50%'],
          height: ['50%', '100px', '50%'],
          left: ['25%', '50px', '25%'],
          top: ['25%', '30px', '25%']
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 3: EM to REM Conversion
    if (elements.emElement && elements.remElement) {
      const emAnimation = animate(
        elements.emElement,
        {
          fontSize: ['1em', '2em', '1em'],
          width: ['2em', '4em', '2em'],
          height: ['1.5em', '3em', '1.5em']
        },
        { duration: 2.5, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(emAnimation);

      const remAnimation = animate(
        elements.remElement,
        {
          fontSize: ['1rem', '1.5rem', '1rem'],
          width: ['3rem', '5rem', '3rem'],
          height: ['2rem', '3rem', '2rem']
        },
        { duration: 2.5, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(remAnimation);
    }

    // Test 4: Viewport Units
    if (elements.vhElement && elements.vwElement) {
      const vhAnimation = animate(
        elements.vhElement,
        {
          height: ['10vh', '20vh', '10vh'],
          width: ['15vw', '30vw', '15vw'],
          translateY: ['0vh', '5vh', '0vh']
        },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(vhAnimation);

      const vwAnimation = animate(
        elements.vwElement,
        {
          width: ['10vw', '25vw', '10vw'],
          height: ['10vh', '15vh', '10vh'],
          translateX: ['0vw', '10vw', '0vw']
        },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(vwAnimation);
    }

    // Test 5: Mixed Unit Animations
    if (elements.container) {
      const mixedElement = elements.container.querySelector('.mixed-unit-element');
      if (mixedElement) {
        const animation = animate(
          mixedElement,
          {
            left: ['0px', '50%', '100px', '0px'],
            top: ['0px', '2em', '5vh', '0px'],
            width: ['50px', '25%', '3rem', '50px'],
            height: ['50px', '30%', '2em', '50px']
          },
          { duration: 5, repeat: Number.POSITIVE_INFINITY }
        );
        animations.push(animation);
      }
    }

    // Test 6: Border Radius Units
    if (elements.pxElement) {
      const animation = animate(
        elements.pxElement,
        {
          borderRadius: [
            '0px',
            '10px',
            '50%',
            '25px',
            '0px'
          ],
          borderTopLeftRadius: ['0px', '20px', '50%', '20px', '0px'],
          borderBottomRightRadius: ['0px', '15px', '25%', '15px', '0px']
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 7: Transform Units
    if (elements.percentElement) {
      const animation = animate(
        elements.percentElement,
        {
          translateX: ['0px', '100px', '50%', '0px'],
          translateY: ['0px', '50px', '25%', '0px'],
          rotate: ['0deg', '180deg', '1turn', '0deg'],
          scale: [1, 1.5, 0.5, 1]
        },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 8: Color Unit Conversion
    if (elements.emElement) {
      const animation = animate(
        elements.emElement,
        {
          backgroundColor: [
            '#ff0000',
            'rgb(255, 0, 0)',
            'rgba(255, 0, 0, 0.5)',
            'hsl(0, 100%, 50%)',
            '#ff0000'
          ],
          borderColor: [
            '#0000ff',
            'rgb(0, 0, 255)',
            'rgba(0, 0, 255, 0.7)',
            'hsl(240, 100%, 50%)',
            '#0000ff'
          ]
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Test 9: Shadow and Filter Units
    if (elements.remElement) {
      const animation = animate(
        elements.remElement,
        {
          boxShadow: [
            '0px 0px 0px rgba(0,0,0,0)',
            '5px 5px 10px rgba(0,0,0,0.3)',
            '10px 10px 20px rgba(255,0,0,0.5)',
            '0px 0px 0px rgba(0,0,0,0)'
          ],
          filter: [
            'blur(0px) brightness(1)',
            'blur(2px) brightness(1.2)',
            'blur(0px) brightness(0.8)',
            'blur(0px) brightness(1)'
          ]
        },
        { duration: 3, repeat: Number.POSITIVE_INFINITY }
      );
      animations.push(animation);
    }

    // Store all animations for cleanup
    animationsMTRef.current = animations;
  }

  function endUnitConversionTests() {
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
    runOnMainThread(startUnitConversionTests)();
    return () => {
      runOnMainThread(endUnitConversionTests);
    };
  });

  return (
    <view className='case-container'>
      <text className='title'>Unit Conversion Tests</text>
      <text className='description'>Testing motion's internal unit conversion for computed styles:</text>
      
      <view className='unit-test-grid'>
        {/* Pixel Units */}
        <view className='unit-test-section'>
          <text className='unit-label'>Pixel Units</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.pxElement = el}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#ef4444',
              position: 'relative'
            }}
          />
        </view>

        {/* Percentage Units */}
        <view className='unit-test-section'>
          <text className='unit-label'>Percentage Units</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.percentElement = el}
            style={{
              width: '50%',
              height: '50%',
              backgroundColor: '#3b82f6'
            }}
          />
        </view>

        {/* EM Units */}
        <view className='unit-test-section'>
          <text className='unit-label'>EM Units</text>
          <text
            main-thread:ref={(el) => testElementsRef.current.emElement = el}
            style={{
              fontSize: '1em',
              backgroundColor: '#10b981',
              padding: '1em'
            }}
          >
            EM Test
          </text>
        </view>

        {/* REM Units */}
        <view className='unit-test-section'>
          <text className='unit-label'>REM Units</text>
          <text
            main-thread:ref={(el) => testElementsRef.current.remElement = el}
            style={{
              fontSize: '1rem',
              backgroundColor: '#8b5cf6',
              padding: '1rem'
            }}
          >
            REM Test
          </text>
        </view>

        {/* Viewport Units */}
        <view className='unit-test-section'>
          <text className='unit-label'>Viewport Units</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.vhElement = el}
            style={{
              width: '10vw',
              height: '10vh',
              backgroundColor: '#f59e0b'
            }}
          />
          <view
            main-thread:ref={(el) => testElementsRef.current.vwElement = el}
            style={{
              width: '10vw',
              height: '10vh',
              backgroundColor: '#ec4899'
            }}
          />
        </view>

        {/* Container for mixed units */}
        <view className='unit-test-section'>
          <text className='unit-label'>Mixed Units</text>
          <view
            main-thread:ref={(el) => testElementsRef.current.container = el}
            style={{
              width: '300px',
              height: '200px',
              border: '1px solid #e5e7eb',
              position: 'relative'
            }}
          >
            <view
              className='mixed-unit-element'
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#fbbf24',
                position: 'absolute',
                top: '10px',
                left: '10px'
              }}
            />
          </view>
        </view>
      </view>
    </view>
  );
}