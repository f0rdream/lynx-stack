import { useState, useEffect, runOnBackground } from '@lynx-js/react';
import { runOnMainThread, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

interface TestResult {
  test: string;
  expected: string;
  actual: string;
  passed: boolean;
}

// Extend the Element type to include getStyleProperty and comprehensive CSS properties
declare global {
  namespace MainThread {
    interface Element {
      getStyleProperty: (name: string) => string;
      setStyleProperty: (name: string, value: string) => void;
      
      // Layout properties
      width: string;
      height: string;
      minWidth: string;
      minHeight: string;
      maxWidth: string;
      maxHeight: string;
      
      // Positioning
      position: string;
      top: string;
      left: string;
      right: string;
      bottom: string;
      zIndex: string;
      
      // Box model
      margin: string;
      marginTop: string;
      marginRight: string;
      marginBottom: string;
      marginLeft: string;
      padding: string;
      paddingTop: string;
      paddingRight: string;
      paddingBottom: string;
      paddingLeft: string;
      
      // Background & Colors
      backgroundColor: string;
      backgroundImage: string;
      backgroundPosition: string;
      backgroundSize: string;
      backgroundRepeat: string;
      color: string;
      opacity: string;
      
      // Border
      border: string;
      borderWidth: string;
      borderStyle: string;
      borderColor: string;
      borderRadius: string;
      borderTop: string;
      borderRight: string;
      borderBottom: string;
      borderLeft: string;
      
      // Typography
      fontSize: string;
      fontFamily: string;
      fontWeight: string;
      fontStyle: string;
      lineHeight: string;
      textAlign: string;
      textDecoration: string;
      letterSpacing: string;
      
      // Flexbox
      display: string;
      flex: string;
      flexDirection: string;
      justifyContent: string;
      alignItems: string;
      alignSelf: string;
      flexWrap: string;
      
      // Grid
      gridTemplateColumns: string;
      gridTemplateRows: string;
      gridColumn: string;
      gridRow: string;
      gap: string;
      
      // Transform
      transform: string;
      transformOrigin: string;
      transition: string;
      transitionDuration: string;
      transitionProperty: string;
      transitionTimingFunction: string;
      
      // Shadow & Effects
      boxShadow: string;
      filter: string;
      backdropFilter: string;
      
      // Overflow
      overflow: string;
      overflowX: string;
      overflowY: string;
    }
  }
}

export default function StylePropertyApiTests() {
  const testElementRef = useMainThreadRef<MainThread.Element>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [allPassed, setAllPassed] = useState<boolean>(false);

  function runTests() {
    'main thread';

    if (!testElementRef.current) {
      return;
    }

    const results: TestResult[] = [];
    const element = testElementRef.current;

    // Helper function to add test results
    function addTest(test: string, expected: string, actual: string) {
      const passed = expected === actual || (expected === "" && actual === "");
      results.push({ test, expected, actual, passed });
    }

    try {
      // === COMPREHENSIVE PROPERTY TESTING (KEBAB-CASE ONLY) ===
        
        // Layout Properties
        addTest("Layout - width", "150px", element.getStyleProperty('width'));
        addTest("Layout - height", "100px", element.getStyleProperty('height'));
        addTest("Layout - min-width", "100px", element.getStyleProperty('min-width'));
        addTest("Layout - max-width", "200px", element.getStyleProperty('max-width'));

        // Positioning Properties
        addTest("Positioning - position", "relative", element.getStyleProperty('position'));
        addTest("Positioning - top", "0px", element.getStyleProperty('top'));
        addTest("Positioning - left", "0px", element.getStyleProperty('left'));
        addTest("Positioning - z-index", "1", element.getStyleProperty('z-index'));

        // Box Model - Margin
        addTest("Margin - margin", "10px", element.getStyleProperty('margin'));
        addTest("Margin - margin-top", "5px", element.getStyleProperty('margin-top'));
        addTest("Margin - margin-right", "15px", element.getStyleProperty('margin-right'));
        addTest("Margin - margin-bottom", "5px", element.getStyleProperty('margin-bottom'));
        addTest("Margin - margin-left", "15px", element.getStyleProperty('margin-left'));

        // Box Model - Padding
        addTest("Padding - padding", "8px", element.getStyleProperty('padding'));
        addTest("Padding - padding-top", "4px", element.getStyleProperty('padding-top'));
        addTest("Padding - padding-bottom", "4px", element.getStyleProperty('padding-bottom'));

        // Background & Colors
        addTest("Background - background-color", "rgb(141, 240, 204)", element.getStyleProperty('background-color'));
        addTest("Background - background-image", "linear-gradient(45deg, rgb(141, 240, 204), rgb(111, 212, 164))", element.getStyleProperty('background-image'));
        addTest("Background - background-size", "cover", element.getStyleProperty('background-size'));
        addTest("Background - background-position", "center", element.getStyleProperty('background-position'));
        addTest("Background - background-repeat", "no-repeat", element.getStyleProperty('background-repeat'));
        addTest("Colors - color", "rgb(51, 51, 51)", element.getStyleProperty('color'));
        addTest("Colors - opacity", "0.9", element.getStyleProperty('opacity'));

        // Border Properties
        addTest("Border - border", "2px solid rgb(76, 175, 80)", element.getStyleProperty('border'));
        addTest("Border - border-width", "2px", element.getStyleProperty('border-width'));
        addTest("Border - border-style", "solid", element.getStyleProperty('border-style'));
        addTest("Border - border-color", "rgb(76, 175, 80)", element.getStyleProperty('border-color'));
        addTest("Border - border-radius", "8px", element.getStyleProperty('border-radius'));
        addTest("Border - border-top", "1px solid rgb(56, 142, 60)", element.getStyleProperty('border-top'));
        addTest("Border - border-right", "1px solid rgb(56, 142, 60)", element.getStyleProperty('border-right'));

        // Typography
        addTest("Typography - font-size", "14px", element.getStyleProperty('font-size'));
        addTest("Typography - font-family", "Arial, sans-serif", element.getStyleProperty('font-family'));
        addTest("Typography - font-weight", "bold", element.getStyleProperty('font-weight'));
        addTest("Typography - font-style", "normal", element.getStyleProperty('font-style'));
        addTest("Typography - line-height", "1.5", element.getStyleProperty('line-height'));
        addTest("Typography - text-align", "center", element.getStyleProperty('text-align'));
        addTest("Typography - text-decoration", "none", element.getStyleProperty('text-decoration'));
        addTest("Typography - letter-spacing", "0.5px", element.getStyleProperty('letter-spacing'));

        // Flexbox
        addTest("Flexbox - display", "flex", element.getStyleProperty('display'));
        addTest("Flexbox - flex-direction", "column", element.getStyleProperty('flex-direction'));
        addTest("Flexbox - justify-content", "center", element.getStyleProperty('justify-content'));
        addTest("Flexbox - align-items", "center", element.getStyleProperty('align-items'));
        addTest("Flexbox - align-self", "auto", element.getStyleProperty('align-self'));

        // === COMPREHENSIVE TRANSFORM TESTING (MATRIX FORMAT) ===
        
        // Basic Transform Functions (Matrix Format)
        addTest("Transform - transform", "matrix format", element.getStyleProperty('transform'));

        // Batch transform testing
        const transformTests = [
          'translateX(50px)',
          'translateY(75px)',
          'translateZ(100px)',
          'rotateX(45deg)',
          'rotateY(60deg)',
          'rotateZ(90deg)',
          'scale(1.5)',
          'scaleX(1.2)',
          'scaleY(0.8)',
          'scaleZ(1.1)',
          'skewX(15deg)',
          'skewY(10deg)',
          'translate3d(10px, 20px, 30px)',
          'rotate3d(1, 1, 1, 45deg)',
          'scale3d(1.2, 0.9, 1.1)',
          'matrix(1, 0, 0, 1, 0, 0)',
          'translate3d(10px, 20px, 30px) rotate3d(1, 1, 1, 45deg) scale3d(1.2, 0.9, 1.1)'
        ];

        transformTests.forEach((value, index) => {
          element.setStyleProperty('transform', value);
          const result = element.getStyleProperty('transform');
          const testName = value.length > 30 ? `transform-${index + 1}` : value.split('(')[0];
          addTest(`Transform - ${testName}`, "matrix format", result);
        });

        // Perspective Testing
        const perspective = element.getStyleProperty('perspective');
        addTest("Transform - perspective", "1000px", perspective);

        // // Transform Origin Testing
        // const transformOrigin = element.getStyleProperty('transform-origin');
        // addTest("Transform - transform-origin", "50% 50% 0", transformOrigin);

        // Transition Testing
        const transition = element.getStyleProperty('transition');
        addTest("Transition - transition", "all 0.3s ease 0s", transition);

        const transitionDuration = element.getStyleProperty('transition-duration');
        addTest("Transition - transition-duration", "0.3s", transitionDuration);

        const transitionProperty = element.getStyleProperty('transition-property');
        addTest("Transition - transition-property", "transform", transitionProperty);

        const transitionTimingFunction = element.getStyleProperty('transition-timing-function');
        addTest("Transition - transition-timing-function", "ease", transitionTimingFunction);

        // Shadow & Effects
        addTest("Effects - box-shadow", "rgba(0, 0, 0, 0.1) 0px 2px 4px 0px", element.getStyleProperty('box-shadow'));
        addTest("Effects - filter", "brightness(1)", element.getStyleProperty('filter'));

        // Overflow
        addTest("Overflow - overflow", "hidden", element.getStyleProperty('overflow'));
        addTest("Overflow - overflow-x", "visible", element.getStyleProperty('overflow-x'));
        addTest("Overflow - overflow-y", "visible", element.getStyleProperty('overflow-y'));

        // Edge Cases
        addTest("Edge cases - non-existent", "", element.getStyleProperty('non-existent-property'));

        // === CONSISTENCY CHECKS ===
        const consistencyTests = [
          { name: 'width', direct: element.width, property: element.getStyleProperty('width') },
          { name: 'height', direct: element.height, property: element.getStyleProperty('height') },
          { name: 'background-color', direct: element.backgroundColor, property: element.getStyleProperty('background-color') },
          { name: 'color', direct: element.color, property: element.getStyleProperty('color') },
          { name: 'font-size', direct: element.fontSize, property: element.getStyleProperty('font-size') },
          { name: 'opacity', direct: element.opacity, property: element.getStyleProperty('opacity') },
          { name: 'position', direct: element.position, property: element.getStyleProperty('position') },
          { name: 'margin', direct: element.margin, property: element.getStyleProperty('margin') },
        ];

      consistencyTests.forEach(({ name, direct, property }) => {
        const match = direct === property;
        addTest(`Consistency - ${name}`, direct, property);
      });

      // === DYNAMIC STYLE TESTING ===
      const originalHeight = element.getStyleProperty('height');
      element.setStyleProperty('height', '250px');
      const newHeight = element.getStyleProperty('height');
      addTest("Dynamic - height after setStyleProperty", "250px", newHeight);
      
      // Reset to original
      element.setStyleProperty('height', originalHeight);
      const resetHeight = element.getStyleProperty('height');
      addTest("Dynamic - height after reset", originalHeight, resetHeight);

      const allTestsPassed = results.every(r => r.passed);
      
      void runOnBackground((results) => {
        setTestResults(results);
        setAllPassed(results.every(r => r.passed));
      })(results);

    } catch (error) {
      results.push({
        test: "Error occurred",
        expected: "No error",
        actual: error instanceof Error ? error.message : String(error),
        passed: false
      });
      
      void runOnBackground((results) => {
        setTestResults(results);
        setAllPassed(false);
      })(results);
    }
  }

  useEffect(() => {
    // Run tests after component mounts and styles are applied
    const timer = setTimeout(() => {
      void runOnMainThread(runTests)();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <scroll-view className='case-container' scroll-y={true}>
      <view className="test-description">
        <text>Testing getStyleProperty API (uses __GetComputedStyleByKey internally):</text>
        <text>• Validates style property reading functionality</text>
        <text>• Tests consistency between direct access and getStyleProperty</text>
        <text>• Verifies edge cases and error handling</text>
      </view>

      <view
        main-thread:ref={testElementRef}
        style={{
          // Layout
          width: '150px',
          height: '100px',
          minWidth: '100px',
          maxWidth: '200px',
          
          
          // Box model
          margin: '10px',
          marginTop: '5px',
          marginRight: '15px',
          marginBottom: '5px',
          marginLeft: '15px',
          padding: '8px',
          paddingTop: '4px',
          paddingBottom: '4px',
          
          // Background & Colors
          backgroundColor: '#8df0cc',
          backgroundImage: 'linear-gradient(45deg, #8df0cc, #6fd4a4)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#333',
          opacity: 0.9,
          
          // Border
          border: '2px solid #4CAF50',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#4CAF50',
          borderRadius: '8px',
          borderTop: '1px solid #388E3C',
          borderRight: '1px solid #388E3C',
          
          // Typography
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fontStyle: 'normal',
          lineHeight: '1.5',
          textAlign: 'center',
          textDecoration: 'none',
          letterSpacing: '0.5px',
          
          // Flexbox
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'auto',
          
          // Transform
          transform: 'scale(1) rotate(0deg)',
          transformOrigin: 'center center',
          transition: 'all 0.3s ease',
          transitionDuration: '0.3s',
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease',
          
          // Shadow & Effects
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          filter: 'brightness(1)',
          
          // Overflow
          overflow: 'hidden',
          overflowX: 'visible',
          overflowY: 'visible',
        }}
      >
        <text style={{ color: '#333', fontSize: '14px' }}>Comprehensive Test Element</text>
      </view>

      <view className="test-results">
        <text style={{ 
          fontWeight: 'bold', 
          marginTop: '20px',
          color: allPassed ? '#00aa00' : '#aa0000'
        }}>
          {allPassed ? '✅ All Tests Passed!' : '❌ Some Tests Failed'}
        </text>
        
        {testResults.map((result, index) => (
          <view 
            key={index} 
            style={{
              marginTop: '8px',
              padding: '5px',
              backgroundColor: result.passed ? '#e8f5e8' : '#ffe8e8',
              borderRadius: '4px',
            }}
          >
            <text style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {index + 1}. {result.test}
            </text>
            <text style={{ fontSize: '11px', marginTop: '2px' }}>
              Expected: "{result.expected}" | Actual: "{result.actual}"
            </text>
            <text style={{ 
              fontSize: '11px', 
              color: result.passed ? '#006600' : '#660000',
              fontWeight: 'bold'
            }}>
              {result.passed ? '✅ PASS' : '❌ FAIL'}
            </text>
          </view>
        ))}
      </view>

      <view 
        style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#4CAF50',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
        bindtap={() => void runOnMainThread(runTests)}
      >
        <text style={{ 
          textAlign: 'center', 
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          🔄 Re-run Tests
        </text>
      </view>
    </scroll-view>
  );
}
