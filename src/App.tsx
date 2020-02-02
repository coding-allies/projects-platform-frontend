import * as React from "react";
import { AppContextProvider } from "./contexts/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { Projects } from "./pages/Projects";
import { Token } from "./pages/Token";
import Welcome from "./pages/Welcome";
import AddProject from "./pages/AddProject";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
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
              <Route path="/token/:token" component={Token} />
              <Route path="/">
                <Welcome />
              </Route>
            </Switch>
          </Router>
        </AppContextProvider>
      </CookiesProvider>
    </div>
  );
}

export default App;
