import React, { useState } from "react";
// import "antd/dist/antd.css";
import { Modal, Button } from "antd";

function MenuSelector() {
  const [isAddMenuModalVisible, setIsAddMenuModalVisible] = useState(false);
  const [addMenuName, setAddMenuName] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [errorAlert, setErrorAlert] = useState(false)

//   const addMenu = () => {
//     console.log(addMenuName);
//       setIsAddMenuModalVisible(false);
//   };

  const handleClick = () => {
    if (addMenuName != "") {
        const data = { name : addMenuName }
        fetch(`http://localhost:8000/menus`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status === 201) {
            setIsAddMenuModalVisible(false)
            setErrorAlert(false)
            setErrorMessage("")
          } else {
            setErrorAlert(true)
            setErrorMessage("Error server, please come back later !")
            console.error("Erreur");
          }
        });
    } else {
        setErrorAlert(true)
        setErrorMessage("A name is missing")
    }
   
  };

  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <>
        <Button
          style={{ border: "1px solid " }}
          type="secondary"
          onClick={() => {
            setIsAddMenuModalVisible(true);
          }}
        >
          Create your menu{" "}
        </Button>
        <Modal
          title="Modal Title"
          open={isAddMenuModalVisible}
          onOk={() => handleClick()}
          onCancel={() => {
            setIsAddMenuModalVisible(false)
            setErrorAlert(false)
            setErrorMessage("");
          }}
        >
          <input type="text" onChange={(e) => {
            setAddMenuName(e.target.value)}}/>
            <p style={{color:"red"}}>{errorAlert && errorMessage}</p>
        </Modal>
      </>
    </div>
  );
}

export default MenuSelector;
