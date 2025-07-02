export interface SiteRowEvent {
  'site-row:remove': null;
  'site-row:checked': boolean;
  'site-row:changed': string;
}

export class SiteRow extends HTMLElement {
  stylesheet = `
    :host {
      display: flex;
      gap: 5px;
    }

    .text {
      width: 100%;
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

  private render() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.stylesheet;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;

    const text = document.createElement('input');
    text.classList.add('text');
    text.value = this.textContent ?? '';

    const remove = document.createElement('button');
    remove.innerText = '−';

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(checkbox);
    shadowRoot.appendChild(text);
    shadowRoot.appendChild(remove);

    return { checkbox, text, remove };
  }

  private setupEvents() {
    const { checkbox, text, remove } = this.elements;

    checkbox.addEventListener('input', () =>
      this.emitEvent('site-row:checked', checkbox.checked)
    );

    text.addEventListener('input', () =>
      this.emitEvent('site-row:changed', text.value)
    );
    remove.addEventListener('click', () =>
      this.emitEvent('site-row:remove', null)
    );
  }

  private emitEvent<Name extends keyof SiteRowEvent>(
    name: Name,
    detail: SiteRowEvent[Name]
  ) {
    const event = new CustomEvent(name, { detail });
    this.dispatchEvent(event);
  }

  get checked() {
    return this.elements.checkbox.checked;
  }

  get value() {
    return this.elements.text.value;
  }

  set value(text: string) {
    this.elements.text.value = text;
  }
}

window.customElements.define('site-row', SiteRow);
