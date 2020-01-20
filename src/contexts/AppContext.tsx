import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project, AppContextState } from "../types";
import axios from "axios";
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
    projectLookingFor:
      "I could really use some help with the front-end.",
    contributors: ["JD"],
    tags: ["JS", "ReactJS"]
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
    tags: ["JS", "ReactJS"]
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
    tags: ["JS", "ReactJS"]
  }
];

export function AppContextProvider(props) {
  const [user, setUser] = useState(mockUser);
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {

    const fetchData = async () => {
      const result = await axios(
        "http://127.0.0.1:8000/projects/all/",
      );
      console.log("xx", result);
      setUser(result.data.user);
      setProjects(result.data.projects);
    };
    fetchData();
  }, []);


  return (
    <AppContext.Provider value={{ user, projects }}>
      {props.children}
    </AppContext.Provider>
  );
}
