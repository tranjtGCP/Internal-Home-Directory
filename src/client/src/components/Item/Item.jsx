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
import SearchIcon from '@mui/icons-material/Search';
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import "./Search.css";
import { Add, Inventory, AccountCircle, ArrowDownward, Check, CheckBox, BorderAllSharp, Label } from "@mui/icons-material";
import axios from "axios";
import React, { useMemo, useState, useLayoutEffect, debounce, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useRoutes,
    createBrowserRouter,
    RouterProvider,
    Link,
} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    createTheme,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import UserHome from "../UserHome/UserHome";
import get_data from "../UserHome/UserHome";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Pagination from '@mui/material/Pagination';

const Item = () => {

    render() {
        return (
            // item[0] is the key, item[1] is value
            <div div className="item" id={item[0]} >
                <div className="itemTitle">
                    <h3>{item[0]} </h3>
                    <Tooltip key={item[0]} title={"Last modified:" + item[1]["last_modified"]}>
                        <AccessTimeFilledIcon sx={{ fontSize: 40 }}></AccessTimeFilledIcon>
                    </Tooltip>
                </div>
                <p key={item[0]}>Quantity: {item[1]["qty"]}</p>

                <p>Labels: ({item[1]["labels"].length})</p>
                <div className="labels">
                    {item[1]["labels"] != null && Object.entries(item[1]["labels"]).map((label) => (
                        <p> {label[1]},</p>
                    ))}
                </div>

                <Button variant="contained" onClick={handleClickOpen} sx={{ style: { borderColor: "white" } }}>Edit</Button>

                <Dialog open={open} onClose={handleClose} BackdropProps={{ style: { backgroundColor: "transparent" } }}>
                    <DialogTitle key={item[0]}>{item[0]}</DialogTitle>
                </Dialog>
            </div>
        );
    }
}