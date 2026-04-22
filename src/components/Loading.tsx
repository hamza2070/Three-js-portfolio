import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const hasTriggeredLoad = useRef(false);

  useEffect(() => {
    if (percent >= 100 && !hasTriggeredLoad.current) {
      hasTriggeredLoad.current = true;
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 200);
        return () => clearTimeout(t2);
      }, 100);
      return () => clearTimeout(t1);
    }
  }, [percent]);

  useEffect(() => {
    if (isLoaded) {
      import("./utils/initialFX").then((module) => {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 300);
      });
    }
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          HG
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Senior Software Developer</span> <span>Full-Stack Engineer</span>
            <span> Senior Software Developer</span> <span>Full-Stack Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let rafId: number | null = null;
  let lastTime = 0;
  let phase: "fake-fast" | "fake-slow" | "paused" | "finishing" | "done" = "fake-fast";
  let finishResolve: ((value: number) => void) | null = null;

  const tick = (time: number) => {
    if (phase === "done" || phase === "paused") return;

    const elapsed = time - lastTime;

    if (phase === "fake-fast" && elapsed > 50) {
      lastTime = time;
      percent = Math.min(percent + Math.round(Math.random() * 5), 50);
      setLoading(percent);
      if (percent >= 50) phase = "fake-slow";
    } else if (phase === "fake-slow" && elapsed > 200) {
      lastTime = time;
      percent = Math.min(percent + Math.round(Math.random() * 2), 91);
      setLoading(percent);
      if (percent >= 91) phase = "paused";
    } else if (phase === "finishing" && elapsed > 10) {
      lastTime = time;
      percent = Math.min(percent + 2, 100);
      setLoading(percent);
      if (percent >= 100) {
        phase = "done";
        if (finishResolve) finishResolve(percent);
        return;
      }
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  function clear() {
    phase = "done";
    if (rafId) cancelAnimationFrame(rafId);
    setLoading(100);
  }

  function setRealProgress(value: number) {
    // Update displayed value if it's higher than current, but don't kill the loop
    if (value > percent) {
      percent = value;
      setLoading(value);
    }
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      finishResolve = resolve;
      phase = "finishing";
      lastTime = 0;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    });
  }

  return { loaded, percent, clear, setRealProgress };
};
