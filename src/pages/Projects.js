import React, { Component } from "react";
import "../style/pages/projects.css";
import ProjectCard from "../components/projectCard";
import { AppContext } from "../contexts/AppContext";

const renderProjects = projects => {
  return projects.map(data => <ProjectCard key={data.projectId} data={data} />);
};

class Projects extends Component {
  static contextType = AppContext;
  render() {
    const projects = [...this.context.projects];
    return (
      <div className="projects-main">
        <div className="projects-title">
          <h1>Header here</h1>
        </div>
        <div className="projects-wrapper">{renderProjects(projects)}</div>
      </div>
    );
  }
}

export default Projects;
