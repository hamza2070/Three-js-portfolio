import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-icon">📱</div>
            <div className="what-content-in">
              <h3>FRONTEND & MOBILE</h3>
              <h4>Interactive UIs & Cross-Platform Apps</h4>
              <p>
                Crafting performant, responsive interfaces and mobile-first applications.
                From React Native apps to full-stack SaaS frontends, delivering
                pixel-perfect, cross-platform experiences at 60fps.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React Native</div>
                <div className="what-tags">React.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">Redux Toolkit</div>
                <div className="what-tags">Expo</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">HTML5</div>
                <div className="what-tags">CSS3</div>
                <div className="what-tags">Sass</div>
              </div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-icon">⚡</div>
            <div className="what-content-in">
              <h3>BACKEND & DEVOPS</h3>
              <h4>Scalable Architecture & Cloud</h4>
              <p>
                Designing robust APIs and microservices. From multi-tenant SaaS
                platforms to secure JWT/RBAC authentication systems, building
                backends that scale with CI/CD and cloud infrastructure.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">NestJS</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">PHP Laravel</div>
                <div className="what-tags">.NET Core</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">Redis</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">AWS</div>
                <div className="what-tags">Stripe</div>
                <div className="what-tags">Socket.io</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
