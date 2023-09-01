import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/context/AuthContextProvider";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
