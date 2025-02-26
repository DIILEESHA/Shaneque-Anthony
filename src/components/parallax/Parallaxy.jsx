import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Parallax } from "react-parallax";
import "./parallax.css";

gsap.registerPlugin(ScrollTrigger);

const Parallaxy = () => {
  const rsvpTitleRef = useRef(null);
  const rsvpTextRef = useRef(null);
  const rsvpButtonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rsvpTitleRef.current,
        start: "top 80%", // Animation starts when 80% of the element is in view
        toggleActions: "play none none none", // Play only once
      },
    });

    // Add animation for the RSVP Title
    tl.fromTo(
      rsvpTitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // Add animation for the RSVP Text
    tl.fromTo(
      rsvpTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
    );

    // Add animation for the RSVP Button
    tl.fromTo(
      rsvpButtonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="santo">
      <Parallax
        blur={10}
        className="dd"
        bgImage="https://i.imgur.com/TA476Xe.jpeg"
        bgImageAlt="the cat"
        strength={300}
      >
        <h2 className="dsd" ref={rsvpTitleRef}>
          RSVP
        </h2>
        <p className="dd_pra" ref={rsvpTextRef}>
          Please let us know if you will be able to join us in celebrating our
          special day. Kindly RSVP by April 10, 2025.
        </p>
        <button className="rsvp_btn" ref={rsvpButtonRef}>
          RSVP Here
        </button>
      </Parallax>
    </div>
  );
};

export default Parallaxy;
