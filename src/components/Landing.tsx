import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-hero">
            <div className="landing-badge">Senior Software Developer</div>
            <h1 className="landing-name">
              <span className="landing-last">HAMZA</span>
              <span className="landing-last">GILLANI</span>
            </h1>
            <p className="landing-tagline">
              React Native Specialist · Full-Stack Engineer
            </p>
            <div className="landing-scroll-hint">
              <div className="scroll-line"></div>
              <span>Scroll</span>
            </div>
          </div>
          <div className="landing-info">
            <h3>A Senior Software</h3>
            <h2 className="landing-info-h2">Developer</h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
