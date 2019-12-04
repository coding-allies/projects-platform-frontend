import * as React from "react";
import { Project } from "../types";
import "../style/components/projectCard.css";

const getClassName = (tag: string) => {
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

const getTags = (tagList: Array<string>) => {
  return tagList.map(tag => {
    const className = getClassName(tag);
    return (
      <div className={`tag ${className}`}>
        <span>{tag}</span>
      </div>
    );
  });
};

const getContributors = (contributorList: Array<string>) => {
  return contributorList.map(contributor => (
    <div className="card-contributor-icon">{contributor}</div>
  ));
};

type Props = {
  data: Project;
};
const ProjectCard = (props: Props) => {
  const data = { ...props.data };
  return (
    <div className="card-wrapper">
      <header className="card-header">
        <h2>{data.projectName}</h2>
      </header>
      <div className="card-lead">
        <h4>{data.projectLead.name}</h4>
        <p>
          {data.projectLead.experience}, currently:
          {data.projectLead.company}
        </p>
      </div>

      <article className="card-body">
        <p className="card-description">{data.description}</p>
        <div className="card-contributors">
          <p className="card-contributor-label">
            Contributors - {data.contributors.length}
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
