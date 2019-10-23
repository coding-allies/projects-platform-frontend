import React from "react";
import "../style/Projects.css";
import ProjectCard from "../components/projectCard";

function Projects() {
  return (
    <div className="Projects">
      <header className="Projects-header">
        <h1>Projects that are available for collaboration.</h1>
        <ProjectCard />
        <ProjectCard />
      </header>
    </div>
  );
}

export default Projects;
