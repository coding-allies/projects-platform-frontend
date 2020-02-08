import * as React from "react";
import "../style/pages/AddProject.css";
import { User } from "../types";
import { AppContext } from "../contexts/AppContext";
import { withRouter, RouteComponentProps } from 'react-router-dom';


type FormState = {
  experienceLevel: string,
  currentLeadPosition: string,
  githubRepo: string,
  lookingFor: string,
  techStack: string
}

class AddProject extends React.Component<RouteComponentProps, FormState> {
  static contextType = AppContext;

  state: FormState = {
    experienceLevel: "0",
    currentLeadPosition: "",
    githubRepo: "",
    lookingFor: "",
    techStack: ""
  }

  csrf = '';

  handleChange = (event: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>)) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    } as Pick<FormState, keyof FormState>)
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const stateDict = { ...this.state };
    const user: User = this.context.user;
    // TODO: tags
    const data = {
      experience_lvl: stateDict.experienceLevel,
      github_url: stateDict.githubRepo,
      looking_for: stateDict.lookingFor,
      position: stateDict.currentLeadPosition,
      csrfmiddlewaretoken: this.csrf
    }
    this.context.addProject(data).then((response) => {
      console.log("response xx", response);
      if (response.data["result"] === "success") {
        this.props.history.push('/projects');
      } else if (response.data["result"] === "error") {
        // TODO: display the message to the users
        console.log("response", response.data["message"]);
      } else {
        console.log("response", response);
      }
    })
      .catch(function (error) {
        console.log(error);
      });


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
        </div>

        <form id="add-project-form" onSubmit={this.handleSubmit}>
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
            name="experienceLevel"
            value={this.state.experienceLevel}
            onChange={this.handleChange}>
            {/* <option value="">Select your experience level</option> */}
            <option value={0}>Learner (0+ years of experience)</option>
            <option value={1}>Beginner (1+ years of experience)</option>
            <option value={2}>Experienced (3+ years of experience)</option>
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
            type="text"
            id="lead-position"
            name="currentLeadPosition"
            onChange={this.handleChange}
            value={this.state.currentLeadPosition}
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
            type="url"
            id="github-repo-input"
            name="githubRepo"
            value={this.state.githubRepo}
            onChange={this.handleChange}
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
            name="lookingFor"
            value={this.state.lookingFor}
            onChange={this.handleChange}
            style={{ "resize": "none" }}
          />

          {/* <label
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
            type="text"
            id="tech-stack"
            name="techStack"
            value={this.state.techStack}
            onChange={this.handleChange}
          /> */}
          <button>
            Add your project
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddProject);
