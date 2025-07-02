export interface SiteRowsEvent {
  'site-rows:data': string[];
}

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

  //#region lifecycle
  constructor() {
    super();
  }

  connectedCallback() {
    this.elements = this.render();
    this.setupEvents();
    this.emitData();
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

  //#region events
  private setupEvents() {
    const addNewEntry = this.addNewEntry.bind(this);
    this.elements.add.addEventListener('click', addNewEntry);
  }

  private addNewEntry() {
    const row = document.createElement('site-row');
    this.appendChild(row);
  }

  private emitEvent<Name extends keyof SiteRowsEvent>(
    name: Name,
    detail: SiteRowsEvent[Name]
  ) {
    const event = new CustomEvent(name, { detail });
    this.dispatchEvent(event);
  }

  private emitData() {
    const sites: string[] = [];

    this.emitEvent('site-rows:data', sites);
  }
}

window.customElements.define('site-rows', SiteRows);
