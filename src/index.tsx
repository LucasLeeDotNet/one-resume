// React
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Component
import App from "./App";

// State
import { StoreProvider } from "./context/StoreContext";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core"
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons"

// Style
import "./index.css";

ReactDOM.render(
    (
      <StoreProvider>
          <App />
      </StoreProvider>
    ),
    document.getElementById("root"),
);

library.add(faStroopwafel);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
