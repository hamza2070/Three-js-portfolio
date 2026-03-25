// Lightweight SplitText replacement
export class SplitText {
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  private target: Element;
  private originalHTML: string;

  constructor(
    target: string | Element | Element[],
    vars?: { type?: string; linesClass?: string }
  ) {
    const elements = typeof target === "string" 
      ? Array.from(document.querySelectorAll(target))
      : Array.isArray(target) 
      ? target 
      : [target];

    this.target = elements[0];
    this.originalHTML = this.target.innerHTML;

    const type = vars?.type || "chars,words,lines";
    const linesClass = vars?.linesClass || "split-line";

    this.split(type, linesClass);
  }

  private split(type: string, linesClass: string) {
    const text = this.target.textContent || "";
    const types = type.split(",").map((t) => t.trim());

    if (types.includes("chars")) {
      this.target.innerHTML = text
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return `<span class="split-char" style="display:inline-block">${char}</span>`;
        })
        .join("");
      this.chars = Array.from(this.target.querySelectorAll(".split-char"));
    }

    if (types.includes("words")) {
      const words = text.split(/\s+/);
      this.target.innerHTML = words
        .map((word) => `<span class="split-word" style="display:inline-block">${word}</span>`)
        .join(" ");
      this.words = Array.from(this.target.querySelectorAll(".split-word"));
    }

    if (types.includes("lines")) {
      // Simple line splitting - wraps content in line class
      const content = this.target.innerHTML;
      this.target.innerHTML = `<span class="${linesClass}" style="display:block">${content}</span>`;
      this.lines = Array.from(this.target.querySelectorAll(`.${linesClass}`));
    }
  }

  revert() {
    this.target.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}
