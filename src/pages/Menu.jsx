import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipesCard from "../components/RecipesCard";

function Menu() {
  const [getRecipes, setGetRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/menus/recipes/1")
      .then((res) => res.json())
      .then((data) => {
        setGetRecipes(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <div>Menu 1</div>
      {getRecipes.map((e) => {
        return (
          <RecipesCard
            key={e.key}
            name={e.name}
            img_url={e.img_url}
            id={e.id}
          />
        );
      })}
    </>
  );
}

export default Menu;
