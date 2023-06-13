import React from "React";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import "./pages/Home.scss";
import "./pages/Menu.scss";
import "./components/Navbar.scss";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />
      <Route
        path="/menu"
        element={
          <>
            <Navbar />
            <Menu />
          </>
        }
      />
    </Routes>
  );
}

export default App;
