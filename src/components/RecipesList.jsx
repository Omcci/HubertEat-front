import React, { useState } from "react";
import RecipesCard from "./RecipesCard";
import InfiniteScroll from "react-infinite-scroller";

function RecipesList({ recipes, search }) {
  const [page, setPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const loadMore = () => {
    setPage(page + 1);
    setFilteredRecipes((prevFilteredRecipes) => [
      ...prevFilteredRecipes,
      ...recipes.slice(page * 10, (page + 1) * 10),
    ]);
  };

  const filterRecipes = () => {
    return recipes.filter((recipe) => {
      const matchSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  };

  const filteredRecipesList = filterRecipes();

  return (
    <div className="recipes-container">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={filteredRecipesList.length > page * 10}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <div className="recipes-card-grid">
          {filteredRecipesList.slice(0, page * 10).map((recipe, key) => (
            <RecipesCard
              key={key}
              name={recipe.name}
              img_url={recipe.img_url}
              id={recipe.id}
              viewbutton
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default RecipesList;
