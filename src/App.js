import * as React from "react";
import { Reset } from "styled-reset";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./component/Main";
import Header from "./component/Header";
import Profile from "./component/Profile";
import Advertisement from "./component/Advertisement";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <Router>
        <div className="App">
          <div className="main-container">
            <Header></Header>
            <Main></Main>
          </div>
          <div className="right-container">
            <Profile></Profile>
            <Advertisement></Advertisement>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
