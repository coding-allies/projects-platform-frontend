import React from "react";
import "../style/components/projectCard.css";

const getTags = tagList => {
  return tagList.map(tag => {
    return (
      <div className={`tag`}>{tag}</div>
    );
  });
};

const getContributors = contributorList => {
  return contributorList.map(contributor => (
    <div className="card-contributor-icon">{contributor}</div>
  ));
};

const ProjectCard = props => {
  const data = { ...props.data };
  return (
    <article className="card-wrapper">
      <h2>{data.projectName}</h2>

    <div className="card-lead">
        <h3><span className="card-lead-label">Project Lead:</span> {data.projectLead.name}</h3>
        <p><span className="card-lead-label">Currently:</span> {data.projectLead.currentPosition}</p>
        <p><span className="card-lead-label">Experience:</span> {data.projectLead.yearsOfExperience} years</p>
      </div>

      <p className="card-description">{data.description}</p>
        <div className="card-contributors">
        <p className="card-contributor-label">
          Contributors: {data.numberOfContributors}
        </p>
        <div className="card-contributor-avatars">
          {getContributors(data.contributors)}
        </div>
      </div>

      <div className="card-tech-stack">
        <p className="card-tech-stack-label">Tech stack: </p>
        <div className="card-tags">{getTags(data.tags)}</div>
      </div>

      <div className="card-buttons">
        <button className="card-button">Github</button>
        <button className="card-button">Favorite</button>
        <button className="card-button">Join</button>
      </div>

    </article>
  );
};

export default ProjectCard;
