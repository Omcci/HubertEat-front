import { useState, useEffect } from "react";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase());
      return matchSearch
  });

  return (
    <>
      <h1>Hubert Eats</h1>
      <div className="search-container">
        <form>
        <label htmlFor="search">Search for recipes or ingredients</label>
        <input
          className="searchbar"
          type="search"
          onChange={handleSearch}
          value={search}
          placeholder="Search your recipe or ingredients"
        />
        <button type="submit">Go</button>  
        </form>
      </div>

      <div className="recipes-container">
        {/* {console.log(data)} */}

        {filteredRecipes.map((e, key) => {
          return (
            <div key={key} className="recipes-cards">
              <p>{e.name}</p>
              <img src={e.img_url} alt="food" />
              <button type="button" className="btn-filter" onClick={""}>
                <span>Add to your menu</span>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
