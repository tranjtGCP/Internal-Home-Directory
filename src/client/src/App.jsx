import "./App.css";
import { IconButton, Button } from "@mui/material";
import { Add, Inventory, AccountCircle } from "@mui/icons-material";
import axios from 'axios';
import React, { useMemo, useState, useLayoutEffect, debounce } from 'react';


// useEffect(()=> {
//   setData(get_data());
// })

// const data = {
//   "test": 1
// };

// Test App
const App = () => {
  const [data, setData] = useState(()=>get_data());

  useLayoutEffect(() => {
    get_data()
  }, []);

  // API functions (test)
  function get_data() {
    console.log("get_data called")
    axios.get('http://localhost:5000/get_data')
    .then(response => {
      console.log(response.data)
      setData(response.data)
      return response.data
    })
  }

  // Add or remove qty of item (positive or negative integers)
  function update_item(item, qty) {
    axios.post('http://localhost:5000/item', {'item': item, 'qty': qty})
    .then(response => console.log(response.data))
    get_data()
  }

  function get_item(item) {
    axios.get('http://localhost:5000/item', {'item': item})
    .then(response => console.log(response.data ))
  }

  function save_changes() {
    axios.post('http://localhost:5000/save_changes')
    .then(response => {console.log(response.data)})
  }

  function clear_changes() {
    axios.delete('http://localhost:5000/save_changes')
    .then(response => {
      console.log(response.data)})
  }
  
  //update_item("rice", 10)

  //get_data()
  //setData({"test": 1})

  //const dataTest = {"test": 2}

  //console.log(data)
  //console.log(data.keys())

  return (
    <body style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <div style={{display: 'flex',  flexDirection: 'column', justifyContent:'center', alignItems:'center', height: '100vh', width: '100vw'}}>
    <h1>Items and Quantities</h1>
      <ul>
            <Button
            onClick={() => save_changes()}
            >
            Push Changes to File
            </Button>
         {data != null && 
         Object.entries(data).map((item, quantity) => (
          <li key={item}>
            {item[0]}: {item[1]}
            <Button
            title={"Add 1"}
            onClick={() => update_item(item[0], 1)}
            >
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
    </body>
  );
};

export default App;
