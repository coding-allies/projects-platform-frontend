import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project, AppContextState } from "../types";
import axios from "axios";
import Cookies from 'js-cookie';

export const AppContext = createContext({} = {});
const baseUrl = "http://127.0.0.1:8000";
const baseProjectsUrl = `${baseUrl}/projects`;

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



  const fetch = async (path) => {
    const token = Cookies.get("auth_token");
    if (!token) { return false; } // todo: unauth

    const result = await axios(
      { method: 'GET', url: `${baseProjectsUrl}${path}`, headers: { Authorization: `Token ${token}` } }
    );
    return result;
  }

  const post = async (path, data) => {
    const token = Cookies.get("auth_token");
    if (!token) { return false; } // todo: unauth

    const result = await axios(
      {
        method: 'POST', url: `${baseProjectsUrl}${path}`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        data: data
      }
    );
    return result;
  }

  const validateResponse = (response) => {
    if (response["status"] === 200) return response;
    if (response["status"] === 400) return response; // Finish
  }

  const addProject = async (data) => {
    const result = await post("/add_project/", data);
    console.log("addProject", result);
    return result;
  }

  const fetchUserData = async (token) => {
    const result = await fetch('/user/');
    setUser(result.data.user);
  };

  const fetchProjectData = async () => {
    const token = Cookies.get("auth_token");
    if (token) {
      const result = await fetch('/all/');
      setProjects(result.data.projects);
    } else {
      const result = await fetch('/all/public/');
      setProjects(result.data.projects);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.is_authenticated]);

  const login = () => {
    window.location.href = `${baseUrl}/accounts/github/login`;
  }

  const logout = async () => {
    const result = await fetch('/logout/');
    if (result.data['result'] === 'success') {
      Cookies.remove('auth_token', { path: '/' });
      setUser(mockUser);
      fetchProjectData();
    }
  }


  // todo check for status 200 before proceeding
  // todo handle to show error

  //for add project

  return (
    <AppContext.Provider value={{
      user, projects, fetchUserData, fetchProjectData, login, logout, addProject
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
