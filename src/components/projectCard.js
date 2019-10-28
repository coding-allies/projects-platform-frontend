import React from "react";
import "../style/components/projectCard.css";

const ProjectCard = () => {
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <p>Project Name here</p>
      </div>
      <div className="card-lead">
        <p>Lead: Rey Dekker - She's coding Seattle Chapter Lead</p>
        <p>5 years experience</p>
        <p>Currently: Facebook</p>
      </div>

      <div className="card-body">
        <p className="card-description">This project aims to achieve...</p>
        <div className="card-contributors">
          <p>Contributors</p>
        </div>
        <div className="card-tags">
          <p>JS</p>
          <p>ReactsJS</p>
          <p>TypeScript</p>
        </div>
      </div>
      <div className="card-buttons">
        <button>Github Link</button>
        <button>Favorite</button>
        <button>Join</button>
      </div>
    </div>
  );
};

export default ProjectCard;
