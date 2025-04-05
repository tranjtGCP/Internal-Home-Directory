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
import { Add, Inventory, AccountCircle, ArrowDownward, Check, CheckBox, BorderAllSharp } from "@mui/icons-material";
import axios from "axios";
import React, { useMemo, useState, useLayoutEffect, debounce } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useRoutes,
    createBrowserRouter,
    RouterProvider,
    Link,
} from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, createTheme, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";


const theme = createTheme({
    palette: {
        main: {
            accent: "#426b1f",
            primary: "#efecdb"
        }
    },
    shape: {
        borderRadius: "5px"
    }
});

const Search = () => {
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="searchTop">
                    <div className="bodyTitle">
                        <h2>Search and Filter By</h2>
                    </div>
                    <div className="searchBody">
                        <div className="filtersColumn">
                            <Accordion className="filterDropdown" defaultExpanded>
                                <AccordionSummary expandIcon={<ArrowDownward />}>
                                    <Typography> Filters </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField className="filterSearchBar" />
                                </AccordionDetails>
                                <AccordionDetails className="filters">
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                    <FormControlLabel label="Example filter" control={
                                        <Checkbox />
                                    } />
                                </AccordionDetails>
                            </Accordion>
                            <FormControl>
                                <InputLabel>Sort by</InputLabel>
                                <Select label="Sort by" onChange={handleChange} value={sort}>
                                    <MenuItem value={1}>Alphabetical</MenuItem>
                                    <MenuItem value={2}>Quantity</MenuItem>
                                    <MenuItem value={3}>Date added</MenuItem>
                                    <MenuItem value={4}>Last modified</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="ascDesc">

                                <p>Descending</p>
                                <FormGroup>
                                    <FormControlLabel control={<Switch defaultChecked />} label="Ascending"></FormControlLabel>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="searchBodyBody">
                            <div className="searchRow">
                                <TextField className="searchBar" label="Search" sx={{ width: "700px" }}></TextField>
                                <IconButton sx={{ bgcolor: "main.primary", borderRadius: "5px", height: "max-content", color: "main.accent" }} color="accent">
                                    <SearchIcon></SearchIcon>
                                </IconButton>
                            </div>
                            <div className="items">
                            </div>
                        </div>
                    </div>
                </div >
            </ThemeProvider>
        </>
    );
};

export default Search;