import React, { FC } from "react";
import { Project, ExperienceLevelsTypes } from "../types";
import "../style/components/ProjectCard.css";

const getContributors = (contributorList: Array<string>) => {
  return contributorList.map(contributor => (
    <div className="card-contributor-icon" key={contributor}>
      {contributor}
    </div>
  ));
};

type Props = {
  data: Project;
};

const ProjectCard: FC<Props> = ({ data }) => {
  const experienceLevel = ExperienceLevelsTypes[data.lead.experience]
  return (
    <article className="card-wrapper">
      <h2>{data.name}</h2>

      <div className="card-lead">
        <h3>Project Lead: {data.lead.name}</h3>
        <p>Currently: {data.lead.position}</p>
        <p>{experienceLevel}</p>
      </div>

      <p className="card-description">{data.description}</p>

      <div className="card-looking-for">
        <p className="card-looking-for-label">Looking For:</p>
        <p>{data.looking_for}</p>
      </div>

      <div className="card-contributors">
        <p className="card-contributor-label">
          Contributors: {data.contributors.length}
        </p>
        <div className="card-contributor-avatars">
          {getContributors(data.contributors)}
        </div>
      </div>

      <div className="card-tech-stack">
        <p className="card-tech-stack-label">Tech stack: </p>
      </div>

      <div className="card-buttons">
        <a 
          href={data.githubUrl} 
          className="button-link" 
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Github
        </a>
        <a 
          href={"mailto:" + data.email} 
          className="button-link" 
        >
          Request to Join
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
