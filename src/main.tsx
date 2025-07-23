import { StrictMode } from "react";

import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";

import "./index.css";
import Router from "./router";
import { store } from "./store";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
