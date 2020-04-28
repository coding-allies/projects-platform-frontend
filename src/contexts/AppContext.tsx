import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { User, Project } from "../types";
import axios from "axios";
import Cookies from 'js-cookie';

export const AppContext = createContext({});
const baseUrl = "https://api.shescoding.org";
// const baseUrl = "http://127.0.0.1:8000";

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

  const getToken = () => {
    const token = Cookies.get("auth_token");
    if (!!token) { return token; }
    cleanUp();
  }

  const validateResponse = (response) => {
    if (response["status"] === 200) return response;
    if (response["status"] === 401) { // Not authenticated user
      cleanUp();
    };
  }

  const fetch = async (path) => {
    console.log("She's Coding Projects API", baseUrl);
    const token = getToken();

    const result = await axios(
      { method: 'GET', url: `${baseProjectsUrl}${path}`, headers: { Authorization: `Token ${token}` } }
    );
    return validateResponse(result);
  }

  const fetchPublic = async (path) => {
    const result = await axios(
      { method: 'GET', url: `${baseProjectsUrl}${path}` }
    );
    return validateResponse(result);
  }

  const post = async (path, data) => {
    const token = getToken();
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
    return validateResponse(result);
  }

  const addProject = async (data) => {
    const result = await post("/add_project/", data);
    return result;
  }

  const fetchUserData = async () => {
    const result = await fetch('/user/');
    setUser(result.data.user);
  };

  const fetchProjectData = async () => {
    const token = Cookies.get("auth_token");
    if (token) {
      const result = await fetch('/all/');
      setProjects(result.data.projects);
    } else {
      const result = await fetchPublic('/all/public/');
      setProjects(result.data.projects);
    }
  };

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = () => {
    window.location.href = `${baseUrl}/accounts/github/login`;
  }

  const cleanUp = () => {
    Cookies.remove('auth_token', { path: '/' });
    setUser(mockUser);
    fetchProjectData();
  }

  const logout = async () => {
    const result = await fetch('/logout/');
    if (result.data['result'] === 'success') {
      cleanUp();
    }
  }

  return (
    <AppContext.Provider value={{
      user, projects, fetchProjectData, login, logout, addProject
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
