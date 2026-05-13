import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import siteFaviconUrl from "./assets/site-favicon.ico?url";
import "./index.css";

/** Tab icon: use Vite-resolved URL so it always matches this build (not /favicon.ico cache or another dev server on :5173). */
function ensureSiteFavicon() {
  const href = siteFaviconUrl;
  const upsert = (rel: string) => {
    let link = document.querySelector<HTMLLinkElement>(
      `link[rel="${rel}"][data-oal-favicon]`,
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      link.type = "image/x-icon";
      link.dataset.oalFavicon = "1";
      document.head.appendChild(link);
    }
    link.href = href;
  };
  upsert("icon");
  upsert("shortcut icon");
}

ensureSiteFavicon();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
