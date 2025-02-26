import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <div className="nav_container">
      <div className="nav_left">
        <ul className="nav_ul">
          {/* <li className="nav_li">our story</li> */}
          <li className="nav_li">
            <Link to="/guest-book" className="appa">
              guest book
            </Link>
          </li>
          <li className="nav_li">
            <Link className="appa" to="/faq">
              faqs
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav_middle">
        <div className="nav_logo">
          <Link className="appa" to="/">
            <img
              src="https://i.imgur.com/sZUd5tn.png"
              alt="nav logo"
              className="nav_logo_img"
            />
          </Link>
        </div>
      </div>
      <div className="nav_right">
        <button className="rsvp_btn">
          <Link to="/rsvp" className="appa">
            rsvp
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
