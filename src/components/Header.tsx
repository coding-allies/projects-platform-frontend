import * as React from "react";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { User } from "../types";
import "../style/components/Header.css";

type Props = {
  user?: User;
};

type State = {
  user: User | null;
};

class Header extends React.Component<Props, State> {
  static contextType = AppContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      user: null
    };
    this.signUserOut = this.signUserOut.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
  }

  signUserIn(e: any) {
    this.setState(state => ({
      user: this.context.user.name
    }));
  }

  signUserOut(e: any) {
    this.setState(state => ({
      user: null
    }));
  }

  render() {
    const signedOut = (
      <div className="auth">
        <button onClick={this.signUserIn}>Sign in with GitHub</button>
      </div>
    );

    const signedIn = (
      <div className="auth">
        <p>Hello, {this.state.user}!</p>
        <Link to="add-project" className="button-link">Add Project</Link>
        <button onClick={this.signUserOut}>Log Out</button>
      </div>
    );

    return (
      <Router>
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
          {this.state.user ? signedIn : signedOut}
        </header>
      </Router>
    );
  }
}

export default Header;
