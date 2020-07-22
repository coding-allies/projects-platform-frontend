import * as React from "react";
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


export function Token() {
  console.log("FROM TOKEN");
  Cookies.remove('auth_token', { path: '/' });
  const token = window.location.href.split('/')
  Cookies.set('auth_token', token[token.length - 1],
    {
      expires: 30, path: '/'
    });
  return (
    <Redirect to="/projects" />
  )
}
