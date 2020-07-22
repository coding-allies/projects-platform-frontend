import * as React from "react";
import { AppContextProvider } from "./contexts/AppContext";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Projects } from "./pages/Projects";
import { Token } from "./pages/Token";
import Welcome from "./pages/Welcome";
import AddProject from "./pages/AddProject";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <HashRouter>
          <Header />
          <Switch>
            <Route path="/token/:token" component={Token} />
            <Route path="/projects" component={Projects} />
            <Route path="/add-project" component={AddProject} />
            <Route path="/" component={Welcome} />
          </Switch>
          <Footer />
        </HashRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
