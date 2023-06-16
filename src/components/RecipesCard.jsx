import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Modal, Button, Card } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function RecipesCard({ name, img_url, id, viewbutton }) {
  const [isAddRecipeModalVisible, setIsAddRecipeModalVisible] = useState(false);
  const [getName, setGetName] = useState([]);
  const [selectId, setSelectId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const { recipeid } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const location = useLocation();
  const currentUrl = location.pathname;

  const nav = useNavigate();

  const handleNav = () => {
    nav(-1);
  };

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
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.code === 201) {
            setIsAddRecipeModalVisible(true);
            setErrorAlert(false);
            setErrorMessage("");
            setIsAddRecipeModalVisible(false);
          } else {
            setErrorAlert(true);
            setErrorMessage(data.message);
            setTimeout(() => {
              setErrorAlert(false);
            }, 2000);
          }
          console.log(data);
        });
    } else {
      setErrorAlert(true);
      setErrorMessage("Chose a menu");
      setTimeout(() => {
        setErrorAlert(false);
      }, 2000);
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
        .then((data) => setRecipeData(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectId(e.target.value);
  };

  const isRecipeDetailPage = currentUrl.startsWith("/recipes/") && recipeid;

  return (
    <div
      className={` ${isRecipeDetailPage ? "recipe-detail" : "recipes-cards"}`}
    >
      {img_url ? (
        ""
      ) : (
        <Link to="/" className="handleNav" onClick={handleNav}>
          <LeftCircleFilled />{" "}
        </Link>
      )}

      <Card
        className="card"
        hoverable
        cover={
          img_url ? (
            <Link to={`/recipes/${id ? id : recipeid}`}>
              <img src={img_url} alt="food" />
            </Link>
          ) : (
            <img src={recipeData?.img_url} alt="food" />
          )
        }
      >
        {" "}
        <h1>{name ? name : recipeData?.name}</h1>
        {viewbutton ? (
          <>
            <Button
              className="btn-fav"
              onClick={() => setIsAddRecipeModalVisible(true)}
            >
              <span>Add to your menu</span>
            </Button>
            <Modal
              title=""
              open={isAddRecipeModalVisible}
              onOk={() => {
                handleSelect();
              }}
              onCancel={() => {
                setIsAddRecipeModalVisible(false);
              }}
            >
              <InputLabel id="demo-simple-select-label">Menus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="selectMenus"
                value={selectId}
                onChange={handleSelectChange}
              >
                <option>Chose your menu</option>
                {getName.map((e) => {
                  return (
                    <MenuItem key={e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <p style={{ color: "red" }}>{errorAlert && errorMessage}</p>
            </Modal>
          </>
        ) : (
          ""
        )}
      </Card>
      {img_url ? "" : <h2>Instructions</h2> }
      <p>
        {recipeData?.description?.split(".").map((sentence) => (
          <>
            {sentence.trim()}.<br />
          </>
        ))}
      </p>

    </div>
  );
}

export default RecipesCard;
