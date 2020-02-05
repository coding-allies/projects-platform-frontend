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



  const fetch = async (path, token) => {
    const result = await axios(
      { method: 'GET', url: `${baseProjectsUrl}${path}`, headers: { Authorization: `Token ${token}` } }
    );
    return result;
  }

  const fetchUserData = async (token) => {
    const result = await fetch('/user/', token);
    setUser(result.data.user);
  };

  const fetchProjectData = async (token) => {
    const result = await fetch('/all/', token);
    setProjects(result.data.projects);
  };

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      fetchUserData(token);
    }
  }, [user.is_authenticated]);

  const login = () => {
    window.location.href = `${baseUrl}/accounts/github/login`;
  }

  const logout = async () => {
    const result = await fetch('/logout/', user.auth_token);
    if (result.data['result'] === 'success') {
      Cookies.remove('auth_token', { path: '/' });
      setUser(mockUser);
    }
  }

  return (
    <AppContext.Provider value={{ user, projects, fetchUserData, fetchProjectData, login, logout }}>
      {props.children}
    </AppContext.Provider>
  );
}
