export class SiteRows extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      .container {
        display: flex;
        flex-direction: column;
      }
    `;

    const container = document.createElement('div');
    const slot = document.createElement('slot');

    this.childNodes.forEach((node) => container.appendChild(node));

    container.appendChild(slot);

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);
  }
}

window.customElements.define('site-rows', SiteRows);
