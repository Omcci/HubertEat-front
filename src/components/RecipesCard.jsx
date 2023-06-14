import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";

function RecipesCard({ name, img_url, id, viewbutton }) {
  const [isAddRecipeModalVisible, setIsAddRecipeModalVisible] = useState(false);

  const { recipeid } = useParams();
  //   let { state } = useLocation();
  const [toto, setToto] = useState({});
  // const [getRecipe, setGetRecipe] = useState()
  // const navigate = useNavigate()

  const addRecipe = () => {
    console.log("toto");
    setTimeout(() => {
      setIsAddRecipeModalVisible(false);
    }, 2000);
  };

  const handleClick = (id) => {
    console.log(id);
    const data = {
      menus_id: 1,
      recipes_id: id,
    };
    fetch(`http://localhost:8000/menus/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        setIsAddRecipeModalVisible(true);
      } else {
        console.error("Erreur");
      }
    });
  };

  //   const handleClickImg = (id) => {
  //     console.log(id);
  //     const data = {
  //       name: name,
  //       img_url: img_url,

  //     };
  //     fetch(`http://localhost:8000/recipes/:id`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }).then((res) => {
  //       if (res.status === 201) {
  //         //   Navigate("/")
  //       } else {
  //         console.error("Erreur");
  //       }
  //     });
  //   };

  useEffect(() => {
    if (recipeid != undefined) {
      fetch(`http://localhost:8000/recipes/${recipeid}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.error("Erreur");
          }
        })
        .then((data) => setToto(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="recipes-cards">
      <div className="title-container">
        <p>{name ? name : toto?.name}</p>
      </div>
      {/* <a href="" onClick={handleClickImg(id)}> */}

      {/* <a href="" onClick={() => navigate(`/recipes/${id}`)}> */}
      <Link to={`/recipes/${id ? id : recipeid}`}>
        <img src={img_url ? img_url : toto?.img_url} alt="food" />
      </Link>
      <p style={{ fontSize: "4px" }}>{toto?.description}</p>
      {/* </a> */}
      {viewbutton ? (
        <>
          <button
            type="button"
            className="btn-fav"
            onClick={() => handleClick(id)}
          >
            <span>Add to your menu</span>
          </button>
          <Modal
            title="Modal Title"
            open={isAddRecipeModalVisible}
            onOk={() => addRecipe()}
            onCancel={() => {
              setIsAddRecipeModalVisible(false);
            }}
          >
            <input type="text" />
          </Modal>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default RecipesCard;
