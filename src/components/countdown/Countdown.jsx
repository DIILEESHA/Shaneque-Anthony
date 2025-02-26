import { useState, useEffect } from "react";
import "./countdown.css";

const Countdown = () => {
  const weddingDate = new Date("November 15, 2025 15:00:00").getTime(); // 3:00 PM EST

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

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

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown_container">
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
        <p className="countdown_title">
          The big day is almost here—we can't wait to celebrate with you!
        </p>

        <div className="couple_section">
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

        <div className="counter_section">
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
