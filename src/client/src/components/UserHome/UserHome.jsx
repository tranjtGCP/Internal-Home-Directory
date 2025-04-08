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
import { Add, Inventory, AccountCircle, ChangeCircleSharp, AccessTimeFilled } from "@mui/icons-material";
import axios from "axios";
import React, { useMemo, useState, useLayoutEffect, debounce, useRef, useEffect } from "react";
import { BrowserRouter, data } from "react-router-dom";
import "./UserHome.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Tooltip } from "@mui/material";

const theme = createTheme({
  palette: {
    main: {
      accent: "white",
      primary: "#2c589e"
    }
  },
  shape: {
    borderRadius: "5px"
  }
});


const UserHome = () => {
  // API functions


  /*
  Params:
  search_string = string
  labels = set of strings ["example1", "example2", ...]
  filter_type = ["name", "label"] - can contain none, one, or both
  
  sort_type = ["name", "qty", "date_created", "last_modified" || "ascending", "descending"]
  can contain one entry from the left and one entry from the right
  
  items_per_page = number (n>0)
  */
  const get_data = async (key = "", search_string = "", labels = [], filter_type = [], sort_type = [], items_per_page = 25) => {
    await get_labels()
    await axios.get("http://localhost:5000/get_data", {
      params: {
        'search_string': search_string,
        'labels': labels,
        'filter_type': filter_type,
        'sort_type': sort_type,
        'items_per_page': items_per_page
      },
      paramsSerializer: {
        indexes: true,
      }
    })
      .then((response) => {
        if (key != "") {
          let temp = lists
          temp[key] = response.data
          setLists(temp);
        }

        console.log(lists);
        return response.data;
      });
      await get_labels()
  };

  const get_labels = async () => {
    await axios.get("http://localhost:5000/labels")
      .then(async (response) => {
        setDataLabels(response.data);
        return response.data;
      });
  };

  const save_changes = async () => {
    await axios.get('http://localhost:5000/save_changes', {
      params: {
        'item': changes['item'],
        'qty': changes['qty'],
        'labels': changes['labels'],
      },
      paramsSerializer: {
        indexes: true,
      }
    })
      .then(response => { console.log(response.data) })
    setChanges({}); // TODO only do this when changes confirmed
    get_data()
  }


  const [dataLabels, setDataLabels] = useState(() => get_labels());

  const create_lists = async () => {

    await get_data("Recently Added", "", [], ["name", "label"], ["last_modified", "descending"], 10)

    await get_data("Most Abundant", "", [], ["name", "label"], ["qty", "descending"], 10)
    
    await get_data("Rarest Items", "", [], ["name", "label"], ["qty", "ascending"], 10)

    await get_data("Oldest Items", "", [], ["name", "label"], ["date_created", "ascending"], 10)



    // var obj = Object.keys(get_labels())

    // var obj = Object.keys(dataLabels)
    // if (obj.length > 0) {
    //   for (var i = 0; i < 3 && i < obj.length; i++) {
    //     await get_data("Top Category: " + obj[i], "", [obj[i]], ["name", "label"], ["qty", "descending"], 10)
    //   }
    // }
  }

  // const [data, setData] = useState(() => get_data());
  const [pageNum, setPageNum] = useState(0);

  // Data from server
  const [changes, setChanges] = useState({}) // Changes to data to be updated
  const [lists, setLists] = useState({});

  const [inputItem, setInputItem] = useState("");
  const [inputQty, setInputQty] = useState(0);

  function handleUpdate() {
    console.log(inputItem, inputQty);
    update_item(inputItem, inputQty);
  }

  // Add or remove qty of item (positive or negative integers)
  const update_item = async (item, qty) => {
    var temp = changes;
    if (item in changes) {
      temp[item]['qty'] = temp[item]['qty'] + qty;
    }
    else {
      temp[item]['qty'] = qty;
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

  // useEffect( () => {
  //   create_lists()
  // })

  useEffect(() => {

    const configure = async () => {
      get_labels()
      console.log(dataLabels)
      create_lists()
    }

    configure()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="userHomeTop">
        <div className="bodyTitle">
          <h2>Home</h2>
        </div>
        <div className="body">
          <div className="bodyHeader">
            <h2>Search</h2>
            <Link to="/Search">
              <IconButton sx={{ bgcolor: "main.primary", borderRadius: "5px", height: "max-content", color: "main.accent" }} color="accent">
                <SearchIcon></SearchIcon>
              </IconButton>
            </Link>
            <Link to="/randomize">
              <Button variant="contained" onClick={() => {}}>I'm Feeling lucky!</Button>
            </Link>
          </div>
          <div className="categories">
            {lists != null && Object.entries(lists).map((cat) => (
              <div className="lists">
                <div className="items">
                  <div className="listName">
                    <h2><u>{cat[0]}</u></h2>
                  </div>
                  <div className="itemRow">
                    {Object.entries(lists[cat[0]][0]).map((item) => (
                      // item[0] is the key, item[1] is value
                      <div className="item">
                        <div className="itemTitle">
                          <h3 key={'item ' + item[0]}>{item[0]} </h3>
                          <Tooltip key={'tt ' + item[0]} title={item[1]["Recently Added"]}>
                            <AccessTimeFilled sx={{ fontSize: 40 }}></AccessTimeFilled>
                          </Tooltip>
                        </div>
                        <p key={'qty ' + item[0]}>Quantity: {item[1]["qty"]}</p>
                        <p key={'label ' + item[0]}>Labels: {item[1]["labels"]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ThemeProvider >
  );
};

export default UserHome;
