
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
import "./Randomize.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Tooltip } from "@mui/material";

const Randomize = () => {

    const get_data = async (search_string = "", labels = [], filter_type = [], sort_type = [], items_per_page = 1) => {
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
            // console.log(response.data);
            setData(response.data);
            roll(Object.keys(response.data).length)
            return response.data;
          });
      };

    const roll = async (size) => {
        console.log(size)
        let temp = data
        for(let i = 0; i < 3; i++) {
            // let size = Object.keys(data).length;
            temp[i] = [Number(Math.random*size)]
        }
        console.log(temp)
        return temp;
    }

    const [data, setData] = useState(() => get_data());
    const [size, setSize] = useState(0);
    const [lucky, setLucky] = useState(() => roll());

    useEffect(() => {
        roll()
    }, [])

    return (
        <div className="categories">
        <div className="list">
                        <div className="items">
                          <div className="listName">
                            <h2><u>Title</u></h2>
                          </div>
                          <div className="itemRow">
                            {data != null && Object.entries(data[0]).map((luck) => (
                              // item[0] is the key, item[1] is value
                              <div className="item">
                                <div className="itemTitle">
                                  <h3 key={'item ' + data[luck]}>{data[luck]} </h3>
                                  <Tooltip key={'tt ' + data[luck]} title={data[luck]}>
                                    <AccessTimeFilled sx={{ fontSize: 40 }}></AccessTimeFilled>
                                  </Tooltip>
                                </div>
                                <p key={'qty ' + data[luck]}>Quantity: {data[luck]}</p>
                                <p key={'label ' + data[luck]}>Labels: {data[luck]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                  </div>
    );
};

export default Randomize;