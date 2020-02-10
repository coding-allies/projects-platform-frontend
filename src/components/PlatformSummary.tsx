import * as React from "react";
import "../style/components/PlatformSummary.css";
import Cookies from 'js-cookie';

type ProjectSummaryProps = {
  login: () => void;
}
const PlatformSummary = (props: ProjectSummaryProps) => {
  const getButton = () => {
    const token = Cookies.get("auth_token");
    if (!!token) {
      return (<a className="button-link" href="/#/projects">See All Projects</a>)} 
    else {
      return (<button onClick={props.login}>Sign In With GitHub</button>)
    }

  }
  return (
    <div>
      <section className="platform-intro">
        <h1>Open Source Collaboration for Womxn In Tech</h1>
        <p>
          She's Coding Projects is a place for womxn in tech to share and find open-source projects so they can easily connect and collaborate in a safe environment. Join our community and let's write some awesome code together!
        </p>
        {getButton()}
      </section>
      <section className="platform-features">
        <div className="platform-feature">
          <h3>Find A Project</h3>
          <p>
            Gain experience by contributing to womxn-led open source projects! Learn best practices, get code reviews and mentorship from womxn working in the industry, and build your portfolio.
          </p>
        </div>
        <div className="platform-feature">
          <h3>Share A Project</h3>
          <p>
            Grow your leadership skills by spearheading a project! Guide newcomers to writing excellent code through PR/CR. Be a confident champion for other womxn in tech and help close the gender gap at your workplace and the industry.
          </p>
        </div>
        <div className="platform-feature">
          <h3>Write Software You Love</h3>
          <p>
            Join forces with fellow womxn in tech to create, deliver and maintain projects that solve problems and improve lives! Form teams and support each other in your journeys to fulfulling careers in tech.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PlatformSummary;
