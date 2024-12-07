// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import Button from "@mui/material/Button";
// import Icon from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Add, Inventory2, AccountCircle } from "@mui/icons-material";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

function App() {
  // const [count, setCount] = useState(0)

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
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <div className="top">
        <header>
          <h2>Internal Home Directory</h2>
          <Inventory2 fontSize="large"></Inventory2>
          <IconButton Button variant="outline" class="addButton">
            <AccountCircle fontSize="large"></AccountCircle>
          </IconButton>
        </header>
        <div className="body">
          <h3>Inventory 1</h3>
          <ul className="itemList">{listItems}</ul>
          <div className="controls">
            <IconButton Button variant="outline" class="addButton">
              <Add></Add>
            </IconButton>
          </div>
        </div>
        <footer>
          <IconButton Button variant="outline" class="addButton">
            <Add></Add>
          </IconButton>
        </footer>
      </div>
    </>
  );
}

export default App;
