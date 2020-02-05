import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { User } from "../types";
import "../style/components/Header.css";
import axios from "axios";
import Cookies from 'js-cookie';

type Props = {
  user?: User;
};

type State = {
  is_authenticated: boolean;
}

class Header extends React.Component<Props, State> {
  static contextType = AppContext;

  constructor(props: Props) {
    super(props);
    this.signUserOut = this.signUserOut.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
    this.state = { is_authenticated: !!Cookies.get("auth_token") };

    // this.logout = this.logout.bind(this);
  }

  signUserIn(e: any) {
    window.location.href = "http://127.0.0.1:8000/accounts/github/login";
  }

  async signUserOut(e: any) {
    console.log("xx logging out", this.context.user.auth_token);
    const result = await axios(
      { method: 'get', url: "http://127.0.0.1:8000/projects/logout/", headers: { Authorization: `Token ${this.context.user.auth_token}` } }
    );
    console.log("logout result", result);
    if (result.data['result'] === 'success') {
      Cookies.remove('auth_token', { path: '/' });
      console.log("signUserOut after remove VVVVV cookies", Cookies.get());
      this.context.user = {
        name: "",
        is_authenticated: false,
        csrf_token: "",
        auth_token: "",
      };
      this.setState({ is_authenticated: false });
      console.log("XXXXXX removed auth_token from cookies and reset user", Cookies.get(), this.context.user);

    }
  }

  // logout(e: any) {
  //   this.signUserOut(e).then(() => this.render());
  // }

  componentDidMount() {

    console.log("componentDidMount user.is_authenticated", !!Cookies.get("auth_token"));
    this.setState({ is_authenticated: !!Cookies.get("auth_token") });
    console.log("state is_authenticated", this.state.is_authenticated);
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
            she's collaborating
            </Link>
        </h1>
        <nav>
          <ul>
            <li><NavLink exact to="/" activeClassName="current">Home</NavLink></li>
            <li><NavLink to="/projects" activeClassName="current">Projects</NavLink></li>
          </ul>
        </nav>
        {this.state.is_authenticated ? signedIn : signedOut}
      </header>
    );
  }
}

export default Header;
