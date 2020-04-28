import React, { FC, useState } from "react";
import { Project, ExperienceLevelsTypes, Avatar } from "../types";
import "../style/components/ProjectCard.css";
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('*');


const getTags = (tagList: Array<string>) => {
  return tagList.map(tag => {
    return (
      <div className={`tag`} key={tag}>
        {tag}
      </div>
    );
  });
};


// const getContributors = (contributorList: Array<string>, modalState: Boolean) => {
//   if (contributorList.length > 6) {
//     contributorList = [...contributorList.slice(0, 6), '...'];
//   }

//   return contributorList.map((contributor, i) => {
//     if(i === 6){
//       return(
//         <div key={i}>
//           <button onClick={() => {modalState = !modalState; console.log(modalState)}}>
//             {contributor}
//           </button>
//           {/* <div>
//           {modalOpen ? <Modal isOpen={true} className="contributor-modal" >
//             <p>This is modal for contrubutor list</p> 
//           </Modal> : null}
//           </div> */}
//         </div>
//       );
//     } else{
//       return(
//         <div className="card-contributor-icon" key={i}>
//           {contributor}
//         </div>
//       );
//     }
//   });
// };

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatarLinks = [];

  const getAvatars = () => {
    axios.get('https://api.github.com/repos/shescoding/projects-platform-frontend/contributors')
      .then((result: any) => {
        let users =  result.data;
        let avatars: Array<string> = [];
        users.map((user: Avatar) => {
          avatars.push(user.avatar_url)
        })
        return avatars;
      })
      .catch(err => console.log(err));
  }

  const getContributors = (contributorList: Array<string>) => {
    if (contributorList.length > 6) {
      contributorList = [...contributorList.slice(0, 6), '...'];
    }
  
    return contributorList.map((contributor, i) => {
      
      if(i === 6){
        return(
          <div key={i}>
            <button className="card-contributor-modal-button" onClick={() => {setIsModalOpen(!isModalOpen);}}>
              {contributor}
            </button>
          </div>
        );
      } else{
        return(
          <div className="card-contributor-icon" key={i}>
            {contributor}
          </div>
        );
      }
    });
  };


  return (
    <article className="card-wrapper">
      <h2>{project.name}</h2>

      <div className="card-lead">
        <h3>Project Lead: {project.lead.name}</h3>
        <p>{project.lead.position}</p>
        <p>{experienceLevel}</p>
      </div>

      <div className="card-description-box">
        <p className="card-description-label">Project Details:</p>
        <p className="card-description">{project.description}</p>
      </div>

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
          {isModalOpen ? 
          <Modal isOpen={isModalOpen} className="contributor-modal" >
            <div className="contributor-modal-header">
              <h2>Contributors of the project:</h2>
              <div className="contributor-modal-close-button" onClick={() => {setIsModalOpen(!isModalOpen)}}>
                X
              </div> 
            </div> 
            {project.contributors.map((contributor, i) => {
              return(
                <div className="contributor-modal-item">
                  <p key={i}>{contributor}</p>
                </div>
              );
            })}
          </Modal> : null}
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
