import logo from "./logo.svg";
import "./App.css";
import "./scss/style.scss";

import Editor from "../src/components/Editor/Editor";
import Home from "../src/pages/Home";
import Create from "../src/pages/Create";
import CreateNew from "../src/components/Create/CreateNew";
import Database from "../src/pages/Database";
import WrestlerDB from "../src/pages/WrestlerDatabase";
import WrestlerProfile from "../src/pages/wrestler/wrestlerProfile";
import Auto from "../src/components/WebComps/Auto";
import { AppProvider } from "../src/context/context";
import SearchPage from "../src/pages/searchPage";
import AppBar from "../src/components/WebComps/Appbar/Appbar";
import GeneralStats from "../src/pages/rankingtables/GeneralStats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../src/TheLayout";
// import Header from './containers/TheLayout'

import TechniqueDatabase from "../src/pages/TechniqueDatabase";
function App() {
  return (
    <AppProvider>
      <AppBar />
      <Router>
        <Switch>
          <Route path='/wrestler'>
            <WrestlerProfile />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/db'>
            <WrestlerDB />
          </Route>
          <Route exact path='/database'>
            <Database />
          </Route>
          <Route exact path='/Techniques'>
            <TechniqueDatabase />
          </Route>
          <Route path='/layout'>
            <Layout />
          </Route>
          <Route path='/editor'>
            <Editor />
          </Route>
          <Route path='/search'>
            <SearchPage />
          </Route>
          <Route path='/create'>
            <CreateNew />
          </Route>
          <Route path='/stats'>
            <GeneralStats />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
