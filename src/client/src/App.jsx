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
import { Add, Inventory, AccountCircle, Visibility } from "@mui/icons-material";
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
import Search from "./components/Search/Search";

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


      <div className="appTop">
        <BrowserRouter>
          <Box className="appBox">
            {/* Header */}
            <AppBar position="sticky" className="header">
              <Toolbar>
                <div className="headerTitle">
                  <Link to="/">
                    <p>Internal Home Directory</p>
                  </Link>
                </div>
                <IconButton color="#426B1F" aria-label="add an alarm" style={{ visibility: "hidden" }}>
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            {/* Body */}
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/About" element={<About />} />
              <Route path="/Search" element={<Search />} />
            </Routes>

            {/* Footer */}
            <BottomNavigation className="footer">
              <a
                href="https://github.com/tranjtGCP/Internal-Home-Directory"
                className="footer"
              >
                GitHub
              </a>
              <Link to="/About">
                <p>About</p>
              </Link>
            </BottomNavigation>
          </Box>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;