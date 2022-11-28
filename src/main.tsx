import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/index.css";

const loadingMarkup = (
  <div
    style={{
      backgroundColor: "black",
      color: "white",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>Loading...</h1>
  </div>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
