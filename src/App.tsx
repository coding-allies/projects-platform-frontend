import * as React from "react";
import { AppContextProvider } from "./contexts/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { Projects } from "./pages/Projects";
import Welcome from "./pages/Welcome";
import AddProject from "./pages/AddProject";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
      <Router>
      <Header />
        <Switch>
          <Route path="/add-project">
            <AddProject />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
