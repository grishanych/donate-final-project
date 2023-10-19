import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import "./styles/index.scss";
import store from "./redux/store";
import ErrorBoundary from "./errorBoundery/ErorBoundery";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ErrorBoundary>,
);
