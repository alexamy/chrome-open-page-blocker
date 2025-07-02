console.log('This is a popup script!');

class SiteRow extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const root = document.createElement('div');
    root.append('Hello!');

    shadowRoot.appendChild(root);
  }
}

window.customElements.define('site-row', SiteRow);
