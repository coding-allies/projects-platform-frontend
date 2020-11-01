import React, { FC, useState } from "react";
import { Project, ExperienceLevelsTypes } from "../types";
import "../style/components/ProjectCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const getTags = (tagList: Array<string>) => {
  if (tagList.length > 5) {
    tagList = [...tagList.slice(0, 5)];
  }
  return tagList.map((tag) => {
    return (
      <div className={`tag`} key={tag}>
        {tag}
      </div>
    );
  });
};

const getContributors = (contributorList: Array<string>, isContributorsExpanded: Boolean) => {
  if (contributorList.length > 6 && !isContributorsExpanded) {
    contributorList = [...contributorList.slice(0, 6)];
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
  let isAuth: boolean = !!project.lead.email;

  return (
    <div className="card-buttons">
      <div className="card-buttons-row">
        <button
          onClick={isAuth ? () => window.open(project.github_url, '_blank') : loginLink}
          className="button-link"
        >
          View on Github
        </button>
        <button
            onClick={isAuth ? () => window.open(`${project.github_url}/issues`, '_blank') : loginLink }
            className="button-link"
          >
            Current Issues
        </button>
      </div>
      <button
        onClick={isAuth ? () => window.open(`mailto:${project.lead.email}?subject=Request to join ${project.name}`, '_blank'): loginLink}
        className="button-link"
      >
        Request to Join
    </button>
    </div >
  );
}

// Not sure what type the method handleContributorsClick should be classified as for TypeScript
const renderContributorExpansionIcons = (isContributorsExpanded: boolean, contributorsLength: Number, handleContributorsClick: any) => {

  if (contributorsLength > 6 && !isContributorsExpanded) {
    return <div onClick={handleContributorsClick} className="card-contributor-icon-expand">
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  } else if (contributorsLength > 6 && isContributorsExpanded) {
    return <div onClick={handleContributorsClick} className="card-contributor-icon-expand">
      <FontAwesomeIcon icon={faCaretUp} />
    </div>
  } else {
    return null
  }

}

const ProjectCard: FC<Props> = ({ data, loginLink }) => {

  const [isContributorsExpanded, setIsContributorsExpanded] = useState(false)
  const project = { ...data };
  const experienceLevel = ExperienceLevelsTypes[project.lead.experience];

  const handleContributorsClick = (e) => {
    e.preventDefault();
    setIsContributorsExpanded(!isContributorsExpanded)
  } 

  return (
    <article className="card-wrapper">
      <h2>{project.name}</h2>

      <div className="card-description">
        <p className="card-description-label">Project Description:</p>
        <p>{project.description}</p>
      </div>

      <p className="card-description">{project.description}</p>

      <div className="card-tech-stack">
        <p className="card-tech-stack-label">Tech stack: </p>
        <div className="card-tags">{getTags(project.tags)}</div>
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
          {getContributors(project.contributors, isContributorsExpanded)}
          {renderContributorExpansionIcons(isContributorsExpanded, project.contributors.length, handleContributorsClick)}
        </div>
      </div>

      {renderButtons(project, loginLink)}
    </article>
  );
};

export default ProjectCard;
