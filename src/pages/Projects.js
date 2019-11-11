import React from "react";
import "../style/pages/projects.css";
import ProjectCard from "../components/projectCard";

const projects = [
  {
    projectName: "Project Name here",
    projectId: 18237,
    projectLead: {
      name: "Rey Dekker",
      yearsOfExperience: 5,
      currentPosition: "Facebook"
    },
    description:
      "This project aims to achieve...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    numberOfContributors: 3,
    contributors: ["NS", "MM", "NN", "IJ", "FR", "HJ", "WS"],
    tags: [
      "JS",
      "ReactJS",
      "Typescript",
      "TypescriptTypescript",
      "CSS",
      "Objective C"
    ]
  },
  {
    projectName: "Project 2 here",
    projectId: 34534,
    projectLead: {
      name: "Jane Doe",
      yearsOfExperience: 1,
      currentPosition: "ABC Comp"
    },
    description:
      "Some short description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfContributors: 1,
    contributors: ["JD"],
    tags: ["JS", "ReactJS"]
  }
];

const renderProjects = () => {
  return projects.map(data => <ProjectCard key={data.projectId} data={data} />);
};
function Projects() {
  return (
    <div className="projects-main">
      <div className="projects-title">
        <h1>Header here</h1>
      </div>

      <div className="projects-wrapper">{renderProjects()}</div>
    </div>
  );
}

export default Projects;
