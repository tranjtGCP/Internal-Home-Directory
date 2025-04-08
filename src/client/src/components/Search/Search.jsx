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
import { Add, Inventory, AccountCircle, ArrowDownward, Check, CheckBox, BorderAllSharp, Label, Edit } from "@mui/icons-material";
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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IHDItem from "../../elements/ihd-item";
import EditIcon from '@mui/icons-material/Edit';

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
                // console.log(response.data);
                return response.data;
            });
    };

    const save_changes = async () => {
        await axios.get('http://localhost:5000/save_changes', {
            params: changes,
            paramsSerializer: {
                indexes: true,
            }
        })
            .then(response => {
                setData(get_data(name, labels, filters, sort, ipp));
                get_labels();
            });
    }

    const get_labels = async () => {
        console.log("get_labels called");
        await axios.get("http://localhost:5000/labels")
            .then((response) => {
                setDataLabels(response.data);
                setOgDataLabels(response.data);
                return response.data;
            });
    };

    const delete_item = async (item) => {
        await axios.delete('http://localhost:5000/item',
            {
                params: {
                    'item': item,
                }
            })
            .then(response => {
                setData(get_data(name, labels, filters, sort, ipp))
                get_labels();
                return response.data;
            });

    }

    const [ogDataLabels, setOgDataLabels] = useState({});

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
    const [page, setPage] = useState(0);

    // Add / Edit dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Remove dialog
    const [openRemove, setOpenRemove] = useState(false);
    const handleClickOpenRemove = () => {
        setOpenRemove(true);
    };
    const handleCloseRemove = () => {
        setOpenRemove(false);
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

    const handleSearchFilters = (e) => {
        let asArray = Object.entries(ogDataLabels);
        let filtered = asArray.filter(([key, value]) => key.includes(e.target.value));
        let newLabels = Object.fromEntries(filtered);
        setDataLabels(newLabels);
    }

    const handleAddSubmit = async (e) => {
        event.preventDefault();
        await save_changes();
        handleClose();
    }

    const handleRemoveSubmit = async (e) => {
        event.preventDefault();
        await delete_item(itemToRemove);
        handleCloseRemove();
    }

    // const [nameAdd, setNameAdd] = useState('');
    // const [quantityAdd, setQuantityAdd] = useState(0);
    // const [labelsAdd, setLabelsAdd] = useState([]);

    // useEffect(() => {
    //     let temp = sort;

    //     if (labels.length > 0) {
    //         temp[1] = "label";
    //     } else {
    //         temp[1] = ""
    //     }
    //     setSort(temp)


    // }, [labels])

    // useEffect(() => {
    //     let temp = sort;
    //     if (name) {
    //         temp[0] = "name";
    //     } else {
    //         temp[1] = ""
    //     }
    //     setSort(temp)
    // }, [name])

    const [changes, setChanges] = useState({});

    const [itemToRemove, setItemToRemove] = useState("");

    // const [labelsAddArr, setLabelsAddArr] = useState([]);

    return (
        <ThemeProvider theme={theme}>
            <div className="searchTop">
                <div className="bodyTitle">
                    <h2>Search, Filter, Add, and Update</h2>
                </div>
                <div className="searchBody">
                    <div className="filtersColumn">
                        <Accordion className="filterDropdown" defaultExpanded>
                            <AccordionSummary expandIcon={<ArrowDownward />}>
                                <Typography> Filters </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField className="filterSearchBar" onKeyUp={(e) => (
                                    handleSearchFilters(e)
                                )} />
                            </AccordionDetails>
                            <AccordionDetails className="filters">
                                {dataLabels != null && Object.entries(dataLabels).map((item) => (
                                    <FormControlLabel key={item[0]} label={item[0]} control={
                                        <Checkbox onChange={(e) => {
                                            if (e.target.checked) {
                                                setLabels([...labels, item[0]]);
                                            }
                                            else {
                                                setLabels(labels.filter(a => a != item[0]))
                                            }
                                        }} />
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
                            <Button className="addItem" variant="contained" startIcon={<AddIcon></AddIcon>} endIcon={<EditIcon></EditIcon>} onClick={handleClickOpen}>Add / Edit Item</Button>
                            <Button className="removeItem" variant="contained" endIcon={<DeleteIcon></DeleteIcon>} onClick={handleClickOpenRemove} sx={{ style: { backgroundColor: "red" } }}>Remove Item</Button>
                            <Dialog onClose={handleClose} open={open} className="addItemDialog" PaperProps={{
                                style: {
                                    padding: "1rem", justifyContent: "left", textAlign: "left", display: "flex", flexDirection: "column"
                                }
                            }}>
                                <h2 style={{ margin: "0" }}>Add / Edit Item</h2>
                                <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleAddSubmit}>
                                    <TextField required label="Name" variant="outlined" onChange={(e) => {
                                        let temp = changes;
                                        temp['item'] = e.target.value;
                                        setChanges(temp);
                                    }} helperText="Enter existing item name to edit"></TextField>
                                    <TextField label="Quantity" variant="outlined" onChange={(e) => {
                                        let temp = changes;
                                        temp['qty'] = e.target.value;
                                        setChanges(temp);
                                    }}></TextField>
                                    <TextField label="Labels" variant="outlined" defaultValue={""} onChange={(e) => {
                                        let labels = e.target.value ? e.target.value.split(", ") : [""];
                                        let temp = changes;
                                        temp['labels'] = labels;
                                        setChanges(temp);
                                    }}>
                                    </TextField>
                                    <Button type="submit" variant="contained">Submit</Button>
                                </form>
                            </Dialog>

                            <Dialog onClose={handleCloseRemove} open={openRemove} className="removeItemDialog" PaperProps={{
                                style: {
                                    padding: "1rem", justifyContent: "left", textAlign: "left", display: "flex", flexDirection: "column"
                                }
                            }}>
                                <h2 style={{ margin: "0" }}>Remove Item</h2>
                                <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleRemoveSubmit}>
                                    <TextField required label="Name" variant="outlined" onChange={(e) => {
                                        setItemToRemove(e.target.value);
                                    }} helperText="Enter name of item to remove"></TextField>
                                    <Button type="submit" variant="contained" className="removeSubmit" sx={{ style: { backgroundColor: "#f04a37" } }}>Submit</Button>
                                </form>
                            </Dialog>
                        </div>

                        <div key={data} className="items">
                            {data[page] != null && Object.entries(data[page]).map((item) => (
                                <div className="item" id={item[0]}>
                                    <div className="itemTitle">
                                        <h2>{item[0]} : {item[1]["qty"]} </h2>
                                        <Tooltip key={item[0]} title={"Last modified:" + item[1]["last_modified"]}>
                                            <AccessTimeFilledIcon sx={{ fontSize: 40 }}></AccessTimeFilledIcon>
                                        </Tooltip>
                                    </div>
                                    {/* <p>Labels: ({item[1]["labels"].length})</p> */}
                                    <div className="labels">
                                        {item[1]["labels"] != null && Object.entries(item[1]["labels"]).map((label) => (
                                            <p> {label[1]}</p>
                                        ))}
                                    </div>
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