import * as React from "react";
import { Component } from "react";
import { useCookies } from 'react-cookie';

type TokenProps = {
  match?: any
}
export function Token(props) {
  const [cookies, setCookie] = useCookies(['auth_token']);
  setCookie('auth_token', props.match.params.token, {
    maxAge: 60 * 60 * 24 * 30 // 1 month
  });
  var auth_token = cookies.auth_token;
  console.log("my auth token from cookie", auth_token);
  console.log("my href", window.location.href, props);
  return (
    <div className="projects-main">
      Token is {props.match.params.token}
    </div>
  );
}
