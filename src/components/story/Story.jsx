import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./story.css";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const storyRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
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
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="story_container" ref={storyRef}>
      <h2 className="story_title" ref={titleRef}>
        Shaneque & Anthony – A Love as Timeless as the Ocean & Sky
      </h2>

      <p className="story_para" ref={textRef}>
        From a chance encounter on the beautiful shores of Jamaica to a love
        story that transcends time, our journey together has been filled with
        adventure, laughter, and endless love. Now, as we embark on the next
        chapter of our lives, we invite you to join us in celebrating our union
        in a breathtaking island paradise.
      </p>
    </div>
  );
};

export default Story;
