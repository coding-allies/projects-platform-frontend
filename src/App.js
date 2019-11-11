import React from "react";
import logo from "./logo.svg";
import Header from "./components/Header"
import PlatformSummary from "./components/PlatformSummary"
import Projects from "./pages/Projects";

function App() {
  return (
    <div className="App">
      <Header />
      <PlatformSummary />
      <Projects />
    </div>
  );
}

export default App;
