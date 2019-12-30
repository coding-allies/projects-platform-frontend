import * as React from "react";
import { Component } from "react";
import { Redirect } from 'react-router-dom';
import "../style/pages/AddProject.css";

class AddProject extends Component {
  // TODO: Add form state

  // TODO: Redirect to projects page on submit (w/ history?)
  redirect = (e) => {
    e.preventDefault();
    console.log("it works");
    return (
      <Redirect to="/projects"/>
    );
  }

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
              <li>Project description</li>
            </ul>
            <button>Dismiss</button>
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
              htmlFor="lead-position"
              className="form-input-title">
              Current Position:
            </label>
            <label
              htmlFor="lead-position"
              className="form-input-description">
              Enter your current position (i.e. "Engineer at Facebook", "Bootcamp Grad from Galvanize")
            </label>
            <input
              id="lead-position"
              type="text"
              name="lead-current-position"
            />

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
              className="form-input-description">
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
              className="form-input-description">
              Enter the tech stack your project is built with, separated by commas. Max 5.
            </label>
            <input
              id = "tech-stack"
              type="text"
              name="project-tech-stack"
            />

            {/* TODO: Re-implement w/ history */}
            <button
              type="submit"
              form="add-project-form"
              onClick={this.redirect}>
              Add your project
            </button>
          </form>
      </div>
    );
  }
}

export default AddProject;
