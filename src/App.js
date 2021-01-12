import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Hogwarts from "./Components/Hogwarts";
import Characters from "./Components/Characters.js";
import School from "./Components/School";
import MyPage from "./Components/MyPage";
import LoggingInOut from "./Components/Login-out";
import NoMatch from "./Components/NoMatch";

import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory
} from "react-router-dom";

function Header({isLoggedIn, loginMsg}) {
  console.log("isLoggedIn: " + isLoggedIn);
  // If isLoggedIn is true the element after && is rendered
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/">Hogwarts</NavLink></li>
        <li><NavLink activeClassName="active" to="/characters">Characters</NavLink></li>
        <li><NavLink activeClassName="active" to="/school">School</NavLink></li>

        {isLoggedIn && (
          <React.Fragment>
            <li><NavLink activeClassName="active" to="/mypage">My Page</NavLink></li>
          </React.Fragment>
        )}
        <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
      </ul>
    </div>
  );
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };

  return (
    <Router>
    <div>
      <Header 
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
      />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <Hogwarts />
          </Route>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/school">
            <School />
          </Route>
          <Route path="/mypage">
            <MyPage isLoggedIn={isLoggedIn}/>
          </Route>
          <Route path="/login-out">
            <LoggingInOut 
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
            />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>  
    </div>
    </Router>
  );
}

export default App;
