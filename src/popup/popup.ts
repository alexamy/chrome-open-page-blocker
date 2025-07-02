export class SiteRow extends HTMLElement {
  elements: {
    checkbox: HTMLInputElement;
    text: HTMLInputElement;
    add: HTMLButtonElement;
    remove: HTMLButtonElement;
  };

  constructor() {
    super();
    this.elements = this.render();
  }

  render() {
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

    const text = document.createElement('input');

    const add = document.createElement('button');
    add.innerText = '+';

    const remove = document.createElement('button');
    remove.innerText = '−';

    container.appendChild(checkbox);
    container.appendChild(text);
    container.appendChild(add);
    container.appendChild(remove);

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(container);

    return { checkbox, text, add, remove };
  }
}

window.customElements.define('site-row', SiteRow);
