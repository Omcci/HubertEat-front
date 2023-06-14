import React from "react"
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import RecipesCards from "./components/RecipesCard";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import "./pages/Menu.scss";
import "./pages/Home.scss";
import "./components/Navbar.scss";
import "./components/RecipesList.scss";



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
        path="/menus"
        element={
          <>
            <Navbar />
            <Menu />
          </>
        }
      />
       <Route
        path="/recipes/:recipeid"
        element={
          <>
            <Navbar />
            <RecipesCards />
          </>
        }
      />
    </Routes>
  );
}

export default App;
