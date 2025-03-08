"use client";
import React from "react";

function FramerMotion(props) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const checkRef = setInterval(() => {
      if (window.Motion) {
        clearInterval(checkRef);
      }
      if (ref.current) {
        clearInterval(checkRef);
        window.React = React;
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/framer-motion@11.11.17/dist/framer-motion.min.js";
        script.type = "module";
        script.onload = () => {
          setMounted(true);
        };
        ref.current.appendChild(script);
      }
    }, 100);

    return () => {
      clearInterval(checkRef);
      if (ref.current) {
        const script = ref.current.querySelector("script");
        if (script) {
          ref.current.removeChild(script);
        }
      }
      delete window.motion;
    };
  }, []);

  const mountElm = <div className="hidden" ref={ref} />;
  return mounted ? (
    <>
      <window.Motion.motion.div {...props} />
      {mountElm}
    </>
  ) : (
    <>
      <div {...props} />
      {mountElm}
    </>
  );
}

function FramerMotionStory() {
  return <FramerMotion></FramerMotion>;
}

export default FramerMotion;