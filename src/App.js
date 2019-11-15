import React from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import { AppContextProvider } from "./contexts/AppContext";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Header />
        <Projects />
      </AppContextProvider>
    </div>
  );
}

export default App;
