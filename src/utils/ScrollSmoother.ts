// Lightweight ScrollSmoother replacement using native smooth scrolling
export class ScrollSmoother {
  private wrapper: HTMLElement | null;
  private isPaused: boolean = false;

  constructor(config: {
    wrapper: string;
    content: string;
    smooth?: number;
    speed?: number;
    effects?: boolean;
    autoResize?: boolean;
    ignoreMobileResize?: boolean;
  }) {
    this.wrapper = document.querySelector(config.wrapper);

    if (this.wrapper) {
      this.wrapper.style.overflow = "auto";
      this.wrapper.style.scrollBehavior = "smooth";
    }
  }

  static create(config: any): ScrollSmoother {
    return new ScrollSmoother(config);
  }

  scrollTop(value?: number): number {
    if (this.wrapper) {
      if (value !== undefined) {
        this.wrapper.scrollTop = value;
        return value;
      }
      return this.wrapper.scrollTop;
    }
    return 0;
  }

  scrollTo(
    target: string | number,
    smooth?: boolean
  ): void {
    if (this.isPaused) return;

    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });
    }
  }

  paused(value?: boolean): boolean {
    if (value !== undefined) {
      this.isPaused = value;
      if (this.wrapper) {
        this.wrapper.style.overflow = value ? "hidden" : "auto";
      }
      return value;
    }
    return this.isPaused;
  }

  static refresh(_hard?: boolean): void {
    // Force layout recalculation without triggering resize events
    document.body.offsetHeight;
  }
}
