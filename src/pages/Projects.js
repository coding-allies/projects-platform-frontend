import React from "react";
import "../style/pages/projects.css";
import ProjectCard from "../components/projectCard";

function Projects() {
  return (
    <div className="projects-main">
      <div className="projects-title">
        <h1>Header here</h1>
      </div>

      <div className="projects-wrapper">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}

export default Projects;
