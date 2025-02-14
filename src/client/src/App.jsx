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
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import "./App.css";
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
import UserHome from "./components/UserHome/UserHome";
import About from "./components/About/About";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <UserHome />,
    },
    {
      path: "/About",
      element: <About />,
    },
  ]);

  return (
    <>
      <div className="top">
        <BrowserRouter>
          <Box className="topBox">
            <AppBar position="sticky" className="header">
              <Toolbar>
                <div className="headerTitle">
                  <Link to="/">Internal Home Directory</Link>
                </div>
                <IconButton color="#426B1F" aria-label="add an alarm">
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/About" element={<About />} />
            </Routes>
            <BottomNavigation className="footer">
              <a
                href="https://github.com/tranjtGCP/Internal-Home-Directory"
                className="footer"
              >
                GitHub
              </a>
              <Link to="/About"><p>About</p></Link>
            </BottomNavigation>
          </Box>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;