import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  const url = req.originalUrl;
  let template = fs.readFileSync(
    path.resolve(__dirname, "index.html"),
    "utf-8"
  );
  template = await vite.transformIndexHtml(url, template);

  const { render } = await vite.ssrLoadModule("/src/entry-server.ts");

  const appHtml = await render(url);
  console.log({ appHtml });

  const html = template.replace(`<!--ssr-outlet-->`, appHtml);

  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

app.listen(5174);
