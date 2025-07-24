import { Provider } from "react-redux";

import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";

import "./index.css";
import Router from "./router";
import { store } from "./store";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      attribute="class"
      defaultTheme="system"
    >
      <Router />
    </ThemeProvider>
  </Provider>
);
