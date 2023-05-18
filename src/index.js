import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { Context, Provider } from "./useContext/Context";

export { Context };
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <ToastContainer />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
