import React from "react";
import "../style/components/Header.css";
import { AppContext } from "../contexts/AppContext";

class Header extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
    this.signUserOut = this.signUserOut.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
  }

  signUserIn(e) {
    this.setState(state => ({
      user: this.context.user.name
    }));
  }

  signUserOut(e) {
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
        <p>Hello, {this.state.user}</p>
        <button onClick={this.signUserOut}>Log Out</button>
      </div>
    );

    return (
      <header>
        <h1 className="logo">she's collaborating</h1>
        {this.state.user ? signedIn : signedOut}
      </header>
    );
  }
}

export default Header;
