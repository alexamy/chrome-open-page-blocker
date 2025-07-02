export interface SiteRowEvent {
  add: null;
  remove: null;
  checked: boolean;
  changed: string;
}

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
    this.setupEvents();
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

  setupEvents() {
    const { checkbox, text, add, remove } = this.elements;

    checkbox.addEventListener('input', () =>
      this.emitEvent('checked', checkbox.checked)
    );

    text.addEventListener('input', () => this.emitEvent('changed', text.value));
    add.addEventListener('click', () => this.emitEvent('add', null));
    remove.addEventListener('click', () => this.emitEvent('remove', null));
  }

  private emitEvent<Name extends keyof SiteRowEvent>(
    name: Name,
    detail: SiteRowEvent[Name]
  ) {
    const event = new CustomEvent(`site-row:${name}`, { detail });
    this.dispatchEvent(event);
  }
}

window.customElements.define('site-row', SiteRow);
