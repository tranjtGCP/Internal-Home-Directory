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
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Pagination from '@mui/material/Pagination';

class IHDItem extends HTMLDivElement {
    static observedAttributes = ["name", "quantity", "labels", "date_created", "date_modified"];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        // Divs
        const itemTopDiv = document.createElement("div");
        itemTopDiv.setAttribute("class", "itemTop");
        shadow.appendChild(itemTopDiv);

        // Name
        const itemName = document.createElement("h3");
        const itemNameText = this.getAttribute("name");
        itemName.textContent = itemNameText;
        itemTopDiv.appendChild(itemName);

        // Quantity
        const itemQty = document.createElement("p");
        const itemQtyText = this.getAttribute("quantity");
        itemQty.textContent = "Quantity: " + itemQtyText;
        itemTopDiv.appendChild(itemQty);

        // Labels
        const itemLabelsDiv = document.createElement("div");
        itemLabelsDiv.setAttribute("class", "labels");
        itemTopDiv.appendChild(itemLabelsDiv);
        const labels = this.getAttribute("labels");
        const arrayFromLabels = labels.split(",");
        for (let i = 0; i < arrayFromLabels.length; i++) {
            let itemLabel = document.createElement("p");
            itemLabel.textContent = arrayFromLabels[i] + ",";
            itemLabelsDiv.appendChild(itemLabel);
        }

        // Dialog
        const dialog = document.createElement("dialog");
        dialog.setAttribute("class", "dialogBox");
        const dialogDiv = document.createElement("div");
        dialogDiv.setAttribute("class", "itemDialog");
        dialog.appendChild(dialogDiv);

        // Input Div
        const inputsDiv = document.createElement("div");
        inputsDiv.setAttribute("class", "inputs");
        dialogDiv.appendChild(inputsDiv);

        // Name Input
        // const dialogItemName = document.createElement("input");
        // dialogItemName.setAttribute("id", "itemName");
        // dialogItemName.setAttribute("value", this.getAttribute("name"));
        // const dialogNameLabel = document.createElement("label");
        // dialogNameLabel.textContent = "Name:";
        // dialogNameLabel.setAttribute("for", "itemName");
        // inputsDiv.appendChild(dialogNameLabel);
        // inputsDiv.appendChild(dialogItemName);

        // Quantity Input
        const dialogItemQuantity = document.createElement("input");
        dialogItemQuantity.setAttribute("value", this.getAttribute("quantity"));
        const dialogQuantityLabel = document.createElement("label");
        dialogQuantityLabel.textContent = "Quantity:";
        inputsDiv.appendChild(dialogQuantityLabel);
        inputsDiv.appendChild(dialogItemQuantity);

        // Labels Input
        const dialogLabels = document.createElement("textarea");
        for (let i = 0; i < arrayFromLabels.length; i++) {
            dialogLabels.innerHTML += arrayFromLabels[i] + ", ";
        }
        dialogLabels.setAttribute("class", "dialogLabelsInput");
        dialogLabels.setAttribute("id", "dialogLabelsInput");
        dialogLabels.setAttribute("wrap", "hard");
        const dialogLabelLabel = document.createElement("label");
        dialogLabelLabel.textContent = "Labels:";
        inputsDiv.appendChild(dialogLabelLabel);
        inputsDiv.appendChild(dialogLabels);

        // Close button
        const closeButton = document.createElement("Button");
        closeButton.textContent = "close";
        const buttonsDiv = document.createElement("div");
        buttonsDiv.setAttribute("class", "dialogButtons");
        buttonsDiv.appendChild(closeButton);
        dialogDiv.appendChild(buttonsDiv);
        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        // Save button
        const saveButton = document.createElement("button");
        saveButton.textContent = "save";
        buttonsDiv.appendChild(saveButton);
        saveButton.addEventListener("click", () => {
            let labelsStr = document.getElementById("dialogLabelsInput");
            let labelsArr = labelsStr.split(", ");
        });

        itemTopDiv.appendChild(dialog);

        // MUI button please work I am begging you
        const button = document.createElement("button");
        button.textContent = "Edit";
        button.addEventListener("click", () => {
            dialog.showModal();
        })
        itemTopDiv.appendChild(button);

        // Styling
        const style = document.createElement("style");
        style.textContent = `
            .itemTop:hover {
                    filter: brightness(0.96);
                    background-color: #6e95d4;
                    color: white;
                    /* box-shadow: 5px 5px 5px white; */
            }

            .itemTop {
                display: flex;
                flex-direction: column;
                height: 200px;
                width: 250px;
                text-wrap: wrap;
                padding: 1rem;
                border-style: groove;
                border-color: #426b1f;
                border-radius: 1rem;
                justify-content: space-evenly;
                background-color: white;
                transition: 0.3s;

                h3,
                    p {
                        margin: 0;
                    }

                .labels {
                    height: 70px;
                    overflow-y: scroll;
                }
                
                .dialogBox {
                    border-style: groove;
                    border-color: #426b1f;
                    border-radius: 1rem;
                }
                    
                .itemDialog {
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                    gap: 1rem;

                    .inputs {
                        display: flex;
                        flex-direction: column;
                    }

                    p {
                        margin: 0;
                    }

                    .dialogLabelsInput {
                        min-width: 250px;
                        min-height: 50px;
                    }

                    .dialogButtons {
                        display: flex;
                        gap: 1rem;
                    }
                }
            }
        `;

        shadow.appendChild(style);
        console.log(style.isConnected);

    }

    disconnectedCallback() {
    }

    adoptedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
            `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        );
    }
}

export default IHDItem;

customElements.define("ihd-item", IHDItem, { extends: "div" });