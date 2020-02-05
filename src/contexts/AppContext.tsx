import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project, AppContextState } from "../types";
import axios from "axios";
import Cookies from 'js-cookie';

export const AppContext = createContext({} = {});

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

  const fetchData = async (token) => {
    const result = await axios(
      { method: 'get', url: "http://127.0.0.1:8000/projects/user/", headers: { Authorization: `Token ${token}` } }
    );

    console.log("xx fetchData", result);
    // result.data.user.auth_token = cookies.auth_token;

    setUser(result.data.user);
    console.log("xx after set user", result.data.user);
    // setProjects(result.data.projects);
  };

  useEffect(() => {
    const token = Cookies.get("auth_token");
    console.log("Calling user endpoint", token);
    if (token) {
      fetchData(token);
    }
  }, [user.is_authenticated]);


  return (
    <AppContext.Provider value={{ user, projects, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
}
