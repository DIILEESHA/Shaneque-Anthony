import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import "./location.css";

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const locationRef = useRef(null);
  const titleRef = useRef(null);
  const hotelNameRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const shortParaRef = useRef(null);
  const buttonRef = useRef(null);
  const quoteRef = useRef(null);
  const coupleNameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: locationRef.current,
        start: "top 40%", // Animation starts when 80% of the element is in view
        toggleActions: "play none none none", // Play only once
      },
    });

    // Fade and Slide-in with staggered delay
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "easeInOut" }
    );
    
    tl.fromTo(
      hotelNameRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.4, delay: 0.1, ease: "easeInOut" }
    );

    tl.fromTo(
      dateRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "easeInOut" }
    );

    tl.fromTo(
      timeRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "easeInOut" }
    );

    tl.fromTo(
      shortParaRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3, delay: 0.4, ease: "easeInOut" }
    );

    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.1, delay: 0.5, ease: "easeInOut" }
    );

    tl.fromTo(
      quoteRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "easeInOut" }
    );

    tl.fromTo(
      coupleNameRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "easeInOut" }
    );
  }, []);

  return (
    <div className="loca" ref={locationRef}>
      <div className="location_container">
        <div className="location_sm ma">
          <img
            src="https://i.imgur.com/PWvvapm.png"
            alt=""
            className="lo"
          />
          <p className="location_title" ref={titleRef}>
            Shaneque & Anthony – Our Forever Begins Here
          </p>

          <p className="hotel_name" ref={hotelNameRef}>
            Unicorn Cove Villa, Lot 17 Boscobel. St. Mary Jamaica
          </p>
          <h2 className="location_date" ref={dateRef}>
            November 15, 2025
          </h2>
          <h3 className="location_time" ref={timeRef}>
            3 o’clock in the afternoon
          </h3>

          <p className="short_para" ref={shortParaRef}>
            Join us as we celebrate love, laughter, and forever in a
            breathtaking island paradise. Get ready for a day filled with joy,
            elegance, and unforgettable moments!
          </p>

          <button className="rsvp_btn" ref={buttonRef}>Map Link</button>
        </div>
        <div className="location_sm">
          <img
            src="https://i.imgur.com/Y8mzLJW.jpeg"
            alt=""
            className="venue_img"
          />
        </div>
      </div>
      <div className="ll">
        <p className="locas" ref={quoteRef}>
          <RiDoubleQuotesL />
          A day of love, laughter, and forever! ✨ Join us for a celebration
          filled with joy, style, and unforgettable moments as we say 'I do' with
          the ones who matter most—YOU!
          <RiDoubleQuotesR />
        </p>
        <h2 className="ff" ref={coupleNameRef}>
          - Shaneque & Anthony
        </h2>
      </div>
    </div>
  );
};

export default Location;
