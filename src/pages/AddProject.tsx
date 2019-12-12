import * as React from "react";
import { Component } from "react";
import "../style/pages/addProject.css";

class AddProject extends Component {
  // TODO: Add form state
  render() {
    return (
      <div className="add-project-page">
          <h1>Add your project</h1>
          <div className="add-project-info-block">
            <h2>Before we begin</h2>
            <p>Make sure your GitHub profile is in order before submitting your project.</p>
            <p>The following information will be visible:</p>
            <ul>
              <li>Name</li>
              <li>Avatar</li>
              <li>Company</li>
            </ul>
            <button>My profile is up to date</button>
          </div>

          <form id="add-project-form">
            <label
              htmlFor="select-experience-level"
              className="form-input-title">
              Experience Level:
            </label>
            <label
              htmlFor="select-experience-level"
              className="form-input-description">
              Select the description that best matches your experience
              </label>
            {/* TODO: Experience level from types */}
            <select
              id="select-experience-level"
              name="lead-experience-level">
              <option value="">Select your experience level</option>
              <option value="learner">Learner (0+ years of experience)</option>
              <option value="beginner">Beginner (1+ years of experience)</option>
              <option value="experienced">Experienced (3+ years of experience)</option>
            </select>


            <label
              htmlFor="github-repo-input"
              className="form-input-title">
              GitHub Repo:
            </label>
            <label
              htmlFor="github-repo-input"
              className="form-input-description">
              Add a link to the GitHub repository for your project
            </label>
            <input
              id="github-repo-input"
              type="url"
              name="project-github-repo"
            />

            <label
              htmlFor="looking-for"
              className="form-input-title">
              Looking for:
            </label>
            <label
              htmlFor="looking-for"
              className="form-tech-stack">
              Describe what are you looking for in future contributors
            </label>
            {/* TODO: Add fixed values for cols, rows */}
            <textarea
              id="looking-for"
              name="project-looking-for"
              style={{"resize": "none"}}
            />

            <label
              htmlFor="tech-stack"
              className="form-input-title">
              Tech Stack:
            </label>
            <label
              htmlFor="tech-stack"
              className="form-tech-stack">
              Enter the tech stack your project is built with, separated by commas. Max 5.
            </label>
            <input
              type="text"
              name="project-tech-stack"
            />

            <button
              type="submit"
              form="add-project-form">
              Add your project
            </button>
          </form>
      </div>
    );
  }
}

export default AddProject;
