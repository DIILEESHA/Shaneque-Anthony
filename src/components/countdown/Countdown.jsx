import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./countdown.css";

gsap.registerPlugin(ScrollTrigger);

const Countdown = () => {
  const weddingDate = new Date("November 15, 2025 15:00:00").getTime(); // 3:00 PM EST

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  const countdownRef = useRef(null);
  const titleRef = useRef(null);
  const coupleRef = useRef(null);
  const counterRef = useRef(null);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 60000); // Update every minute

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: countdownRef.current,
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
      coupleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    tl.fromTo(
      counterRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
    );

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div ref={countdownRef} className="countdown_container">
      <div className="countdown_sm">
        <div className="countdown_img">
          <img
            src="https://i.imgur.com/ZtCS37f.jpeg"
            alt="Shaneque & Anthony Wedding"
            className="main_count_img"
          />
        </div>
      </div>
      <div className="countdown_sm">
        <p className="countdown_title" ref={titleRef}>
          The big day is almost here—we can't wait to celebrate with you!
        </p>

        <div className="couple_section" ref={coupleRef}>
          <img
            src="https://i.imgur.com/Ib36mYm.png"
            alt="Bride"
            className="bridal_img"
          />
          <h2 className="bridal_name">Shaneque</h2>

          <div className="line"></div>

          <img
            src="https://i.imgur.com/rUPG2QG.png"
            alt="Groom"
            className="bridal_img"
          />
          <h2 className="bridal_name">Anthony</h2>
        </div>

        <div className="counter_section" ref={counterRef}>
          <div className="sub_counter">
            <h2 className="day_count">{timeLeft.days}</h2>
            <h2 className="days">days</h2>
          </div>
          <div className="sub_counter nama">:</div>
          <div className="sub_counter">
            <h2 className="day_count">{timeLeft.hours}</h2>
            <h2 className="days">hours</h2>
          </div>
          <div className="sub_counter nama">:</div>
          <div className="sub_counter">
            <h2 className="day_count">{timeLeft.minutes}</h2>
            <h2 className="days">mins</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
