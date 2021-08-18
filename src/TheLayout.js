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
import ProfileSearch from "./pages/wrestler/ProfileSearch";

// import { AppProvider } from "../context/context";
import GeneralStats from "./pages/stats/GeneralStats";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TechniqueDatabase from "./pages/TechniqueDatabase";
import F404 from "./pages/F404";
import MakeSelections from "./pages/fantasy/MakeSelections";
import Fantasy from "./pages/fantasy/Fantasy";

const TheLayout = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <Grid style={{ width: "100%" }}>
      {/* <Router> */}
      <Sidebar
        setToggleSideBar={setToggleSideBar}
        toggleSideBar={toggleSideBar}
      />
      <Grid container xs={12} style={{ width: "100%" }}>
        <Header
          setToggleSideBar={setToggleSideBar}
          toggleSideBar={toggleSideBar}
        />
        <Grid xs={12} style={{ width: "100%", background: "#f7fcfc" }}>
          <AuthProvider>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/wrestler'>
                <ProfileSearch />
              </Route>{" "}
              <Route path='/wrestlers/:wrestler_id'>
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
              <Route exact path='/fantasy'>
                <Fantasy />
              </Route>
              <Route exact path='/fantasy/makeselections'>
                <MakeSelections />
              </Route>
              {/* </Route> */}
              <Route exact path='/match/view/:match_id'>
                <View />
              </Route>
              <Route exact path='/stats'>
                <GeneralStats />
              </Route>
              <PrivateRoute exact path='/testprivate' component={Create} />
              <PrivateRoute exact path='/manage' component={Manage} />
              <Route component={F404} />{" "}
            </Switch>
          </AuthProvider>
        </Grid>

        <Footer />
      </Grid>
      {/* </Router> */}
    </Grid>
  );
};

export default TheLayout;
