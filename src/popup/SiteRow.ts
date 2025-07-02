export interface SiteRowEvent {
  remove: null;
  checked: boolean;
  changed: string;
}

export class SiteRow extends HTMLElement {
  stylesheet = `
    :host {
      display: flex;
      gap: 5px;
    }
  `;

  elements!: {
    checkbox: HTMLInputElement;
    text: HTMLInputElement;
    remove: HTMLButtonElement;
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.elements = this.render();
    this.setupEvents();
  }

  render() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.stylesheet;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;

    const text = document.createElement('input');
    text.value = this.textContent ?? '';

    const remove = document.createElement('button');
    remove.innerText = '−';

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(checkbox);
    shadowRoot.appendChild(text);
    shadowRoot.appendChild(remove);

    return { checkbox, text, remove };
  }

  setupEvents() {
    const { checkbox, text, remove } = this.elements;

    checkbox.addEventListener('input', () =>
      this.emitEvent('checked', checkbox.checked)
    );

    text.addEventListener('input', () => this.emitEvent('changed', text.value));
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
