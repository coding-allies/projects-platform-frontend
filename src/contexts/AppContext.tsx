import * as React from "react";
import { createContext, Component } from "react";
import { User, Project, AppContextState } from "../types";

export const AppContext = createContext({});

const mockUser: User = {
  name: "Someone Awesome"
};

export const mockProjects: Array<Project> = [
  {
    projectName: "Project Name here",
    projectId: 18237,
    projectLead: {
      name: "Ada Lovelace",
      experience: "Experienced (3+ years of experience)",
      company: "Self-employed"
    },
    description:
      "This project aims to achieve...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    projectLookingFor:
      "I could really use some help with enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    contributors: ["NS", "MM", "NN", "IJ", "FR", "HJ", "WS"],
    tags: [
      "JS",
      "ReactJS",
      "Typescript",
      "TypescriptTypescript",
      "CSS",
      "Objective C"
    ],
    url: "https://github.com/shescoding/projects-platform-frontend",
    email: "info@shescoding.org"
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
    projectLookingFor:
      "I could really use some help with the front-end.",
    contributors: ["JD"],
    tags: ["JS", "ReactJS"],
    url: "https://github.com/shescoding/projects-platform-frontend",
    email: "info@shescoding.org"
    
  },
  {
    projectName: "Project 2 here context",
    projectId: 34535,
    projectLead: {
      name: "Sandy Doe",
      experience: "Learner (0+ years of experience)",
      company: "Test Company"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projectLookingFor:
      "Any help with enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  
    contributors: ["JD"],
    tags: ["JS", "ReactJS"],
    url: "https://github.com/shescoding/projects-platform-frontend",
    email: "info@shescoding.org"
  },
  {
    projectName: "Project 2 here context",
    projectId: 34536,
    projectLead: {
      name: "Ginny Doe",
      experience: "Learner (0+ years of experience)",
      company: "ABC Comp"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    projectLookingFor:
      "We're just getting started, so any help is appreciated!",
    contributors: ["JD"],
    tags: ["JS", "ReactJS"],
    url: "https://github.com/shescoding/projects-platform-frontend",
    email: "info@shescoding.org"
  }
];

export class AppContextProvider extends Component<any, AppContextState> {
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
