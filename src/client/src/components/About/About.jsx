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
import "./About.css";
import { Add, Inventory, AccountCircle } from "@mui/icons-material";
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

const About = () => {

  return (
    <div className="aboutTop">
      <div className="bodyTitle">
        <h2>About</h2>
        <p>
          Welcome to Internal Home directory! This app is intended to be a
          inventory management system with quality of life features to help
          people reduce waste and consumption!
        </p>
        <h2>Contributors:</h2>
        <p>Rey Hicks (Backend (Python) / Database (SQLite))</p>
        <p>Justin Tran - (Frontend (React) / Database)</p>
      </div>
    </div>
  );
};

export default About;