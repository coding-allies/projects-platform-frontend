import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/">
            <Welcome />
          </Route>
          <Route path="/welcome">
            <Projects />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
