import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        position="top-right"
        rtl={false}
        theme="light"
      />
    </ThemeProvider>
  </Provider>
);
