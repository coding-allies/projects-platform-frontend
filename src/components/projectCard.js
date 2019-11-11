import React from "react";
import "../style/components/projectCard.css";

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

const getTags = tagList => {
  return tagList.map(tag => {
    const className = getClassName(tag);
    return (
      <div className={`tag ${className}`}>
        <span>{tag}</span>
      </div>
    );
  });
};

const getContributors = contributorList => {
  return contributorList.map(contributor => (
    <div className="card-contributor-icon">{contributor}</div>
  ));
};

const ProjectCard = props => {
  console.log("props", props.data);
  const data = { ...props.data };
  return (
    <div className="card-wrapper">
      <header className="card-header">
        <h2>{data.projectName}</h2>
      </header>
      <div className="card-lead">
        <h4>{data.projectLead.name}</h4>
        <p>
          {data.projectLead.yearsOfExperience} years experience, currently:
          {data.projectLead.currentPosition}
        </p>
      </div>

      <article className="card-body">
        <p className="card-description">{data.description}</p>
        <div className="card-contributors">
          <p className="card-contributor-label">
            Contributors - {data.numberOfContributors}
          </p>
          {getContributors(data.contributors)}
        </div>
        <div className="card-tags">{getTags(data.tags)}</div>
      </article>
      <footer className="card-buttons">
        <button className="card-button">Github</button>
        <button className="card-button">Favorite</button>
        <button className="card-button">Join</button>
      </footer>
    </div>
  );
};

export default ProjectCard;
