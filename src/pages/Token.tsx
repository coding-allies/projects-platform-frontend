import * as React from "react";
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

type TokenProps = {
  match?: any
}
export function Token(props: TokenProps) {

  console.log("VVVVV cookies", Cookies.get());
  Cookies.remove('auth_token', { path: '/' });
  console.log("after remove VVVVV cookies", Cookies.get());

  const token = window.location.href.split('/')
  console.log("MY HREF", token[token.length - 1], window.location.href);

  Cookies.set('auth_token', token[token.length - 1],
    {
      expires: 30, path: '/'
    });
  console.log("after resetting VVVVV cookies", Cookies.get());
  return (
    <Redirect to="/projects" />
  )
}
