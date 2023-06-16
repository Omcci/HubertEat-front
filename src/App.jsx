import React from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.scss";
import "./pages/Menu.scss";
import "./pages/Home.scss";
import "./components/Navbar.scss";
import "./components/RecipesList.scss";
import "./components/SearchBar.scss";
import "./components/RecipesCard.scss";

const RecipesCards = lazy(() => import("./components/RecipesCard"));

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
            <Suspense fallback={<div>isLoading...</div>}>
              <RecipesCards />
            </Suspense>
          </>
        }
      />
    </Routes>
  );
}

export default App;
