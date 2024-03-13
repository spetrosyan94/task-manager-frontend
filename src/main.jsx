import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "./index.css";
import { PrismaneProvider } from "@prismane/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrismaneProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrismaneProvider>
  </React.StrictMode>
);
