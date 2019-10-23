import React from "react";
import "../style/components/projectCard.css";

const ProjectCard = () => {
  return (
    <div className="project-card">
      <div className="project-header">
        <p>Project Name here</p>
      </div>
      <div className="project-body">
        <p className="project-description">This project aims to achieve...</p>
      </div>
    </div>
  );
};

export default ProjectCard;
