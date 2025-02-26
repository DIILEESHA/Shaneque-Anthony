import "./faq.css";
import { GoDotFill } from "react-icons/go";

const Faq = () => {
  return (
    <div className="faq_container">
      <div className="faq_grid">
        <div className="faq_sm">
          <h1 className="faq_title">Dress code</h1>
        </div>
        <div className="faq_sm">
          <div className="one">
            <p className="faq_li">
              <GoDotFill className="nala" />
              What does "formal attire" mean?
            </p>
            <p className="faq_para">
              Formal attire typically includes elegant gowns, suits, tuxedos, or
              cocktail dresses. Think of it as dressing for a special occasion,
              similar to what you might wear to a sophisticated evening event.
            </p>
          </div>

          <div className="one">
            <li className="faq_li">
              <GoDotFill className="nala" />
              Are specific colors required for the dress code?
            </li>

            <p className="faq_para">
              No, there are no specific color requirements. Feel free to express
              your personal style and wear colors that make you feel comfortable
              and confident.
            </p>
          </div>
        </div>
      </div>

      <div className="faq_grid mh">
        <div className="faq_sm">
          <h1 className="faq_title">Children</h1>
        </div>
        <div className="faq_sm">
          <div className="one">
            <p className="faq_li">
              <GoDotFill className="nala" />
              Are children welcome at the wedding?
            </p>
            <p className="faq_para">NO!</p>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Faq;
