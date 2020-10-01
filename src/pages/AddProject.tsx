import * as React from "react";
import "../style/pages/AddProject.css";
import classNames from "classnames/bind"
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const validGitHubRepo = /^(?:https:\/\/)*github[.]com\/([a-z0-9-]+)\/([a-z0-9\-_]+)\/?$/;

type FormState = {
  experienceLevel: string,
  currentLeadPosition: string,
  githubRepo: string,
  lookingFor: string,
  // techStack: string,
  errors: {
    experienceLevel: string,
    currentLeadPosition: string,
    githubRepo: string,
    lookingFor: string,
    // techStack: string,
  },
  serverError: {
    message: string
  },
  cancelModalOpen: boolean
}

const validateForm = (state) => {
  let noErrors = true;
  let hasInput = false;

  let inputFields = Object.values(state).filter(
    (value: any) => value.length === 0);

  hasInput = (inputFields.length === 0) ? true : false;

  Object.values(state.errors).forEach(
    (value: any) => value.length > 0 && (noErrors = false)
  );

  return hasInput && noErrors;
}

class AddProject extends React.Component<RouteComponentProps, FormState> {
  static contextType = AppContext;

  state: FormState = {
    experienceLevel: "",
    currentLeadPosition: "",
    githubRepo: "",
    lookingFor: "",
    // techStack: "",
    errors: {
      experienceLevel: "",
      currentLeadPosition: "",
      githubRepo: "",
      lookingFor: "",
      // techStack: "",
    },
    serverError: {
      message: ""
    },
    cancelModalOpen: false
  }

  csrf = '';

