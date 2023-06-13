import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import "./pages/Home.scss";
import "./pages/Menu.scss";
import "./components/Navbar.scss"

function App() {
    
  return (
    <Routes>
      <Route path="/"
        element={
          <>
            <Home />
          </>
        }
        />
      <Route path="/menu"
        element={
          <>
            <Menu />
          </>
        }
        />
    </Routes>
  );
}

export default App;
