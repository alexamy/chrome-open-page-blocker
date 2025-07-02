export class SiteRows extends HTMLElement {
  stylesheet = `
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `;

  elements!: {
    add: HTMLButtonElement;
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.elements = this.render();
    this.setupChildren();
    this.setupEvents();
  }

  private render() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = this.stylesheet;

    const slot = document.createElement('slot');

    const add = document.createElement('button');
    add.textContent = '+';

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(slot);
    shadowRoot.appendChild(add);

    return { add };
  }

  private setupChildren() {}

  private setupEvents() {
    this.elements.add.addEventListener('click', this.addNewEntry.bind(this));
  }

  private addNewEntry() {
    const row = document.createElement('site-row');
    this.appendChild(row);
  }
}

window.customElements.define('site-rows', SiteRows);
