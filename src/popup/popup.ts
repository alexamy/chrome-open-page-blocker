console.log('This is a popup script!');

class SiteRow extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = ``;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const name = document.createElement('input');

    const add = document.createElement('button');
    add.innerText = '+';

    const remove = document.createElement('button');
    remove.innerText = '−';

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(checkbox);
    shadowRoot.appendChild(name);
    shadowRoot.appendChild(add);
    shadowRoot.appendChild(remove);
  }
}

window.customElements.define('site-row', SiteRow);
