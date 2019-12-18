import * as React from "react";
import { Component } from "react";
import { AppContext } from "../contexts/AppContext";
import { Project } from "../types";
import { renderProjects } from "./Projects"
import "../style/pages/Welcome.css";
import "../style/pages/Projects.css";

class Welcome extends Component {
  static contextType = AppContext;
  render() {
    const projects: Array<Project> = this.context.projects;
    return (
      <div className="platform-welcome">
        <section className="platform-intro">
          <h1>The Title Will Explain The Platform, Briefly</h1>
          <p>
            The intro paragraph will go into a bit more details. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Quisque a mattis purus, vel
            cursus justo. Ut nec pretium ex. Nullam ac ultricies orci. Nulla
            facilisi.
          </p>
          <button>Sign In With GitHub</button>
        </section>
        <section className="platform-features">
          <div className="platform-feature">
            <h3>Title Explains Feature</h3>
            <p>
              The feature summary paragraph will go into a bit more details. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Quisque a mattis
              purus, vel cursus justo. Ut nec pretium ex.
            </p>
          </div>
          <div className="platform-feature">
            <h3>Title Explains Feature</h3>
            <p>
              The feature summary paragraph will go into a bit more details. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Quisque a mattis
              purus, vel cursus justo. Ut nec pretium ex.
            </p>
          </div>
          <div className="platform-feature">
            <h3>Title Explains Feature</h3>
            <p>
              The feature summary paragraph will go into a bit more details. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Quisque a mattis
              purus, vel cursus justo. Ut nec pretium ex.
            </p>
          </div>
        </section>
        <section className="platform-featured-projects">
          <h2>Featured Projects</h2>
          <div className="projects-wrapper">{renderProjects(projects)}</div>
        </section>
        <footer>Brought to you by She's Coding</footer>
      </div>


    );
  }
}

export default Welcome;
