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
  if (contributorList.length > 6) {
    contributorList = [...contributorList.slice(0, 6), '...'];
  }

  return contributorList.map((contributor, i) => (
    <div className="card-contributor-icon" key={i}>
      {contributor[0].toUpperCase()}
    </div>
  ));
};

type Props = {
  data: Project;
  loginLink?: any;
};

const renderButtons = (project: Project, loginLink: any) => {
  if (!!project.lead.email) {
    return (
      <div className="card-buttons">
        <a
          href={project.github_url}
          className="button-link"
          target={project.github_url}
          rel="noopener noreferrer"
        >
          View on Github
      </a>
        <a
          href={`mailto:${project.lead.email}?subject=Request to join ${project.name}`}
          className="button-link"
        >
          Request to Join
      </a>
      </div >
    );
  } else {
    return (
      <div className="card-buttons">
        <button
          onClick={loginLink}
          className="button-link"
        >
          View on Github
      </button>
        <button
          onClick={loginLink}
          className="button-link"
        >
          Request to Join
      </button>
      </div >
    );
  }
}

const ProjectCard: FC<Props> = ({ data, loginLink }) => {
  const project = { ...data };
  const experienceLevel = ExperienceLevelsTypes[project.lead.experience];


  return (
    <article className="card-wrapper">
      <h2>{project.name}</h2>

      <div className="card-description">
        <p className="card-description-label">Project Description:</p>
        <p>{project.description}</p>
      </div>

      <div className="card-looking-for">
        <p className="card-looking-for-label">Looking For:</p>
        <p>{project.looking_for}</p>
      </div>

      <div className="card-lead">
        <p className="card-lead-label">Project Lead:</p>
        <p>{project.lead.name}</p>
        <p>{project.lead.position}</p>
        <p>{experienceLevel}</p>
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

      {renderButtons(project, loginLink)}
    </article>
  );
};

export default ProjectCard;
