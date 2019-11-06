import React from "react";
import "../style/components/projectCard.css";

const tags = [
  "JS",
  "ReactJS",
  "Typescript",
  "TypescriptTypescript",
  "CSS",
  "Objective C"
];

const getClassName = tag => {
  switch (true) {
    case tag.length < 6:
      return "small";
    case tag.length >= 6 && tag.length <= 19:
      return "medium";
    case tag.length > 19:
      return "large";
    default:
      return "small";
  }
};

const getTags = () => {
  return tags.map(tag => {
    const className = getClassName(tag);
    return (
      <div className={`tag ${className}`}>
        <span>{tag}</span>
      </div>
    );
  });
};

const ProjectCard = () => {
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <p>Project Name here</p>
      </div>
      <div className="card-lead">
        <p>Lead: Rey Dekker - She's coding Seattle Chapter Lead</p>
        <p>5 years experience, currently: Facebook</p>
      </div>

      <div className="card-body">
        <p className="card-description">
          This project aims to achieve...Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="card-contributors">
          <p>Contributors</p>
        </div>
        <div className="card-tags">{getTags()}</div>
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
