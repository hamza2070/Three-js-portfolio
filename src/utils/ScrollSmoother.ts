// Lightweight ScrollSmoother replacement using native smooth scrolling
export class ScrollSmoother {
  private wrapper: HTMLElement | null;
  private content: HTMLElement | null;
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
    this.content = document.querySelector(config.content);

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
    smooth?: boolean,
    position?: string
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

  static refresh(hard?: boolean): void {
    // Trigger a reflow
    if (hard) {
      window.dispatchEvent(new Event("resize"));
    }
  }
}
