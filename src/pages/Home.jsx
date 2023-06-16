import React, { useState, useEffect } from "react";
import MenuSelector from "../components/MenuSelector";
import RecipesList from "../components/RecipesList";
import SearchBar from "../components/SearchBar";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <>
      <div className="nutrition-banner">
        <p>Get yummy yummy !</p>
        <p>Food for my tummy.</p>
      </div>
      <div className="header-components">
        <MenuSelector />
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <RecipesList recipes={recipes} search={search} />
    </>
  );
}

export default Home;
