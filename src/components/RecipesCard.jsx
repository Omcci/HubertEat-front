import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";


function RecipesCard({ name, img_url, id, viewbutton }) {
  const [isAddRecipeModalVisible, setIsAddRecipeModalVisible] = useState(false);
  const [getName, setGetName] = useState([]);
  const [selectId, setSelectId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const { recipeid } = useParams();
  const [toto, setToto] = useState({});


  const handleSelect = () => {
    if (selectId != "") {
      const data = {
        menus_id: selectId,
        recipes_id: id,
      };
      fetch(`http://localhost:8000/menus/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
            return res.json()
      }).then((data) => {
           
        if (data.code === 201) {
            setIsAddRecipeModalVisible(true);
            setErrorAlert(false);
            setErrorMessage("");
            setIsAddRecipeModalVisible(false);
          } else {
            
            setErrorAlert(true);
            setErrorMessage(data.message);
          }
        console.log(data)
    })
    } else {
      setErrorAlert(true);
      setErrorMessage("Chose a menu");
    }
  };

  useEffect(() => {
    if (isAddRecipeModalVisible) {
      fetch("http://localhost:8000/menus")
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.error("Erreur");
          }
        })
        .then((data) => setGetName(data))
        .catch((err) => console.error(err));
    }
  }, [isAddRecipeModalVisible]);

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
          <Button
            className="btn-fav"
            onClick={() => setIsAddRecipeModalVisible(true)}
          >
            <span>Add to your menu</span>
          </Button>
          <Modal
            title="Menu Title"
            open={isAddRecipeModalVisible}
            onOk={() => {
              handleSelect();
            }}
            onCancel={() => {
              setIsAddRecipeModalVisible(false);
            }}
          >
            <select
              value={selectId}
              onChange={(e) => setSelectId(e.target.value)}
            >
              <option>Chose your menu</option>
              {getName.map((e) => {
                return (
                  <option value={e.id}>
                    <p key={e.id}>{e.name}</p>
                  </option>
                );
              })}
            </select>
            <p style={{ color: "red" }}>{errorAlert && errorMessage}</p>
          </Modal>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default RecipesCard;
