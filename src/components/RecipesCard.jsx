import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Modal, Button, Card } from "antd";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';


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
        .then((data) => setToto(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectId(e.target.value);
  };

  return (
    <div className="recipes-cards">
      {/* <div className="title-container">
       
      </div> */}
      {/* <a href="" onClick={handleClickImg(id)}> */}

      {/* <a href="" onClick={() => navigate(`/recipes/${id}`)}> */}
      <Card
        className="card"
        hoverable
        cover={
          <Link to={`/recipes/${id ? id : recipeid}`}>
            <img src={img_url ? img_url : toto?.img_url} alt="food" />
          </Link>
        }
      >
        {" "}
        <h1>{name ? name : toto?.name}</h1>
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

      <p style={{ fontSize: "4px" }}>{toto?.description}</p>
      {/* </a> */}
      {/* {viewbutton ? (
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
      )} */}
    </div>
  );
}

export default RecipesCard;
