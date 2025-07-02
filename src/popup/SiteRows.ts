export class SiteRows extends HTMLElement {
  stylesheet = `
    :host {
      display: flex;
      flex-direction: column;
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupChildren();
  }

  render() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = this.stylesheet;

    const slot = document.createElement('slot');

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(slot);
  }

  setupChildren() {}
}

window.customElements.define('site-rows', SiteRows);
