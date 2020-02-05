import React, { FC } from "react";
import { Project, ExperienceLevelsTypes } from "../types";
import "../style/components/ProjectCard.css";

const getTags = (tagList: Array<string>) => {
  return tagList.map(tag => {
    return (
      <div className={`tag`} key={tag}>
        {tag}
      </div>
    );
  });
};

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
  const project = { ...data };
  console.log('project', project);
  const experienceLevel = ExperienceLevelsTypes[project.lead.experience]
  return (
    <article className="card-wrapper">
      <h2>{project.name}</h2>

      <div className="card-lead">
        <h3>Project Lead: {project.lead.name}</h3>
        <p>Currently: {project.lead.position}</p>
        <p>{experienceLevel}</p>
      </div>

      <p className="card-description">{project.description}</p>

      <div className="card-looking-for">
        <p className="card-looking-for-label">Looking For:</p>
        <p>{project.looking_for}</p>
      </div>

      <div className="card-contributors">
        <p className="card-contributor-label">
          Contributors: {project.contributors.length}
        </p>
        <div className="card-contributor-avatars">
          {getContributors(project.contributors)}
        </div>
      </div>

      <div className="card-tech-stack">
        <p className="card-tech-stack-label">Tech stack: </p>
        {/* <div className="card-tags">{getTags(data.tags)}</div> */}
      </div>

      <div className="card-buttons">
        <a
          href={data.github_url}
          className="button-link"
          target={data.github_url}
          rel="noopener noreferrer"
        >
          View on Github
        </a>
        <a
          href={`mailto:${data.lead.email}?subject=Request to join ${project.name}`}
          className="button-link"
        >
          Request to Join
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
