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
import { Add, Inventory, AccountCircle, ChangeCircleSharp } from "@mui/icons-material";
import axios from "axios";
import React, { useMemo, useState, useLayoutEffect, debounce } from "react";
import { BrowserRouter } from "react-router-dom";
import "./UserHome.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";

const UserHome = () => {
  
  // API functions (test)
  const get_data = async () => {
    console.log("get_data called");
    await axios.get("http://localhost:5000/get_data").then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });
  };
  
    // Sets the quantity of specified item
    // const set_item = async (item, qty) => {
    //   await axios.post('http://localhost:5000/item', { 'item': item, 'qty': qty })
    //     .then(response => console.log(response.data))
    //     get_data()
    // }

    // Add or remove qty of item (positive or negative integers)
    const update_item = async (item, qty) => {
      console.log(qty)
      var temp = changes;
      if(item in changes) {
        temp[item] = temp[item]+qty;
      }
      else if(item in data) {
        temp[item] = data[item]+qty;
      }
      else {
        temp[item] = qty;
      }
      console.log(temp)
      setChanges(temp);
    }

    // Set qty of item
    const set_item = async (item, qty) => {
      var temp = changes;
      temp[item] = qty;
      setChanges(temp);
    }

    const update_items = async (changes) => {
      await axios.put('http://localhost:5000/item', { 'item': item, 'qty': qty })
        .then(response => console.log(response.data))
      get_data()
    }
  
    // const get_item = async (item) => {
    //   axios.get('http://localhost:5000/item', { 'item': item })
    //     .then(response => console.log(response.data))
    // }
  
    const save_changes = async () => {
      await axios.post('http://localhost:5000/save_changes', changes)
        .then(response => { console.log(response.data) })
      get_data();
      setChanges({}); // TODO only do this when changes confirmed
    }
  
    // const clear_changes = async () => {
    //   await axios.delete('http://localhost:5000/save_changes')
    //     .then(response => {
    //       console.log(response.data)
    //     })
    // }

  const [data, setData] = useState(() => get_data()); // Data from server
  const [changes, setChanges] = useState({});  // Changes to data to be updated

  const [inputItem, setInputItem] = useState("");
  const [inputQty, setInputQty] = useState(0);

  function handleUpdate() {
    console.log(inputItem, inputQty);
    update_item(inputItem, inputQty);
  }

  useLayoutEffect(() => {
    get_data();
  }, []);

  const testList = {
    Potato: 1,
    Onion: 2,
    Tomato: 10,
    Scallop: 100,
  };

  const testData = {
    "potato": 1,
    "scallop": 4
  }

  return (
    <div className="userHomeTop">
      <div className="bodyTitle">
        <h2>Welcome, Justin!</h2>
      </div>
      <div className="body">
        <h2>Items and Quantities</h2>
        <Button onClick={() => save_changes()}>Save Changes</Button>
        <div className="itemList">

          <div className="item">  {/* TODO add item input*/}
            <div className="itemtitle">
              <h3>
              New Item
              </h3>
            </div>

          </div>

          {data != null &&
            Object.entries(data).map((item, quantity) => (
              <div key={item} className="item">
                <div className="itemTitle">
                  <h3>
                    {item[0]} : {item[1]}
                  </h3>
                </div>
                <div className="itemActions">
                  <IconButton onClick={() => update_item(item[0], -1)}>
                    <RemoveIcon></RemoveIcon>
                  </IconButton>
                  <TextField
                    type="number"
                    className="quantityInput"
                    inputProps={{min:0}}
                    // defaultValue={}
                    onChange={(e)=> set_item(item[0], parseInt(e.target.value))}
                  ></TextField>
                  <IconButton onClick={() => update_item(item[0], 1)}>
                    <AddIcon></AddIcon>
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
