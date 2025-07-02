export class SiteRows extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      .container {
        display: flex;
        flex-direction: column;
      }
    `;

    const container = document.createElement('div');
    container.classList.add('container');

    const slot = document.createElement('slot');

    container.appendChild(slot);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);
  }

  connectedCallback() {}
}

window.customElements.define('site-rows', SiteRows);
