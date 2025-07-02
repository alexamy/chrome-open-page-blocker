export class SiteRows extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
      }
    `;

    const slot = document.createElement('slot');

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(slot);
  }

  connectedCallback() {}
}

window.customElements.define('site-rows', SiteRows);
