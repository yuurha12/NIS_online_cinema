import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { AppContextProvider } from "./components/contexts/AppContexts";

// Init QueryClient and QueryClientProvider here ...
import { QueryClient, QueryClientProvider } from "react-query";

// import Favicon from "./assets/images/icon/Group.png";
// const favicon = document.getElementById("idFavicon");
// favicon.setAttribute("href", Favicon);

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
