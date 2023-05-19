import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import { Context, Provider } from "./useContext/Context";

export { Context };
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider>
      <ToastContainer />
      <Auth0Provider
        domain="dev-cqd70iq1n1ef0qen.us.auth0.com"
        clientId="UzdpSguDlcAkDvebokr2YVMi8Q9az6fZ"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </BrowserRouter>
);
