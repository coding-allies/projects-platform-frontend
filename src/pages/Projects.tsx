import * as React from "react";
import { Component } from "react";
import ProjectCard from "../components/ProjectCard";
import { AppContext } from "../contexts/AppContext";
import { Project } from "../types";
import "../style/pages/Projects.css";


const renderProjects = (projects: Array<Project>, loginLink: any) => {
  if (projects) {
    return projects.map(data => <ProjectCard key={data.id} data={data} loginLink={loginLink} />);
  }
  return null;
};
class Projects extends Component {
  static contextType = AppContext;



  componentDidMount() {
    this.context.fetchProjectData();
  }
  render() {
    const projects: Array<Project> = this.context.projects;
    return (
      <div className="projects-main">
        <div className="projects-title">
          <h1>Explore projects</h1>
        </div>
        <div className="projects-wrapper">{renderProjects(projects, this.context.login)}</div>
      </div>
    );
  }
}

export { renderProjects, Projects };
