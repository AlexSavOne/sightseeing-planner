// src\App.tsx

import { useState } from "react";
import Home from "./pages/Home";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Home isAdmin={isAdmin} toggleAdmin={() => setIsAdmin((prev) => !prev)} />
  );
};

export default App;
