import { useState, useEffect } from "react";

function Home() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    console.log("toto");
    fetch("http://localhost:8000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  return (
    <>
      <h1>Hubert Eats</h1>
      <div className="">
      <input
          className="searchbar"
          type="text"
          // onChange={(e) => setSearch(e.target.value)}
          value={""}
          placeholder="Search your recipe"
        />
      </div>
      
        
      <div className="recipes-container">
      {menu.map((e, key) => {
        return (
          <div key={key}  className="recipes-cards">
            <p>{e.name}</p>
            <img src={e.img_url} alt="food"/>
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
