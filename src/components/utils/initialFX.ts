import { SplitText } from "../../utils/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#06020f",
    duration: 0.5,
    delay: 1,
  });

  // Animate the landing hero elements
  gsap.fromTo(
    ".landing-badge",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
  );

  var landingName = new SplitText(".landing-name", {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingName.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.03,
      delay: 0.4,
    }
  );

  gsap.fromTo(
    ".landing-tagline",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
  );

  gsap.fromTo(
    ".landing-scroll-hint",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power1.out", delay: 1.2 }
  );

  // Landing info (role text)
  gsap.fromTo(
    ".landing-info",
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
  );

  var landingInfoH3 = new SplitText(".landing-info h3", {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingInfoH3.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  var landingInfoH2 = new SplitText(".landing-info-h2", {
    type: "chars,lines",
    linesClass: "split-h2",
  });
  gsap.fromTo(
    landingInfoH2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.5,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
