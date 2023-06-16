import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import RecipesCard from "../components/RecipesCard";
import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Input, Modal, Button, Alert, Space } from "antd";

function Menu() {
  const [getRecipes, setGetRecipes] = useState([]);
  const [selectMenu, setSelectMenu] = useState("");
  const [getMenu, setGetMenu] = useState([]);
  // const [deleteMenu, setDeleteMenu] = useState([]);
  const [changeMenuModal, setChangeMenuModal] = useState(false);
  const [getInput, setGetInput] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertViible] = useState(false);

  const handleChange = (event) => {
    const id = event.target.value;
    setSelectMenu(event.target.value);
    fetch(`http://localhost:8000/menus/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGetRecipes(data);
        console.log(data);
      });
  };

  const handleDelete = (menus_id, recipes_id) => {
    console.log("hey", menus_id, recipes_id);

    fetch(`http://localhost:8000/menus/${menus_id}/${recipes_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    }).then((res) => {
      <>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Alert message="Success Text" type="success" />{" "}
        </Space>
      </>;
      if (res.status === 204) {
        const updatedRecipes = getRecipes.filter(
          (e) => e.recipes_id !== recipes_id
        );
        setGetRecipes(updatedRecipes);
      } else {
        console.error("Erreur");
      }
    });
  };

  const handleDeleteMenu = () => {
    if (selectMenu != "") {
      console.log(selectMenu);

      fetch(`http://localhost:8000/menus/${selectMenu}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 204) {
          const updatedMenus = getMenu.filter((e) => e.id !== selectMenu);
          setGetMenu(updatedMenus);
        } else {
          console.error("Erreur");
        }
      });
    } else {
      setAlertMessage("test");
      setAlertViible(true);
    }
  };

  const handleClickOpenModal = () => {
    selectMenu != "" ? setChangeMenuModal(true) : setChangeMenuModal(false);
  };

  const handleClick = () => {
    if (getInput != "") {
      const data = { name: getInput };
      fetch(`http://localhost:8000/menus/${selectMenu}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 204) {
          setChangeMenuModal(false);
          setGetMenu((PrevState) => {
            const NewTab = PrevState.map((e, i) => {
              if (i === selectMenu) {
                return { id: selectMenu, name: getInput };
              }
              return e;
            });
            return NewTab;
          });
          // setGetMenu(prevMenu => prevMenu.map((menu, index) => {
          //   if (index === selectMenu) {
          //     return { id: selectMenu, name: getInput };
          //   }
          //   return menu;
          // }));
        } else {
          console.error("Erreur");
        }
      });
    } else {
      setAlertMessage("test");
      setAlertViible(true);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/menus")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.error("Erreur");
        }
      })
      .then((data) => setGetMenu(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="menu-wrapper">
      <Box className="menuItem" sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          Select your menu{" "}
          <Select
            style={{ width: "50%" }}
            labelId="idlabel"
            id="select"
            defaultValue={selectMenu}
            label="menu"
            onChange={(e) => handleChange(e)}
          >
            {getMenu.map((e) => {
              return (
                <MenuItem value={e.id} key={e.id}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <div className="button-container">
      <Button className="menuItem" onClick={() => handleClickOpenModal()}>
        Change your menu name
      </Button>
      <Button className="menuItem" onClick={() => handleDeleteMenu()}>Delete your menu</Button>
      </div>
    
      <p>{alertMessage && alertVisible}</p>
      <Modal
        title="Update Menu name"
        open={changeMenuModal}
        onOk={() => handleClick()}
        onCancel={() => setChangeMenuModal(false)}
      >
        <Input type="text" onChange={(e) => setGetInput(e.target.value)} />
        {/* <p style={{color:"red"}}>{errorAlert && errorMessage}</p> */}
      </Modal>

      {getRecipes.map((e) => {
        console.log(e);
        return (
          <>
            <div className="recipesCardMenu">
              <RecipesCard
                key={e.key}
                name={e.name}
                img_url={e.img_url}
                id={e.id}
              />
              <Button
                type="primary"
                danger
                className="menuItem"
                onClick={() => handleDelete(e.menus_id, e.recipes_id)}
              >
                Delete
              </Button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Menu;
