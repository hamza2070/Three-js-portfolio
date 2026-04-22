import "./styles/style.css";
import { useState } from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiLaravel, 
  SiDotnet, 
  SiSupabase, 
  SiFirebase, 
  SiRedux, 
  SiMysql, 
  SiPostgresql, 
  SiPhp, 
  SiJavascript, 
  SiTypescript,
  SiKotlin
} from "react-icons/si";
import { TbApi, TbBrandCSharp, TbDatabase, TbChevronDown } from "react-icons/tb";

const skills = [
  { 
    name: "React Native", 
    color: "#61DAFB",
    icon: SiReact
  },
  { 
    name: "React JS", 
    color: "#61DAFB",
    icon: SiReact
  },
  { 
    name: "Next JS", 
    color: "#FFFFFF",
    icon: SiNextdotjs
  },
  { 
    name: "Laravel", 
    color: "#FF2D20",
    icon: SiLaravel
  },
  { 
    name: ".NET Core", 
    color: "#512BD4",
    icon: SiDotnet
  },
  { 
    name: "Redux", 
    color: "#764ABC",
    icon: SiRedux
  },
  { 
    name: "Supabase", 
    color: "#3ECF8E",
    icon: SiSupabase
  },
  { 
    name: "Firebase", 
    color: "#FFCA28",
    icon: SiFirebase
  },
  { 
    name: "MySQL", 
    color: "#4479A1",
    icon: SiMysql
  },
  { 
    name: "PostgreSQL", 
    color: "#336791",
    icon: SiPostgresql
  },
  { 
    name: "Realm", 
    color: "#39477F",
    icon: TbDatabase
  },
  { 
    name: "PHP", 
    color: "#777BB4",
    icon: SiPhp
  },
  { 
    name: "C#", 
    color: "#239120",
    icon: TbBrandCSharp
  },
  { 
    name: "JavaScript", 
    color: "#F7DF1E",
    icon: SiJavascript
  },
  { 
    name: "TypeScript", 
    color: "#3178C6",
    icon: SiTypescript
  },
  { 
    name: "REST API", 
    color: "#009688",
    icon: TbApi
  },
  { 
    name: "Kotlin", 
    color: "#7F52FF",
    icon: SiKotlin
  },
];

const TechStack = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleSkills = expanded ? skills : skills.slice(0, 8);

  return (
    <div className="techstack">
      <h2>Tech Stack</h2>
      <div className={`tech-grid ${expanded ? 'expanded' : ''}`}>
        {visibleSkills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <div key={index} className="tech-item">
              <div className="tech-icon" style={{ color: skill.color }}>
                <IconComponent />
              </div>
              <span>{skill.name}</span>
            </div>
          );
        })}
      </div>
      {!expanded && (
        <button 
          className="view-more-btn" 
          onClick={() => setExpanded(true)}
        >
          <span>View Full Expertise</span>
          <TbChevronDown className="chevron-icon" />
        </button>
      )}
    </div>
  );
};

export default TechStack;
