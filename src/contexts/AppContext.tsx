import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project, AppContextState } from "../types";
import axios from "axios";
export const AppContext = createContext({});

const mockUser: User = {
  name: "",
  is_authenticated: false,
  csrf_token: "",
  auth_token: "",
};

export const mockProjects: Array<Project> = [
];

export function AppContextProvider(props) {
  const [user, setUser] = useState(mockUser);
  const [projects, setProjects] = useState(mockProjects);

  const fetchData = async () => {
    // axios.defaults.withCredentials = true;
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
