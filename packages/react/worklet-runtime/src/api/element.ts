// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
interface StyleObject {
  [key: string]: string | ((property: string, value: string) => void);
  setProperty(property: string, value: string): void;
}

export class Element {
  private static willFlush: boolean;
  private styles = new Map<string, string>();

  // @ts-expect-error internal use
  private readonly element: ElementNode;

  constructor(element: ElementNode) {
    // In Lynx versions prior to and including 2.15,
    // a crash occurs when printing or transferring refCounted across threads.
    // Bypass this problem by hiding the element object.
    Object.defineProperty(this, 'element', {
      get() {
        return element;
      },
    });
  }

  public setAttribute(name: string, value: unknown): void {
    __SetAttribute(this.element, name, value);
    this.flushElementTree();
  }

  public setStyleProperty(name: string, value: string): void {
    // Convert camelCase to kebab-case for CSS property names
    const cssProperty = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    __AddInlineStyle(this.element, cssProperty, value);
    this.styles.set(name, value);
    this.flushElementTree();
  }

  public setStyleProperties(styles: Record<string, string>): void {
    for (const key in styles) {
      const value = styles[key];
      if (value !== undefined) {
        this.setStyleProperty(key, value);
      }
    }
  }

  public getComputedStyle(): Record<string, string> {
    const styleObject: Record<string, string> = {
      // Default values for common CSS properties
      display: 'flex',
      position: 'relative',
      width: 'auto',
      height: 'auto',
      margin: '0',
      padding: '0',
      backgroundColor: 'transparent',
      color: '#000000',
      fontSize: '14px',
      opacity: '1',
      transform: 'none',
      transition: 'none',
    };

    // Override with actual set styles
    this.styles.forEach((value, key) => {
      // Convert camelCase to kebab-case for CSS property names
      const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      styleObject[cssProperty] = value;
    });

    return styleObject;
  }

  public get style(): StyleObject {
    const styleObject = {} as StyleObject;
    this.styles.forEach((value, key) => {
      styleObject[key] = value;
    });
    styleObject.setProperty = (property: string, value: string) => {
      this.setStyleProperty(property, value);
    };
    return new Proxy(styleObject, {
      set: (target, prop, value) => {
        if (typeof prop === 'string' && prop !== 'setProperty') {
          this.setStyleProperty(prop, String(value));
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          target[prop] = value;
        }
        return true;
      },
    });
  }

  public set style(styles: Record<string, string>) {
    this.setStyleProperties(styles);
  }

  // Individual style property getters and setters
  private getStyleProperty(name: string): string {
    return this.styles.get(name) ?? '';
  }

  // Common style properties
  get backgroundColor(): string {
    return this.getStyleProperty('backgroundColor');
  }
  set backgroundColor(value: string) {
    this.setStyleProperty('backgroundColor', value);
  }

  get color(): string {
    return this.getStyleProperty('color');
  }
  set color(value: string) {
    this.setStyleProperty('color', value);
  }

  get fontSize(): string {
    return this.getStyleProperty('fontSize');
  }
  set fontSize(value: string) {
    this.setStyleProperty('fontSize', value);
  }

  get width(): string {
    return this.getStyleProperty('width');
  }
  set width(value: string) {
    this.setStyleProperty('width', value);
  }

  get height(): string {
    return this.getStyleProperty('height');
  }
  set height(value: string) {
    this.setStyleProperty('height', value);
  }

  get margin(): string {
    return this.getStyleProperty('margin');
  }
  set margin(value: string) {
    this.setStyleProperty('margin', value);
  }

  get padding(): string {
    return this.getStyleProperty('padding');
  }
  set padding(value: string) {
    this.setStyleProperty('padding', value);
  }

  get display(): string {
    return this.getStyleProperty('display');
  }
  set display(value: string) {
    this.setStyleProperty('display', value);
  }

  get position(): string {
    return this.getStyleProperty('position');
  }
  set position(value: string) {
    this.setStyleProperty('position', value);
  }

  get top(): string {
    return this.getStyleProperty('top');
  }
  set top(value: string) {
    this.setStyleProperty('top', value);
  }

  get left(): string {
    return this.getStyleProperty('left');
  }
  set left(value: string) {
    this.setStyleProperty('left', value);
  }

  get right(): string {
    return this.getStyleProperty('right');
  }
  set right(value: string) {
    this.setStyleProperty('right', value);
  }

  get bottom(): string {
    return this.getStyleProperty('bottom');
  }
  set bottom(value: string) {
    this.setStyleProperty('bottom', value);
  }

  public getAttribute(attributeName: string): unknown {
    return __GetAttributeByName(this.element, attributeName);
  }

  public getAttributeNames(): string[] {
    return __GetAttributeNames(this.element);
  }

  public querySelector(selector: string): Element | null {
    const ref = __QuerySelector(this.element, selector, {});
    return ref ? new Element(ref) : null;
  }

  public querySelectorAll(selector: string): Element[] {
    return __QuerySelectorAll(this.element, selector, {}).map((element) => {
      return new Element(element);
    });
  }

  public invoke(
    methodName: string,
    params?: Record<string, unknown>,
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      __InvokeUIMethod(
        this.element,
        methodName,
        params ?? {},
        (res: { code: number; data: unknown }) => {
          if (res.code === 0) {
            resolve(res.data);
          } else {
            reject(new Error('UI method invoke: ' + JSON.stringify(res)));
          }
        },
      );
      this.flushElementTree();
    });
  }

  private flushElementTree() {
    if (Element.willFlush) {
      return;
    }
    Element.willFlush = true;
    void Promise.resolve().then(() => {
      Element.willFlush = false;
      __FlushElementTree();
    });
  }
}