  isPublicGithubRepo = (githubUrl) => {
    const gitURLSplit = githubUrl.split("github.com/");
    const gitAPIURL = "https://api.github.com/repos/" + gitURLSplit[gitURLSplit.length - 1];
    axios.get(gitAPIURL)
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error));
    return true;
  }

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    const errors = this.state.errors;

    switch (name) {
      case 'experienceLevel':
        errors.experienceLevel =
          value.length === 0 ? "Experience level is required" : "";
        break;

      case 'currentLeadPosition':
        errors.currentLeadPosition =
          value.length === 0 ? "Current position is required" : "";
        break;

      case 'githubRepo':
        if (value.length === 0) {
          errors.githubRepo = "A GitHub repository is required"
        }
        if (!validGitHubRepo.test(value)) {
          errors.githubRepo = "Please enter a valid GitHub repository";
        } else {
          errors.githubRepo = "";
          if (!this.isPublicGithubRepo(value)) {
            errors.githubRepo = "This GitHub repository could not be found";
            // if (!this.isNotListed(value)) {
            //   errors.githubRepo = "This repository is already listed under another lead";
            // }
          }
        }
        break;

      case 'lookingFor':
        errors.lookingFor =
          value.length === 0 ? "Field cannot be empty" : "";
        break;

      // case 'techStack':
      //   errors.techStack =
      //     value.length === 0 ? "Tech stack cannot be empty" : "";
      //   break;

      default:
        break;

    }

    this.setState({
      [name]: value,
      errors
    } as Pick<FormState, keyof FormState>)
  }

  showErrors = () => {
    let currErrors = this.state.errors;
    if (!!!this.state.experienceLevel) {
      currErrors.experienceLevel = "Experience level is required";
    }

    if (!!!this.state.currentLeadPosition) {
      currErrors.currentLeadPosition = "Current position is required";
    }

    if (!!!this.state.githubRepo) {
      currErrors.githubRepo = "A GitHub repository is required";
    }

    if (!!!this.state.githubRepo) {
      currErrors.githubRepo = "A GitHub repository is required";
    }

    if (!!!this.state.lookingFor) {
      currErrors.lookingFor = "Field cannot be empty"
    }

    // if (!!!this.state.techStack) {
    //   currErrors.techStack = "Tech stack cannot be empty"
    // }

    this.setState({ errors: currErrors });
  }

  handleSubmit = (event: any) => {
    // let that = this;
    event.preventDefault();
    if (validateForm(this.state)) {

      console.log("Valid form");

      const stateDict = { ...this.state };
      // TODO: tags
      const data = {
        experience_lvl: stateDict.experienceLevel,
        github_url: stateDict.githubRepo,
        looking_for: stateDict.lookingFor,
        position: stateDict.currentLeadPosition,
        csrfmiddlewaretoken: this.csrf
      }
      this.context.addProject(data).then((response) => {
        if (response.data["result"] === "success") {
          this.props.history.push('/projects');
        } else if (response.data["result"] === "error") {
          let currServerError = this.state.serverError;
          currServerError.message = response.data["message"];
          this.setState({ serverError: currServerError });
        } else {
          console.log("response", response);
        }
      })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("Invalid form");
      this.showErrors();
    }

  }

  handleCancel = () => {
    this.setState({ cancelModalOpen: true });
  }

  closeCancelModel = () => {
    this.setState({ cancelModalOpen: false });
  }

  cancelAddingProject = () => {
    this.setState({ cancelModalOpen: false });
    this.props.history.push('/projects');
  }

  render() {
    const token = Cookies.get("auth_token");
    if (!!!token) {
      this.props.history.push('/');
    }
    const { errors } = this.state;
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

        {(this.state.serverError.message) && <div className="error-message">
          <p>{this.state.serverError.message}</p>
          <p>If this problem persists, contact us!</p>
        </div>}
        <form id="add-project-form" onSubmit={this.handleSubmit} noValidate>
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
          <select
            id="select-experience-level"
            name="experienceLevel"
            value={this.state.experienceLevel}
            onChange={this.handleChange}
            onBlur={this.handleChange}
            className={classNames({ "field-error": errors.experienceLevel.length > 0 })}>
            <option value="">Select your experience level</option>
            <option value="0">Learner (0+ years of experience)</option>
            <option value="1">Beginner (1+ years of experience)</option>
            <option value="2">Experienced (3+ years of experience)</option>
          </select>
          {errors.experienceLevel.length > 0 && <span className="error">{errors.experienceLevel}</span>}

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
            onBlur={this.handleChange}
            value={this.state.currentLeadPosition}
            className={classNames({ "field-error": errors.currentLeadPosition.length > 0 })}
          />
          {errors.currentLeadPosition.length > 0 && <span className="error">{errors.currentLeadPosition}</span>}

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
            onBlur={this.handleChange}
            className={classNames({ "field-error": errors.githubRepo.length > 0 })}
          />
          {errors.githubRepo.length > 0 && <span className="error">{errors.githubRepo}</span>}

          <label
            htmlFor="looking-for"
            className="form-input-title">
            Looking for:
          </label>
          <label
            htmlFor="looking-for"
            className="form-input-description">
            Select or enter what type of contributors you're looking for
          </label>
          {/* TODO: Add fixed values for cols, rows */}
          <textarea
            id="looking-for"
            name="lookingFor"
            value={this.state.lookingFor}
            onChange={this.handleChange}
            onBlur={this.handleChange}
            style={{ "resize": "none" }}
            className={classNames({ "field-error": errors.lookingFor.length > 0 })}
          />
          {errors.lookingFor.length > 0 && <span className="error">{errors.lookingFor}</span>}

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
            onBlur={this.handleChange}
            className={classNames({ "field-error": errors.techStack.length > 0 })}
          />
          {errors.techStack.length > 0 && <span className="error">{errors.techStack}</span>}
          */}

          {/* this is the modal for cancel */}
          { this.state.cancelModalOpen ? 
            <Modal isOpen={this.state.cancelModalOpen} 
              className="modal-container"
              closeTimeoutMS={200}>
              <div className="modal-text">
                <h3 >Are you sure you want to cancel adding a new project?</h3>
              </div>
              <div className="modal-buttons">
                <button onClick={this.cancelAddingProject} className="modal-button">Yes, I am sure</button>
                <button onClick={this.closeCancelModel} className="modal-button">Cancel</button>
              </div>
              
            </Modal> 
            : null }
          <div className="add-project-form-buttons">
            <button type="submit" className="add-project-form-button">
              Add your project
            </button>
            <button type="button" onClick={this.handleCancel} className="add-project-form-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddProject);
