import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project } from "../types";
import axios from "axios";
import { useCookies } from 'react-cookie';

export const AppContext = createContext({});

const mockUser: User = {
  name: "",
  is_authenticated: false,
  csrf_token: "",
  auth_token: "",
};

export const mockProjects: Array<Project> = [
];

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(mockUser);
  const [projects, setProjects] = useState(mockProjects);

  const [cookies] = useCookies(['auth_token']);

  const token = cookies.auth_token;
  console.log("cookies in context", token);
  const fetchData = async () => {
    // axios.defaults.withCredentials = true;

    const result = await axios(
      { method: 'get', url: "http://127.0.0.1:8000/projects/all/", headers: { Authorization: `Token ${token}` } }
    );
    console.log("xx", result.data.user);
    result.data.user.auth_token = cookies.auth_token;
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
