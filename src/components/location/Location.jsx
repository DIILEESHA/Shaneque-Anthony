import "./location.css";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
const Location = () => {
  return (
    <div className="loca">
      <div className="location_container">
        <div className="location_sm ma">
          <img src="https://i.imgur.com/PWvvapm.png" alt="" className="lo" />
          <p className="location_title">
            Shaneque & Anthony – Our Forever Begins Here
          </p>

          <p className="hotel_name">
            Unicorn cove villa,Lot 17 Boscobel. St.Mary Jamaica
          </p>
          <h2 className="location_date">November 15, 2025</h2>
          <h3 className="location_time">3 o’clock in the afternoon</h3>

          <p className="short_para">
            Join us as we celebrate love, laughter, and forever in a
            breathtaking island paradise. Get ready for a day filled with joy,
            elegance, and unforgettable moments!
          </p>

          <button className="rsvp_btn">map link</button>
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
        <p className="locas">
          <RiDoubleQuotesL />A day of love, laughter, and forever! ✨ Join us
          for a celebration filled with joy, style, and unforgettable moments as
          we say 'I do' with the ones who matter most—YOU!
          <RiDoubleQuotesR />
        </p>
        <h2 className="ff">- Shaneque & Anthony</h2>
      </div>
    </div>
  );
};

export default Location;
