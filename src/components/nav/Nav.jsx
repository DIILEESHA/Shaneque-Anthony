import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import gsap from "gsap";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuListRef = useRef(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // GSAP Animation for mobile_ul
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuListRef.current.children,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  return (
    <div className="nav_container">
      {/* Left Navigation */}
      <div className="nav_left">
        <div className="nav_logo nalas">
          <Link className="appa" to="/">
            <img
              src="https://i.imgur.com/sZUd5tn.png"
              alt="nav logo"
              className="nav_logo_img jg"
            />
          </Link>
        </div>
        <ul className="nav_ul">
          <li className="nav_li">
            <Link to="/guest-book" className="appa">
              Guest Book
            </Link>
          </li>
          <li className="nav_li">
            <Link to="/faq" className="appa">
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* Middle Navigation */}
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

      {/* Right Navigation */}
      <div className="nav_right">
        <button className="rsvp_btn mm">
          <Link to="/rsvp" className="appa">
            RSVP
          </Link>
        </button>

        {/* Hamburger Menu */}
        <div className="hamburger_menu" onClick={toggleMenu}>
          <CiMenuFries className="menu" />
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile_menu">
            <div className="closer" onClick={toggleMenu}>
              <IoCloseOutline className="close_ico" />
            </div>
            <ul ref={menuListRef} className="mobile_ul">
              <li className="mobile_li">
                <Link to="/guest-book" className="appa" onClick={toggleMenu}>
                  Guest Book
                </Link>
              </li>
              <li className="mobile_li">
                <Link to="/faq" className="appa" onClick={toggleMenu}>
                  FAQs
                </Link>
              </li>
              <li className="mobile_li">
                <Link to="/rsvp" className="appa" onClick={toggleMenu}>
                  RSVP
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
