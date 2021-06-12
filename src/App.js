import logo from "./logo.svg";
import "./App.css";
import "./scss/style.scss";
import dotenv from "dotenv";
import Signup from "./pages/user/Signup";
import ForgotPassword from "./pages/user/ForgotPassword";
// import Auto from "./components/components/Auto";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./TheLayout";
import SignIn from "./pages/user/SignIn";

dotenv.config();

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
