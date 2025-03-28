import { useState } from "react";
import Home from "./pages/Home";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin
          ? "Выключить режим администратора"
          : "Включить режим администратора"}
      </button>
      <Home isAdmin={isAdmin} />
    </>
  );
};

export default App;
