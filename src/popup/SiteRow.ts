export interface SiteRowEvent {
  'site-row:checked': boolean;
  'site-row:changed': string;
  'site-row:removed': null;
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

  //#region lifecycle
  constructor() {
    super();
  }

  connectedCallback() {
    this.elements = this.render();
    this.setupEvents();
  }

  disconnectedCallback() {
    this.removeEvents();
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

  //#region events
  private setupEvents() {
    const { checkbox, text, remove } = this.elements;
    checkbox.addEventListener('input', this.onCheckbox);
    text.addEventListener('input', this.onText);
    remove.addEventListener('click', this.onRemove);
  }

  private removeEvents() {
    const { checkbox, text, remove } = this.elements;
    checkbox.removeEventListener('input', this.onCheckbox);
    text.removeEventListener('input', this.onText);
    remove.removeEventListener('click', this.onRemove);
  }

  private emitEvent<Name extends keyof SiteRowEvent>(
    name: Name,
    detail: SiteRowEvent[Name]
  ) {
    const event = new CustomEvent(name, { detail });
    this.dispatchEvent(event);
  }

  //#region callbacks
  onCheckbox = () => {
    const { checkbox } = this.elements;
    this.emitEvent('site-row:checked', checkbox.checked);
  };

  onText = () => {
    const { text } = this.elements;
    this.emitEvent('site-row:changed', text.value);
  };

  onRemove = () => {
    const { remove } = this.elements;
    this.emitEvent('site-row:removed', null);
  };

  //#region set get
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
