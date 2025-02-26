import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoDotFill } from "react-icons/go";
import "./faq.css";

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
  const faqTitleRef = useRef(null);
  const faqItemRefs = useRef([]);

  // Ensure faqItemRefs is properly initialized
  faqItemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !faqItemRefs.current.includes(el)) {
      faqItemRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animation for the FAQ title
    gsap.fromTo(
      faqTitleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: faqTitleRef.current,
          start: "top 80%", // Animation starts when the title is 80% in view
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for FAQ items
    faqItemRefs.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3, // Delayed for a sequential appearance
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Animation triggers when item is 80% in view
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="faq_container">
      <div className="faq_grid">
        <div className="faq_sm">
          <h1 className="faq_title" ref={faqTitleRef}>
            Dress code
          </h1>
        </div>
        <div className="faq_sm">
          <div className="one" ref={addToRefs}>
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

          <div className="one" ref={addToRefs}>
            <p className="faq_li">
              <GoDotFill className="nala" />
              Are specific colors required for the dress code?
            </p>
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
          <h1 className="faq_title" ref={faqTitleRef}>
            Children
          </h1>
        </div>
        <div className="faq_sm">
          <div className="one" ref={addToRefs}>
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
