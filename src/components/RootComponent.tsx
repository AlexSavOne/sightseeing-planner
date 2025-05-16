// src/components/RootComponent.tsx

import React, { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@gravity-ui/uikit";

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>{loading ? <Loader /> : <App />}</BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default RootComponent;
