import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "./main.css";

const Main = () => {
  const mainContainerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    // Fade in and slide main container
    tl.fromTo(
      mainContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
      .fromTo(leftSectionRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5")
      .fromTo(rightSectionRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5")
      .fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
      .fromTo(buttonRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 }, "-=0.5");
  }, []);

  return (
    <div className="main_container" ref={mainContainerRef}>
      <div className="main_sub_left" ref={leftSectionRef}>
        <div className="main_detail_section" ref={textRef}>
          <h2 className="couple_name">Shaneque & Anthony</h2>
          <h2 className="save">save the date</h2>
          <div className="lino"></div>
          <h1 className="date">April 25, 2026</h1>
          <h3 className="place">
            Unicorn Cove Villa, Lot 17 Boscobel, St. Mary, Jamaica
          </h3>
        </div>
        <button className="rsvp_btn" ref={buttonRef}>
          <Link to="/rsvp" className="appa">
            rsvp
          </Link>
        </button>
      </div>

      <div className="main_sub_right" ref={rightSectionRef}>
        <div className="main_m">
          <img
            src="https://i.imgur.com/Yk55igR.jpeg"
            alt="Couple"
            className="main_imf"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
