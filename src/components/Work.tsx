import { useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowOutward } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { HiOutlineEyeOff } from "react-icons/hi";

interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  platform: "web" | "mobile";
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

const projects: Project[] = [
  {
    title: "TutorScene",
    category: "Multi-tenant SaaS Tutoring Platform",
    tools: "React.js, NestJS, TypeScript, PostgreSQL, Stripe, Zoom API, JWT, RBAC, Docker, AWS EC2",
    image: "/images/work/tutorscene.png",
    platform: "web",
    liveUrl: "https://tutorscene.com",
  },
  {
    title: "Hulah",
    category: "Dating App",
    tools: "React Native, Redux, REST API, Stripe",
    image: "/images/work/hulah.png",
    platform: "mobile",
    appStoreUrl: "https://apps.apple.com/us/app/hulah-dating-app/id1603277779",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hulah&hl=en",
  },
  {
    title: "Missio",
    category: "Social Media Platform",
    tools: "React Native, TypeScript, Socket.io, AWS S3, Redux",
    image: "/images/work/missio.png",
    platform: "mobile",
    appStoreUrl: "https://apps.apple.com/us/app/missio-live-on-mission/id6444812053",
    playStoreUrl: "https://play.google.com/store/apps/details?id=app.missio&hl=en",
    liveUrl:"https://missio.app/home"
  },
  {
    title: "Rankk.app",
    category: "Music Competition Platform",
    tools: "Node.js, TypeScript, Supabase, Redis, Stripe",
    image: "/images/work/rankk.png",
    platform: "web",
    liveUrl: "https://rankk.app",
  },
  {
    title: "Blind Tools",
    category: "Offline-first Business App",
    tools: "React Native, TypeScript, Realm, Redux Toolkit",
    image: "/images/placeholder.webp",
    platform: "mobile",
  },
  {
    title: "Gymnastrio",
    category: "Gym Management Platform",
    tools: ".NET Core, RESTful API, Multi-tenant Architecture",
    image: "/images/placeholder.webp",
    platform: "web",
    liveUrl: "https://gymnastrio.com",
  },
  {
    title: "TTC Immigration",
    category: "Multi-tenant SaaS",
    tools: "Laravel, PostgreSQL, Multi-tenant SaaS",
    image: "/images/placeholder.webp",
    platform: "web",
  },
];

const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <span className="work-label">Selected Projects</span>
          <h2>
            My <span>Work</span>
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              className={`project-card ${hoveredIndex === index ? "project-card-active" : ""} ${hoveredIndex !== null && hoveredIndex !== index ? "project-card-dim" : ""}`}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor="disable"
            >
              <div className="project-number">0{index + 1}</div>

              {/* Platform Badge */}
              <span className={`project-platform-badge ${project.platform === "web" ? "badge-web" : "badge-mobile"}`}>
                {project.platform === "web" ? (
                  <><IoGlobeOutline className="badge-icon" /> Web</>
                ) : (
                  <><FaApple className="badge-icon" /> Mobile</>
                )}
              </span>

              <div className="project-image-wrapper">
                <WorkImage image={project.image} alt={project.title} />
              </div>
              <div className="project-details">
                <h4>{project.title}</h4>
                <p className="project-category">{project.category}</p>
                <div className="project-tools">
                  {project.tools.split(", ").map((tool, i) => (
                    <span className="project-tool-tag" key={i}>{tool}</span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="project-links">
                  {/* Web Projects — Visit Website */}
                  {project.platform === "web" && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-web"
                      data-cursor="disable"
                    >
                      <IoGlobeOutline className="project-link-icon" />
                      <span>Visit Website</span>
                      <MdArrowOutward className="project-link-arrow" />
                    </a>
                  )}

                  {/* Mobile Projects — App Store & Play Store */}
                  {project.platform === "mobile" && project.appStoreUrl && (
                    <a
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-appstore"
                      data-cursor="disable"
                    >
                      <FaApple className="project-link-icon" />
                      <span>App Store</span>
                      <MdArrowOutward className="project-link-arrow" />
                    </a>
                  )}
                  {project.platform === "mobile" && project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-playstore"
                      data-cursor="disable"
                    >
                      <FaGooglePlay className="project-link-icon project-link-icon-sm" />
                      <span>Play Store</span>
                      <MdArrowOutward className="project-link-arrow" />
                    </a>
                  )}

                  {/* Preview Not Available */}
                  {((project.platform === "web" && !project.liveUrl) ||
                    (project.platform === "mobile" && !project.appStoreUrl && !project.playStoreUrl)) && (
                    <div className="project-link-unavailable">
                      <HiOutlineEyeOff className="unavailable-icon" />
                      <span className="unavailable-text">Live preview currently not available</span>
                      <span className={`unavailable-badge ${project.platform === "web" ? "unavailable-badge-web" : "unavailable-badge-mobile"}`}>
                        {project.platform === "web" ? (
                          <><IoGlobeOutline className="unavailable-badge-icon" /> Web App</>
                        ) : (
                          <><FaApple className="unavailable-badge-icon" /> Mobile App</>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
