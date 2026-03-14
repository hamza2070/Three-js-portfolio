import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>TechStep · Sahiwal, Pakistan</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Built responsive, cross-browser web applications using HTML5, CSS3,
              and Sass across 3 training projects. Gained foundational proficiency
              in full-stack workflows and version control with Git.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Software Developer</h4>
                <h5>BoltechSolutions · Lahore, Pakistan</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Developed responsive React.js front-end interfaces from Figma designs.
              Built and maintained RESTful Laravel APIs handling 100,000+ daily requests.
              Contributed across 5+ concurrent projects within full Agile sprint cycles.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Developer</h4>
                <h5>BoltechSolutions · Lahore, Pakistan</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Led architecture and full-cycle delivery of 5+ enterprise multi-tenant
              SaaS platforms using Docker and GitHub Actions CI/CD. Engineered and
              shipped 8+ production React Native apps achieving consistent 60fps
              cross-platform performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
