import * as React from "react";
import { Component } from "react";
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

type TokenProps = {
  match?: any
}
export function Token(props) {
  const [cookies, setCookie] = useCookies(['auth_token']);
  setCookie('auth_token', props.match.params.token, {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: '/'
  });
  var auth_token = cookies.auth_token;

  return (
    <Redirect to="/projects" />
  );
}
