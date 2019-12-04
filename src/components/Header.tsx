import * as React from "react";
const css = require("../style/components/Header.css");
import { AppContext } from "../contexts/AppContext";
import { User } from "../types";

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
        <p>Hello, {this.state.user}</p>
        <button onClick={this.signUserOut}>Log Out</button>
      </div>
    );

    return (
      <header>
        <h1>she's collaborating</h1>
        {this.state.user ? signedIn : signedOut}
      </header>
    );
  }
}

export default Header;
