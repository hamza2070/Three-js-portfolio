import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Senior Software Developer with 3+ years of experience architecting and
          delivering production-grade React Native and full-stack SaaS applications.
          Deep expertise in scalable backend architecture, secure JWT/RBAC
          multi-tenant authentication, Stripe payment integrations, Docker, CI/CD
          pipelines, and React Native performance tuning.
        </p>
        <div className="about-stats">
          <div className="stat-card">
            <h4>3+</h4>
            <span>Years Experience</span>
          </div>
          <div className="stat-card">
            <h4>15+</h4>
            <span>Products Shipped</span>
          </div>
          <div className="stat-card">
            <h4>8+</h4>
            <span>Mobile Apps</span>
          </div>
          <div className="stat-card">
            <h4>5+</h4>
            <span>SaaS Platforms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
