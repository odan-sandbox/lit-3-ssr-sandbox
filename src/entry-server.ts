import { html } from "lit";
import { render as renderLit } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import "./app-root.js";

export async function render() {
  const result = renderLit(html`<app-root></app-root>`);

  return collectResult(result);
}
