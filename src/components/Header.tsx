import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import "../style/components/Header.css";

class Header extends React.Component<{}, {}> {
  static contextType = AppContext;

  constructor(props: any) {
    super(props);
    this.signUserOut = this.signUserOut.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
  }

  signUserIn(e: any) {
    this.context.login();
  }

  async signUserOut(e: any) {
    this.context.logout();
  }

  render() {
    const user = this.context.user;
    console.log("XXXXXX removed auth_token from cookies and reset user", user);
    const signedOut = (
      <div className="auth">
        <button onClick={this.signUserIn}>Sign in with GitHub</button>
      </div>
    );

    const signedIn = (
      <div className="auth">
        <p>Hello, {user.name}!</p>
        <Link to="/add-project" className="button-link">Add Project</Link>
        <button onClick={this.signUserOut}>Log Out</button>
      </div>
    );

    return (
      <header>
        <h1 className="logo">
          <Link to="/projects">
            she's collaborating
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
