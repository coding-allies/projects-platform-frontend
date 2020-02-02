import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project, AppContextState } from "../types";
import axios from "axios";
export const AppContext = createContext({});

const mockUser: User = {
  name: "",
  is_authenticated: false,
  csrf: ""
};

export const mockProjects: Array<Project> = [

  // {
  //   name: "Project Name here",
  //   id: 18237,
  //   lead: {
  //     name: "Ada Lovelace",
  //     experience: "Experienced (3+ years of experience)",
  //     company: "Self-employed"
  //   },
  //   description:
  //     "This project aims to achieve...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   lookingFor:
  //     "I could really use some help with enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   contributors: ["NS", "MM", "NN", "IJ", "FR", "HJ", "WS"],
  //   tags: [
  //     "JS",
  //     "ReactJS",
  //     "Typescript",
  //     "TypescriptTypescript",
  //     "CSS",
  //     "Objective C"
  //   ]
  // },
  // {
  //   name: "Project 2 here context",
  //   id: 34534,
  //   lead: {
  //     name: "Jane Doe",
  //     experience: "Learner (0+ years of experience)",
  //     company: "ABC Comp"
  //   },
  //   description:
  //     "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   lookingFor: "I could really use some help with the front-end.",
  //   contributors: ["JD"],
  //   tags: ["JS", "ReactJS"]
  // },
  // {
  //   name: "Project 2 here context",
  //   id: 34535,
  //   lead: {
  //     name: "Sandy Doe",
  //     experience: "Learner (0+ years of experience)",
  //     company: "Test Company"
  //   },
  //   description:
  //     "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   lookingFor:
  //     "Any help with enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   contributors: ["JD"],
  //   tags: ["JS", "ReactJS"]
  // },
  // {
  //   name: "Project 2 here context",
  //   id: 34536,
  //   lead: {
  //     name: "Ginny Doe",
  //     experience: "Learner (0+ years of experience)",
  //     company: "ABC Comp"
  //   },
  //   description:
  //     "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   lookingFor: "We're just getting started, so any help is appreciated!",
  //   contributors: ["JD"],
  //   tags: ["JS", "ReactJS"]
  // }

];

export function AppContextProvider(props) {
  const [user, setUser] = useState(mockUser);
  const [projects, setProjects] = useState(mockProjects);

  const fetchData = async () => {
    axios.defaults.withCredentials = true;
    const result = await axios(
      "http://127.0.0.1:8000/projects/all/",
    );
    console.log("xx", result.data.user);
    setUser(result.data.user);
    setProjects(result.data.projects);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <AppContext.Provider value={{ user, projects, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
}
