import React, { createContext, Component } from "react";

export const AppContext = createContext();

const mockProjects = [
  {
    projectName: "Project Name here",
    projectId: 18237,
    projectLead: {
      name: "Rey Dekker",
      yearsOfExperience: 5,
      currentPosition: "Facebook"
    },
    description:
      "This project aims to achieve...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    numberOfContributors: 3,
    contributors: ["NS", "MM", "NN", "IJ", "FR", "HJ", "WS"],
    tags: [
      "JS",
      "ReactJS",
      "Typescript",
      "TypescriptTypescript",
      "CSS",
      "Objective C"
    ]
  },
  {
    projectName: "Project 2 here context",
    projectId: 34534,
    projectLead: {
      name: "Jane Doe",
      yearsOfExperience: 1,
      currentPosition: "ABC Comp"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfContributors: 1,
    contributors: ["JD"],
    tags: ["JS", "ReactJS"]
  }
];

export class AppContextProvider extends Component {
  state = {
    user: false,
    projects: mockProjects
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
