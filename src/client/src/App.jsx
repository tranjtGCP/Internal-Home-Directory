import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./App.css";

import axios from "axios";

function get_data() {
  axios
    .get("http://localhost:5000/get_data", "car")
    .then((response) => console.log(response.data));
}

// Add or remove qty of item (positive or negative integers)
function update_item(item, qty) {
  axios
    .post("http://localhost:5000/item", { item: item, qty: qty })
    .then((response) => console.log(response.data));
}

function get_item(item) {
  axios
    .get("http://localhost:5000/item", { item: item })
    .then((response) => console.log(response.data));
}

function App() {
  // const [count, setCount] = useState(0)
  //add_item({})
  //get_data()
  //add_item("car", 2)
  update_item("rice", 200);

  //add_item("car", 200)
  //update_item("car", -10)

  var fruits = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 2, name: "orange" },
    { id: 2, name: "peach" },
    { id: 2, name: "passion" },
  ];

  var listItems = fruits.map((fruit) => (
    <li id="inventoryItem" key={fruit.id}>
      {fruit.name} &nbsp;
    </li>
  ));

  return (
    <>
      <div className="top">
        <Box className="topBox">
          <AppBar position="sticky" className="header">
            <Toolbar>
              <div className="headerTitle">
                <h3>Internal Home Directory</h3>
              </div>
              <Button>Login</Button>
            </Toolbar>
          </AppBar>

          <div className="body">
            <div className="bodyTitle">
              <h2>Welcome, Justin!</h2>
            </div>
          </div>

          <BottomNavigation className="footer">
            <a
              href="https://github.com/tranjtGCP/Internal-Home-Directory"
              className="footer"
            >
              GitHub
            </a>
          </BottomNavigation>
        </Box>
      </div>
    </>
  );
}

export default App;
