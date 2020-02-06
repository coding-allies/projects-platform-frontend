import * as React from "react";
import { Component } from "react";
import { AppContext } from "../contexts/AppContext";
import { Project } from "../types";
import PlatformSummary from "../components/PlatformSummary";
import { renderProjects } from "./Projects"
import "../style/pages/Welcome.css";
import "../style/pages/Projects.css";

class Welcome extends Component {
  static contextType = AppContext;
  render() {
    const projects: Array<Project> = this.context.projects;
    return (
      <div className="platform-welcome">
        <PlatformSummary />
        <section className="platform-featured-projects">
          <h2>Featured Projects</h2>
          <div className="projects-wrapper">{renderProjects(projects)}</div>
        </section>
      </div>
    );
  }
}

export default Welcome;
