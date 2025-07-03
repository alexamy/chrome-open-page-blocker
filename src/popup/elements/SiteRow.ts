declare global {
  interface HTMLElementEventMap {
    'site-row:checked': CustomEvent<boolean>;
    'site-row:changed': CustomEvent<string>;
    'site-row:removed': CustomEvent<null>;
  }
}

export class SiteRowElement extends HTMLElement {
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

  //#region callbacks
  private onCheckbox = () => {
    const event = new CustomEvent('site-row:checked', {
      detail: this.elements.checkbox.checked,
    });
    this.dispatchEvent(event);
  };

  private onText = () => {
    const event = new CustomEvent('site-row:changed', {
      detail: this.elements.text.value,
    });
    this.dispatchEvent(event);
  };

  private onRemove = () => {
    const event = new CustomEvent('site-row:removed');
    this.dispatchEvent(event);
  };

  //#region set get
  get checked() {
    return this.elements.checkbox.checked;
  }

  set checked(value: boolean) {
    this.elements.checkbox.checked = value;
  }

  get value() {
    return this.elements.text.value;
  }

  set value(text: string) {
    this.elements.text.value = text;
  }
}

window.customElements.define('site-row', SiteRowElement);
