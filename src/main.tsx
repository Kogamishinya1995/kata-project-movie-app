import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Provider from "@Components/MyContext.tsx";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Element with id "root" not found in the DOM.');
}
