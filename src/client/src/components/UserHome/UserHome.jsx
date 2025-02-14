import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { Add, Inventory, AccountCircle } from "@mui/icons-material";
import axios from "axios";
import React, { useMemo, useState, useLayoutEffect, debounce } from "react";
import { BrowserRouter } from "react-router-dom";
import "./UserHome.css";

const UserHome = () => {
  const [data, setData] = useState(() => get_data());

  const [inputItem, setInputItem] = useState("");
  const [inputQty, setInputQty] = useState(0);

  function save_changes() {
    axios.post("http://localhost:5000/save_changes").then((response) => {
      console.log(response.data);
    });
  }

  // API functions (test)
  function get_data() {
    console.log("get_data called");
    axios.get("http://localhost:5000/get_data").then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });
  }

  // Add or remove qty of item (positive or negative integers)
  function update_item(item, qty) {
    axios
      .post("http://localhost:5000/item", { item: item, qty: qty })
      .then((response) => console.log(response.data));
    get_data();
  }

  function get_item(item) {
    axios
      .get("http://localhost:5000/item", { item: item })
      .then((response) => console.log(response.data));
  }

  function clear_changes() {
    axios.delete("http://localhost:5000/save_changes").then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className="body">
      <div className="bodyTitle">
        <h2>Welcome, Justin!</h2>
      </div>
      <div className="itemList">
        <h2>Items and Quantities</h2>
        <ul>
          <Button onClick={() => save_changes()}>Push Changes to File</Button>
          {data != null &&
            Object.entries(data).map((item, quantity) => (
              <li key={item}>
                {item[0]}: {item[1]}
                <Button title={"Add 1"} onClick={() => update_item(item[0], 1)}>
                  ADD
                </Button>
                <Button
                  title={"Remove 1"}
                  onClick={() => update_item(item[0], -1)}
                >
                  REMOVE
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
