console.log('This is a popup script!');

class SiteRow extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      .container {
        display: flex;
      }
    `;

    const container = document.createElement('div');
    container.classList.add('container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const name = document.createElement('input');

    const add = document.createElement('button');
    add.innerText = '+';

    const remove = document.createElement('button');
    remove.innerText = '−';

    container.appendChild(checkbox);
    container.appendChild(name);
    container.appendChild(add);
    container.appendChild(remove);

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);
  }
}

window.customElements.define('site-row', SiteRow);
