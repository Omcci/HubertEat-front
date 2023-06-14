import React from "react";
import { Link } from "react-router-dom";
import RecipesCard from "./RecipesCard";
// import { Navigate } from 'react-router-dom';

function RecipesList({ recipes, search }) {
  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  //   const handleClick = (id) => {
  //     console.log(id);
  //     const data = {
  //         "menus_id" : 1,
  //         "recipes_id" : id
  //     }
  // fetch(`http://localhost:8000/menus/recipes`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((res) => {
  //     if (res.status === 201) {
  //     //   Navigate("/")
  //     } else {
  //       console.error("Erreur")
  //     }
  //   })
  //   }

  return (
    <div className="recipes-container">
      {filteredRecipes.map((e, key) => {
        return (
          // <div key={key} className="recipes-cards">
          //   <div className="title-container">
          //   <p>{e.name}</p>
          //   </div>
          //   <img src={e.img_url} alt="food" />
          //   <button type="button" className="btn-fav" onClick={() => handleClick(e.id)} >
          //     <span>Add to your menu</span>
          //   </button>
          // </div>
          
            // state={{ tata: "sjbdjjzbjdzbzdjbzdjzdjbdzj" }}
          
            <RecipesCard
              key={key}
              name={e.name}
              img_url={e.img_url}
              id={e.id}
              viewbutton
            />
         
        );
      })}
    </div>
  );
}

export default RecipesList;
