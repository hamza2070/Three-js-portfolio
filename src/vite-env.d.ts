/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: string | Element | Element[], vars?: Record<string, unknown>);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
    split(vars?: Record<string, unknown>): void;
  }
}
