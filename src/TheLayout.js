import React, { useState } from "react";
import { Sidebar, Footer, Header } from "./containers/index";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/Route/PrivateRoute";

import Editor from "./components/Editor/Editor";
import Home from "./pages/Home";
import Create from "./pages/Create";
import CreateNew from "./components/Create/CreateNew";
import View from "./components/View/View";

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
    <div className='c-app c-default-layout'>
      {/* <Router> */}
      <Sidebar toggleSideBar={toggleSideBar} />
      <div className='c-wrapper'>
        <Header
          setToggleSideBar={setToggleSideBar}
          toggleSideBar={toggleSideBar}
        />
        <div className='c-body px-4'>
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
            <Route exact path='/match/edit'>
              <Editor />
            </Route>
            <Route exact path='/match/create'>
              <CreateNew />
            </Route>

            {/* </Route> */}

            <Route exact path='/match/view/:match_id'>
              <View />
            </Route>

            <Route path='/stats'>
              <GeneralStats />
            </Route>
            <PrivateRoute exact path='/testprivate' component={CreateNew} />

            {/* </Switch> */}
          </AuthProvider>
        </div>

        <Footer />
      </div>
      {/* </Router> */}
    </div>
  );
};

export default TheLayout;
