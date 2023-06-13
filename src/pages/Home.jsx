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
      {console.log(menu)}
      {menu.map((e, key) => {
        return (
          <div key={key}>
            <p>{e.name}</p>
            <img src={e.img_url} alt="" style={{ height: "50px" }} />
          </div>
        );
      })}
    </>
  );
}

export default Home;
