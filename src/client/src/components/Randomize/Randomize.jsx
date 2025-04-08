
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
import { Add, Inventory, AccountCircle, ChangeCircleSharp, AccessTimeFilled, X } from "@mui/icons-material";
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
            var sizeOfData = Object.keys(response.data).length;
            return response.data;
        });
    };
    
    const [data, setData] = useState(() => get_data());
    const [size, setSize] = useState();
    const [lucky, setLucky] = useState([1,2,3]);

    const roll = async (size=100) => {
        let temp = []
        for(let i = 0; i < 3; i++) {
            // let size = Object.keys(data).length;
            let number = Math.trunc(Math.random()*size)
            // console.log(number)
            temp.push(number)
        }
        console.log(temp);
        setLucky(temp);
        return temp;
    }

    useEffect(() => {
        if(data != null) {
            setSize(Object.keys(data).length);
        }
    }, [data])

    return (
        <div className="randomizeTop">

            <div className="categories">
                <div className="list">
                    <div className="items">
                        <div className="listName">
                            <h1><u>Lucky items</u></h1>
                        </div>
                        <div className="itemRow">
                            {lucky != null && lucky.map((luck) => (
                                // item[0] is the key, item[1] is value
                                <div key={luck} className="item">
                                    {size != null && data[0] != null && Object.entries(data[Math.trunc(Math.random()*size)]).map((item) => (
                                        <div className="itemTitle">
                                            <div className="titleRow">
                                                <h2 key={item[luck]}>{item[0]} : {item[1]["qty"]} </h2>
                                                <Tooltip key={item[0]} title={item[0]}>
                                                    <AccessTimeFilled sx={{ fontSize: 40 }}></AccessTimeFilled>
                                                </Tooltip>
                                            </div>
                                            <div className="itemActions">
                                                <div className="labels">

                                                    {item[1]["labels"] != null && item[1]["labels"].map((label) => (
                                                        <p key={item[1]["labels"][label]}>{label}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Randomize;