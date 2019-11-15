import React, { createContext, Component } from "react";

export const AppContext = createContext();

export class AppContextProvider extends Component {
  state = {
    user: false,
    projects: null
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
