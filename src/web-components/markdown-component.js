class MarkdownComponent extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: "closed" });

    const baseStyle = document.createElement("style");
    baseStyle.innerHTML = `
      :host {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
      }
    `;
    shadow.appendChild(baseStyle);

    const style = document.createElement("style");
    style.innerHTML = `<slot name="style"></slot>`;
    shadow.appendChild(style);

    const container = document.createElement("div");
    container.innerHTML = `<slot name="content"></slot>`;
    shadow.appendChild(container);
  }
}
window.customElements.define("markdown-component", MarkdownComponent);
