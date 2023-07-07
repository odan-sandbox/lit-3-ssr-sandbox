console.log("loaded app-root.ts");
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "./my-element.js";

@customElement("app-root")
export class AppRoot extends LitElement {
  render() {
    return html`<my-element count=${0}>
      <h1>Vite + Lit</h1>
    </my-element>`;
  }
}
