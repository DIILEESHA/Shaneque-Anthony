import { Link } from "react-router-dom";
import "./main.css";

const Main = () => {
  return (
    <div className="main_container">
      <div className="main_sub_left">
        <div className="name_section"></div>
        {/* <div className="main_sub_left_imger">
          <img
            src="https://i.imgur.com/Yk55igR.jpeg"
            alt=""
            className="main_left_img"
          />
        </div> */}

        <div className="main_detail_section">
          <h2 className="couple_name">Shaneque & Anthony</h2>
          <h2 className="save">save the date</h2>
          <div className="lino"></div>
          <h1 className="date">November 15, 2025</h1>
          <h3 className="place">
            Unicorn cove villa,Lot 17 Boscobel. St.Mary Jamaica
          </h3>
        </div>
        <button className="rsvp_btn">
          <Link to="/rsvp" className="appa">
            rsvp
          </Link>
        </button>
      </div>
      <div className="main_sub_right">
        <div className="main_m">
          <img
            src="https://i.imgur.com/Yk55igR.jpeg"
            alt=""
            className="main_imf"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
