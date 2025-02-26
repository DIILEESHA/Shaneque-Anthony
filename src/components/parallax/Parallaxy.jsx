import "./parallax.css";
import { Parallax } from "react-parallax";
const Parallaxy = () => {
  return (
    <div className="santo">
      {" "}
      <Parallax
        blur={10}
        className="dd"
        bgImage="https://i.imgur.com/TA476Xe.jpeg"
        bgImageAlt="the cat"
        strength={300}
      >
        <h2 className="dsd">rsvp</h2>
        <p className="dd_pra">
          Please let us know if you will be able to join us in celebrating our
          special day. Kindly RSVP by April 10, 2025.
        </p>
        <button className="rsvp_btn">rsvp here</button>
      </Parallax>
    </div>
  );
};

export default Parallaxy;
