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

    const get_data = async (search_string = "", labels = [], filter_type = [], sort_type = [], items_per_page = 25) => {
        console.log("get_data called");

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
                setData(response.data);
                console.log(response.data);
                return response.data;
            });
    };

    const get_labels = async () => {
        console.log("get_labels called");
        await axios.get("http://localhost:5000/labels")
            .then((response) => {
                setDataLabels(response.data);
                console.log(response.data);
                return response.data;
            });
    };

    // Data
    const [data, setData] = useState(() => get_data());
    const [dataLabels, setDataLabels] = useState(() => get_labels());

    // Search Params
    const [name, setName] = useState('')
    const [labels, setLabels] = useState([])
    const [filters, setFilters] = useState(["name", "label"])
    const [sort, setSort] = useState(["alpha", "ascending"]);
    const [ipp, setIpp] = useState(25);

    // Page
    const [page, setPage] = useState(0)



    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateAscDesc = (event) => {
        let temp = sort;
        temp[1] = event.target.checked ? "ascending" : "descending"
        setSort(temp);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    useEffect(() => {
        setData(get_data(name, labels, filters, sort, ipp))
    }, [name, labels, filters, sort, ipp]);

    return (
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
                                {dataLabels != null && Object.entries(dataLabels).map((item) => (
                                    <FormControlLabel key={item[0]} label={item[0]} control={
                                        <Checkbox />
                                    } />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                        <FormControl>
                            <InputLabel>Sort by</InputLabel>
                            <Select label="Sort by" value={sort[0]} id="dropdown" onChange={(e) => { setSort([e.target.value, sort[1]]); }}>
                                <MenuItem value={"alpha"}>Alphabetical</MenuItem>
                                <MenuItem value={"qty"}>Quantity</MenuItem>
                                <MenuItem value={"date_added"}>Date added</MenuItem>
                                <MenuItem value={"last_modified"}>Last modified</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="ascDesc">
                            <p>Descending</p>
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked onClick={(e) => {
                                    setSort([sort[0], e.target.checked ? "ascending" : "descending"]);
                                }} />} label="Ascending"></FormControlLabel>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="searchBodyBody">
                        <div className="searchRow">
                            <TextField className="searchBar" label="Search" sx={{ width: "700px" }} onChange={(e) => setName(e.target.value)}></TextField>
                            <IconButton sx={{ bgcolor: "main.primary", borderRadius: "5px", height: "max-content", color: "main.accent" }} color="accent">
                                <SearchIcon></SearchIcon>
                            </IconButton>
                        </div>

                        <div key={data} className="items">
                            {data[page] != null && Object.entries(data[page]).map((item) => (
                                // item[0] is the key, item[1] is value
                                <div className="item" id={item[0]}>
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
                            ))}
                        </div>
                        <div className="paginator">
                            <Pagination count={Object.keys(data).length} onChange={handleChangePage} />
                        </div>
                    </div>
                </div>
            </div >
        </ThemeProvider >
    );
};

export default Search;