import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import liff from "@line/liff";
import { liffId } from "./secret";

liff.init({ liffId: liffId })
    .then(() => {
        const root = ReactDOM.createRoot(
            document.getElementById("root") as HTMLElement
        );
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    })
    .catch((e) => {
        alert(`LIFF error: ${e.message}`);
    });
