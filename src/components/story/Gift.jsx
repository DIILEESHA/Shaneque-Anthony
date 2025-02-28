import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./story.css";

gsap.registerPlugin(ScrollTrigger);

const Gift = () => {
  const storyRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%", // Animation starts when 80% of the element is in view
        toggleActions: "play none none none", // Play only once
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="story_container  nadaya" ref={storyRef}>
      <h2 className="story_title" ref={titleRef}>
      Registry
      </h2>

      <p className="story_para" ref={textRef}>
        Your presence is the greatest gift, and your well-wishes mean the world
        to us. If you'd like to celebrate our new journey with a token of love,
        we've created three unique registry options to suit your preferences.
      </p>


      <button className="rsvp_btn">
            <a
              className="appa"
              href="https://www.honeyfund.com/site/Shaneque-Anthony-11-15-2025"
              target="_blank"
            >
              CLICK HERE
            </a>
          </button>
    </div>
  );
};

export default Gift;
