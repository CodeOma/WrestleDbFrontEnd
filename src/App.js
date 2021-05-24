import logo from "./logo.svg";
import "./App.css";
import "./scss/style.scss";

import Editor from "./components/Editor/Editor";
import Home from "./pages/Home";
import Create from "./pages/Create";
import CreateNew from "./components/Create/CreateNew";
import Database from "./pages/Database";
import Signup from "./pages/user/Signup";
import ForgotPassword from "./pages/user/ForgotPassword";
import WrestlerDB from "./pages/WrestlerDatabase";
import WrestlerProfile from "./pages/wrestler/wrestlerProfile";
// import Auto from "./components/components/Auto";
import { AuthProvider } from "./context/AuthContext";
import SearchPage from "./pages/searchPage";
import GeneralStats from "./pages/rankingtables/GeneralStats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./TheLayout";
import TechniqueDatabase from "./pages/TechniqueDatabase";
import SignIn from "./pages/user/SignIn";
// import Profile from "./pages/user/Profile";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/signin' name='Login Page'>
            <SignIn />
          </Route>

          <Route exact path='/signup' name='Signup Page'>
            <Signup />
          </Route>
          <Route exact path='/forgotpassword' name='Forgot Password'>
            <ForgotPassword />
          </Route>
          <Route exact path='/404' name='Page 404' />
          <Route exact path='/500' name='Page 500' />
          {/* <Route exact path='/profile' name='Profile'>
            <Profile />
          </Route> */}

          <Layout />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
