import React, { useState } from "react";
// import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import PersonIcon from "@material-ui/icons/Person";
// sidebar nav config
import { nav as navigation, manageOptions, settingOptions } from "./_nav";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Sidebar = ({ toggleSideBar }) => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("initialState");
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  const profile = [
    {
      _tag: "CSidebarNavTitle",
      _children: ["Profile"],
    },
  ];

  return (
    <CSidebar show={toggleSideBar}>
      <CSidebarBrand className='d-md-down-none' to='/'>
        LOGO
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <Link className='c-sidebar-nav-link ' to='/Home'>
          Dashboard
        </Link>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
            PersonIcon,
          }}
        />
        {currentUser && (
          <CCreateElement
            items={manageOptions}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}
        <>
          <CCreateElement
            items={profile}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </>

        {currentUser ? (
          <Grid>
            {" "}
            <Link
              className='c-sidebar-nav-link '
              to='/profile'
              onClick={() => console.log("logout")}
            >
              <PersonIcon /> Profile
            </Link>
            <Link className='c-sidebar-nav-link ' to='/' onClick={handleLogout}>
              Logout
            </Link>
          </Grid>
        ) : (
          <Grid>
            <Link className='c-sidebar-nav-link ' to='/signin'>
              Sign In
            </Link>

            <Link className='c-sidebar-nav-link ' to='signup'>
              Sign Up
            </Link>
          </Grid>
        )}
      </CSidebarNav>
      {/* <CSidebarMinimizer className='c-d-md-down-none' /> */}
    </CSidebar>
  );
};
export default Sidebar;

// export default React.memo(TheSidebar)
