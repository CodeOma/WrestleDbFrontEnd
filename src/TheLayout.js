import React, { useState } from "react";
import { Sidebar, Footer, Header } from "./containers/index";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/Route/PrivateRoute";
import { Grid } from "@material-ui/core";
import Home from "./pages/Home";
import Create from "./components/Create/Create";
import Editor from "./components/Create/Editor";

import View from "./components/View/View";

import Manage from "./pages/manage/Manage.jsx";
import Database from "./pages/Database";
import WrestlerDB from "./pages/WrestlerDatabase";
import WrestlerProfile from "./pages/wrestler/wrestlerProfile";
// import { AppProvider } from "../context/context";
import SearchPage from "./pages/searchPage";
import GeneralStats from "./pages/rankingtables/GeneralStats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TechniqueDatabase from "./pages/TechniqueDatabase";
const TheLayout = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <Grid className='c-app c-default-layout'>
      {/* <Router> */}
      <Sidebar toggleSideBar={toggleSideBar} />
      <Grid className='c-wrapper'>
        <Header
          setToggleSideBar={setToggleSideBar}
          toggleSideBar={toggleSideBar}
        />
        <Grid className='c-body w-100 d-flex'>
          {/* <Switch> */}
          <AuthProvider>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/wrestler'>
              <WrestlerProfile />
            </Route>

            <Route exact path='/db'>
              <WrestlerDB />
            </Route>
            <Route exact path='/database'>
              <Database />
            </Route>
            <Route exact path='/techniques'>
              <TechniqueDatabase />
            </Route>

            <Route path='/search'>
              <SearchPage />
            </Route>
            {/* MATCHES */}
            <Route exact path='/match/edi'>
              <Editor />
            </Route>
            <Route exact path='/match/create'>
              <Create />
            </Route>
            <Route exact path='/match/edit'>
              <Editor />
            </Route>

            {/* </Route> */}

            <Route exact path='/match/view/:match_id'>
              <View />
            </Route>

            <Route path='/stats'>
              <GeneralStats />
            </Route>
            <PrivateRoute exact path='/testprivate' component={Create} />

            <PrivateRoute exact path='/manage' component={Manage} />
            {/* </Switch> */}
          </AuthProvider>
        </Grid>

        <Footer />
      </Grid>
      {/* </Router> */}
    </Grid>
  );
};

export default TheLayout;
