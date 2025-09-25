import { useState, useEffect } from '@lynx-js/react';
import { runOnMainThread, useMainThreadRef, runOnBackground } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

import './styles.css';

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

export default function StylePropertyTests() {
  const testBoxRef = useMainThreadRef<MainThread.Element>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  async function runStylePropertyTests() {
    'main thread';

    if (!testBoxRef.current) {
      return;
    }

    const results: string[] = [];

    try {
      const element = testBoxRef.current;

      // === BASIC LAYOUT PROPERTIES ===
      const width = element.getStyleProperty('width');
      results.push(`✓ width: ${width} (expected: 150px)`);

      const height = element.getStyleProperty('height');
      results.push(`✓ height: ${height} (expected: 100px)`);

      const top = element.getStyleProperty('top');
      results.push(`✓ top: ${top} (expected: 0px)`);

      const left = element.getStyleProperty('left');
      results.push(`✓ left: ${left} (expected: 0px)`);

      // === BACKGROUND & COLORS ===
      const bgColor = element.getStyleProperty('background-color');
      results.push(`✓ background-color: ${bgColor} (expected: rgb(141, 240, 204))`);

      const color = element.getStyleProperty('color');
      results.push(`✓ color: ${color} (expected: rgb(51, 51, 51))`);

      const opacity = element.getStyleProperty('opacity');
      results.push(`✓ opacity: ${opacity} (expected: 0.9)`);

      // === TYPOGRAPHY ===
      const fontSize = element.getStyleProperty('font-size');
      results.push(`✓ font-size: ${fontSize} (expected: 14px)`);

      // === FLEXBOX ===
      const display = element.getStyleProperty('display');
      results.push(`✓ display: ${display} (expected: flex)`);

      // === COMPREHENSIVE TRANSFORM TESTING ===
        
      // Basic Transform Functions (Matrix Format)
      const transform = element.getStyleProperty('transform');
      const webExpectedTransform = 'matrix3d(0.9836, 0.1744, 0.0594, 0, -0.1710, 0.9848, -0.0302, 0, -0.0645, 0.0199, 0.9977, 0, 10, 20, 30, 1)';
      results.push(`✓ transform: ${transform} (web: ${webExpectedTransform})`);

      // const transformOrigin = element.getStyleProperty('transform-origin');
      // results.push(`✓ transform-origin: ${transformOrigin} (expected: 50% 50% 0)`);

      // === COMPREHENSIVE TRANSFORM TESTING (MATRIX FORMAT) ===
      
      // Batch transform testing with proper delay handling
      const webMatrixMap: Record<string, string> = {
        'translateX(50px)': 'matrix(1, 0, 0, 1, 50, 0)',
        'translateY(75px)': 'matrix(1, 0, 0, 1, 0, 75)',
        'translateZ(100px)': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 100, 1)',
        'rotateX(45deg)': 'matrix3d(1, 0, 0, 0, 0, 0.7071, 0.7071, 0, 0, -0.7071, 0.7071, 0, 0, 0, 0, 1)',
        'rotateY(60deg)': 'matrix3d(0.5, 0, -0.866, 0, 0, 1, 0, 0, 0.866, 0, 0.5, 0, 0, 0, 0, 1)',
        
        // --- CORRECTED ---
        'rotateZ(90deg)': 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)',
        
        'scale(1.5)': 'matrix(1.5, 0, 0, 1.5, 0, 0)',
        'scaleX(1.2)': 'matrix(1.2, 0, 0, 1, 0, 0)',
        'scaleY(0.8)': 'matrix(1, 0, 0, 0.8, 0, 0)',
        'scaleZ(1.1)': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1)',
        'skewX(15deg)': 'matrix(1, 0, 0.2679, 1, 0, 0)',
        'skewY(10deg)': 'matrix(1, 0.1763, 0, 1, 0, 0)',
        'translate3d(10px, 20px, 30px)': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1)',
        
        // --- CORRECTED ---
        'rotate3d(1, 1, 1, 45deg)': 'matrix3d(0.804738, 0.505861, -0.3106, 0, -0.3106, 0.804738, 0.505861, 0, 0.505861, -0.3106, 0.804738, 0, 0, 0, 0, 1)',
        
        'scale3d(1.2, 0.9, 1.1)': 'matrix3d(1.2, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1)',
        'matrix(1, 0, 0, 1, 0, 0)': 'matrix(1, 0, 0, 1, 0, 0)',
        
        // --- CORRECTED ---
        'translateX(10px) translateY(20px) translateZ(30px) rotateX(15deg) rotateY(25deg) rotateZ(35deg) scale(1.2) scaleX(1.1) scaleY(0.9) scaleZ(1.3) skewX(10deg) skewY(5deg)': 
          'matrix3d(0.983578, 0.174418, 0.059386, 0, -0.222342, 0.811802, -0.198322, 0, -0.015242, 0.22915, 1.25884, 0, 10, 20, 30, 1)'
      };

      // Convert forEach to async/await for sequential execution
      for (const [value, expectedWebMatrix] of Object.entries(webMatrixMap)) {
        element.setStyleProperty('transform', value);
        
        // Use a promise-based delay to ensure sequential execution
        await new Promise(resolve => setTimeout(resolve, 100));
        const result = element.getStyleProperty('transform');
        
        results.push(`✓ ${value}: ${result} (web: ${expectedWebMatrix})`);
      }

      // Perspective Testing
      const perspective = element.getStyleProperty('perspective');
      results.push(`✓ perspective: ${perspective} (expected: 1000px)`);

      // === TRANSITIONS ===
      const transition = element.getStyleProperty('transition');
      results.push(`✓ transition: ${transition} (contains all 0.3s ease)`);

      const transitionDuration = element.getStyleProperty('transition-duration');
      results.push(`✓ transition-duration: ${transitionDuration} (expected: 0.3s)`);

      const transitionProperty = element.getStyleProperty('transition-property');
      results.push(`✓ transition-property: ${transitionProperty} (expected: transform)`);

      const transitionTimingFunction = element.getStyleProperty('transition-timing-function');
      results.push(`✓ transition-timing-function: ${transitionTimingFunction} (expected: ease)`);

      // === EDGE CASES ===
      const nonExistent = element.getStyleProperty('nonExistentProperty');
      results.push(`✓ nonExistent: "${nonExistent}" (expected: "")`);

      const kebabCase = element.getStyleProperty('background-color');
      results.push(`✓ kebab-case: ${kebabCase} (should match camelCase)`);

      // === CONSISTENCY CHECKS ===
      const directWidth = element.width;
      const propWidth = element.getStyleProperty('width');
      const widthMatch = directWidth === propWidth;
      results.push(`✓ width consistency: ${widthMatch ? 'PASS' : 'FAIL'} (${directWidth} vs ${propWidth})`);

      const directColor = element.color;
      const propColor = element.getStyleProperty('color');
      const colorMatch = directColor === propColor;
      results.push(`✓ color consistency: ${colorMatch ? 'PASS' : 'FAIL'} (${directColor} vs ${propColor})`);

      void runOnBackground((resultsInner) => {
        setTestResults(resultsInner);
      })(results);

    } catch (error) {
      results.push(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      void runOnBackground((resultsInner) => {
        setTestResults(resultsInner);
      })(results);
    }
  }

  useEffect(() => {
    // Run tests after component mounts
    const timer = setTimeout(() => {
      void runOnMainThread(runStylePropertyTests)();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <scroll-view className='scroll-case-container' scroll-y={true}>
      <view className="test-description">
        <text>Testing getStyleProperty method (which uses __GetComputedStyleByKey):</text>
        <text>• Verify style property reading functionality</text>
        <text>• Test various CSS properties and edge cases</text>
        <text>• Ensure consistency with direct property access</text>
      </view>
      
      <view
        main-thread:ref={testBoxRef}
        style={{
          // Layout
          width: '150px',
          height: '100px',
          minWidth: '100px',
          maxWidth: '200px',
          
          // Positioning
          position: 'relative',
          top: '0px',
          left: '0px',
          
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
          
          // Comprehensive Transform Testing
          transform: 'translateX(10px) translateY(20px) translateZ(30px) rotateX(15deg) rotateY(25deg) rotateZ(35deg) scale(1.2) scaleX(1.1) scaleY(0.9) scaleZ(1.3) skewX(10deg) skewY(5deg)',
          transformOrigin: '50% 50% 0',
          transition: 'all 0.3s ease',
          transitionDuration: '0.3s',
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease',
          
          // Additional Transform Properties
          perspective: '1000px',
          backfaceVisibility: 'visible',
        }}
      >
        <text>Comprehensive Transform Test Element</text>
      </view>

      <view className="test-results">
        <text style={{ fontWeight: 'bold', marginTop: '20px' }}>Test Results:</text>
        {testResults.map((result, index) => (
          <text key={index} style={{ fontSize: '12px', marginTop: '5px' }}>
            {index + 1}. {result}
          </text>
        ))}
      </view>

      <view 
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          flex: 1
        }}
        bindtap={() => void runOnMainThread(runStylePropertyTests)}
      >
        <text style={{ textAlign: 'center', color: '#333' }}>
          Tap to Re-run Tests
        </text>
      </view>
    </scroll-view>
  );
}
