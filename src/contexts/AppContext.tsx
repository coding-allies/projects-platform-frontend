import * as React from "react";
import { createContext, Component } from "react";
import { User, Project } from "../types";

export const AppContext = createContext({});

const mockUser: User = {
  name: "Someone Awesome"
};

const mockProjects: Array<Project> = [
  {
    projectName: "Project Name here",
    projectId: 18237,
    projectLead: {
      name: "Rey Dekker",
      experience: "Experienced (3+ years of experience)",
      company: "Facebook"
    },
    description:
      "This project aims to achieve...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
      experience: "Learner (0+ years of experience)",
      company: "ABC Comp"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contributors: ["JD"],
    tags: ["JS", "ReactJS"]
  },
  {
    projectName: "Project 2 here context",
    projectId: 34534,
    projectLead: {
      name: "Jane Doe",
      experience: "Learner (0+ years of experience)",
      company: "ABC Comp"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contributors: ["JD"],
    tags: ["JS", "ReactJS"]
  },
  {
    projectName: "Project 2 here context",
    projectId: 34534,
    projectLead: {
      name: "Jane Doe",
      experience: "Learner (0+ years of experience)",
      company: "ABC Comp"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contributors: ["JD"],
    tags: ["JS", "ReactJS"]
  }
];

export class AppContextProvider extends Component<any, any> {
  state = {
    user: mockUser,
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
