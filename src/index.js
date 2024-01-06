import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { ThemeProvider } from "@material-tailwind/react";
import { ProductsProvider } from './context/productProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <ProductsProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ProductsProvider>
    </AuthProvider>
  </Router>
);


reportWebVitals();
