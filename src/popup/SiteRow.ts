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
      :host {
        display: flex;
        gap: 5px;
      }
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const text = document.createElement('input');
    text.value = this.textContent ?? '';

    const add = document.createElement('button');
    add.innerText = '+';

    const remove = document.createElement('button');
    remove.innerText = '−';

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(checkbox);
    shadowRoot.appendChild(text);
    shadowRoot.appendChild(add);
    shadowRoot.appendChild(remove);

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
