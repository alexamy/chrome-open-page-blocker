declare global {
  interface HTMLElementEventMap {
    'site-row:checked': CustomEvent<boolean>;
    'site-row:changed': CustomEvent<string>;
    'site-row:removed': CustomEvent<null>;
  }
}

export class SiteRowElement extends HTMLElement {
  private stylesheet = `
    :host {
      display: flex;
      gap: 5px;
    }

    .text {
      width: 100%;
    }
  `;

  private elements?: {
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

    if (this.hasAttribute('checked')) {
      checkbox.checked = this.getAttribute('checked') === 'true';
    }

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
    this.elements?.checkbox.addEventListener('input', this.onCheckbox);
    this.elements?.text.addEventListener('input', this.onText);
    this.elements?.remove.addEventListener('click', this.onRemove);
  }

  private removeEvents() {
    this.elements?.checkbox.removeEventListener('input', this.onCheckbox);
    this.elements?.text.removeEventListener('input', this.onText);
    this.elements?.remove.removeEventListener('click', this.onRemove);
  }

  //#region callbacks
  private onCheckbox = () => {
    this.checked = this.elements?.checkbox.checked ?? false;

    const event = new CustomEvent('site-row:checked', {
      detail: this.elements?.checkbox.checked,
    });
    this.dispatchEvent(event);
  };

  private onText = () => {
    const event = new CustomEvent('site-row:changed', {
      detail: this.elements?.text.value,
    });
    this.dispatchEvent(event);
  };

  private onRemove = () => {
    const event = new CustomEvent('site-row:removed');
    this.dispatchEvent(event);
  };

  //#region set get
  static observedAttributes = ['checked'];

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (newValue !== oldValue) {
      if (name === 'checked') {
        if (this.elements?.checkbox) {
          this.elements.checkbox.checked = newValue === 'true';
        }
      }
    }
  }

  get text() {
    return this.elements?.text;
  }

  get checked(): boolean {
    return this.getAttribute('checked') === 'true';
  }

  set checked(value: boolean) {
    this.setAttribute('checked', value.toString());
  }

  get value(): string {
    return this.elements?.text.value || '';
  }

  set value(text: string) {
    if (this.elements?.text) {
      this.elements.text.value = text;
    }
  }
}

window.customElements.define('site-row', SiteRowElement);
