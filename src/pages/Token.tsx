import * as React from "react";
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

type TokenProps = {
  match?: any
}
export function Token(props: TokenProps) {
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
