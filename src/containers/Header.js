import React, { useState, useEffect } from "react";

// import { useSelector, useDispatch } from 'react-redux'

import "../assets/navbar.css";

// routes config
// import routes from '../routes'
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

const Header = ({ setToggleSideBar, toggleSideBar }) => {
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <CToggler
    //   inHeader
    //   className='ml-md-3 d-lg-none'
    //   onClick={toggleSidebarMobile}
    // />
    // <CToggler
    //   inHeader
    //   className='ml-3 d-md-down-none'
    //   onClick={toggleSidebar}
    // />
    <Grid
      style={{ width: "100%" }}
      className={`nav px-2 ${menuOpen ? " nav-open" : ""}`}
    >
      <Grid className='nav-content' container>
        <Button
          style={{ textDecoration: "none" }}
          className='nav-logo'
          onClick={() => setToggleSideBar(!toggleSideBar)}
        >
          <Grid className='nav-logo' container xs={4} direction='row'>
            {" "}
            Wrestling DB
          </Grid>{" "}
        </Button>

        {/* {menuOpen && ( */}
        <Grid
          container
          xs={8}
          className='nav-links__container'
          justify='flex-end'
        >
          {links &&
            links.map((link, i) => (
              <Grid item className='pt-4' justir>
                <Link
                  to={link.to}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  key={i}
                >
                  <Grid className='nav-link__text'>{link.title}</Grid>
                  {/* <Grid className='nav-link__background' /> */}
                </Link>{" "}
              </Grid>
            ))}
          {/* <Grid>
            <Link className='nav-link' to='/fantasy'>
              <Grid className='nav-link__text' style={{ color: "gold" }}>
              Fantasy
            </Grid>
              <Grid className='nav-link__background' />
            </Link>{" "}
          </Grid> */}
        </Grid>
        {/* )} */}

        <Grid className='nav-menu__icon' onClick={() => setMenuOpen(!menuOpen)}>
          <Grid />
          <Grid />
        </Grid>
      </Grid>
    </Grid>
  );
};

const links = [
  { to: "/", title: "Home" },
  { to: "/database", title: "Matches" },
  { to: "/techniques", title: "Techniques" },
  { to: "/stats", title: "Stats" },

  { to: "/wrestler", title: "Wrestlers" },
];

export default Header;
