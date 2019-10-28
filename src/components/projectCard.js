import React from "react";
import "../style/components/projectCard.css";

const ProjectCard = () => {
  return (
    <div className="project-card">
      <div className="project-header">
        <p>Project Name here</p>
      </div>
      <div>
        <p>Lead: Rey Dekker - She's coding Seattle Chapter Lead</p>
        <p>5 years experience</p>
        <p>Currently: Facebook</p>
      </div>

      <div className="project-body">
        <p className="project-description">This project aims to achieve...</p>
        <div>
          <p>Contributors</p>
        </div>
        <div>
          <p>JS</p>
          <p>ReactsJS</p>
          <p>TypeScript</p>
        </div>
      </div>
      <button>Github Link</button>
      <button>Favorite</button>
      <button>Join</button>
    </div>
  );
};

export default ProjectCard;
