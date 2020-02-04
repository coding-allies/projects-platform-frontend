import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { User } from "../types";
import logo from "../scp-logo.svg";
import "../style/components/Header.css";
import axios from "axios";

type Props = {
  user?: User;
};


class Header extends React.Component<Props> {
  static contextType = AppContext;

  constructor(props: Props) {
    super(props);
    this.signUserOut = this.signUserOut.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
  }

  signUserIn(e: any) {
    window.location.href = "http://127.0.0.1:8000/accounts/github/login";
  }

  async signUserOut(e: any) {
    const result = await axios(
      "http://127.0.0.1:8000/projects/logout/",
    );
    console.log("logout result", result);
    this.context.fetchData();
  }

  render() {
    const user = this.context.user;
    const signedOut = (
      <div className="auth">
        <button onClick={this.signUserIn}>Sign in with GitHub</button>
      </div>
    );

    const signedIn = (
      <div className="auth">
        <p>Hello, {user.name}!</p>
        <Link to="add-project" className="button-link">Add Project</Link>
        <button onClick={this.signUserOut}>Log Out</button>
      </div>
    );

    return (
      <header>
        <h1 className="logo">
          <Link to="/projects">
              <img src={logo} alt="She's Coding Projects"/>
            </Link>
        </h1>
        <nav>
          <ul>
            <li><NavLink exact to="/" activeClassName="current">Home</NavLink></li>
            <li><NavLink to="/projects" activeClassName="current">Projects</NavLink></li>
          </ul>
        </nav>
        {user.is_authenticated ? signedIn : signedOut}
      </header>
    );
  }
}

export default Header;
