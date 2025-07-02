import { SiteRow } from './SiteRow';

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
    this.onChange();
  }

  disconnectCallback() {
    this.removeEvents();
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
    this.elements.add.addEventListener('click', this.onAddRow);

    const rows = this.querySelectorAll('site-row');
    rows.forEach((row) => this.connectRow(row as SiteRow));
  }

  private removeEvents() {
    this.elements.add.removeEventListener('click', this.onAddRow);

    const rows = this.querySelectorAll('site-row');
    rows.forEach((row) => this.disconnectRow(row as SiteRow));
  }

  private emitEvent<Name extends keyof SiteRowsEvent>(
    name: Name,
    detail: SiteRowsEvent[Name]
  ) {
    const event = new CustomEvent(name, { detail });
    this.dispatchEvent(event);
  }

  //#region callbacks
  private onChange = () => {
    const rows = this.querySelectorAll('site-row');
    const sites = ([...rows] as SiteRow[])
      .filter((row) => row.checked && row.value)
      .map((row) => row.value);

    this.emitEvent('site-rows:data', sites);
  };

  private onAddRow = () => {
    const row = document.createElement('site-row') as SiteRow;
    this.appendChild(row);
    this.connectRow(row);
    this.onChange();
  };

  private onRemoveRow = (event: Event) => {
    const row = event.currentTarget as SiteRow;
    this.disconnectRow(row);
    this.removeChild(row);
    this.onChange();
  };

  private connectRow = (entry: SiteRow) => {
    entry.addEventListener('site-row:checked', this.onChange);
    entry.addEventListener('site-row:changed', this.onChange);
    entry.addEventListener('site-row:removed', this.onRemoveRow);
  };

  private disconnectRow = (entry: SiteRow) => {
    entry.addEventListener('site-row:checked', this.onChange);
    entry.addEventListener('site-row:changed', this.onChange);
    entry.addEventListener('site-row:removed', this.onRemoveRow);
  };
}

window.customElements.define('site-rows', SiteRows);
