import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./gallery.css";
import gall from "./gallery.json";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(gall[0].src);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);

  // Handle Image Click
  const handleImageClick = (src, index) => {
    setSelectedImage(src);
    setCurrentIndex(index);
    setShowImageViewer(true);
  };

  // Navigate to Previous Image
  const prevImage = () => {
    setDirection(-1);
    const newIndex = (currentIndex - 1 + gall.length) % gall.length;
    setSelectedImage(gall[newIndex].src);
    setCurrentIndex(newIndex);
  };

  // Navigate to Next Image
  const nextImage = () => {
    setDirection(1);
    const newIndex = (currentIndex + 1) % gall.length;
    setSelectedImage(gall[newIndex].src);
    setCurrentIndex(newIndex);
  };

  // Close the image viewer
  const handleClose = () => {
    setShowImageViewer(false);
  };

  // Scroll-triggered animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <div className="gallery_container">
      {/* Scroll-triggered title animation */}
      <motion.div
        className="gallery_title_container"
        style={{ opacity, scale, y }}
      >
        <div className="fg">
          <div className="gh">
            <span className="hhh">
              Love, laughter, and memories in every frame.
            </span>
          </div>
          <h2 className="gallery_title">Some of our favourite pictures</h2>
        </div>
      </motion.div>

      {/* Swiper Gallery with Custom Navigation */}
      <motion.div
        style={{
          opacity,
          scale,
          y: useTransform(scrollYProgress, [0.2, 0.7], [100, 0]),
        }}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".let_yy.righto",
            prevEl: ".let_yy.lefto",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2, // 2 images per page on tablets
            },
            1024: {
              slidesPerView: 3, // 3 images per page on desktops
            },
          }}
        >
          {gall.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="img_galleries"
                initial="onLeave"
                whileHover="onEnter"
                animate="onLeave"
                onClick={() => handleImageClick(item.src, index)}
              >
                <motion.img className="card_img" src={item.src} alt="" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <motion.div
          className="img_yy"
          style={{
            opacity,
            scale,
            y: useTransform(scrollYProgress, [0.3, 0.8], [100, 0]),
          }}
        >
          <div className="let_yy lefto">
            <img
              className="reto s"
              src="https://i.imgur.com/kws6Dk5.png"
              alt="Previous"
            />
          </div>

          <div className="let_yy righto">
            <img
              className="reto rightos"
              src="https://i.imgur.com/kws6Dk5.png"
              alt="Next"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Open Image Viewer */}
      {showImageViewer && (
        <div className="open">
          <div className="pol">
            {/* Left Arrow */}
            <div
              className={`sm_pol malk ${currentIndex === 0 ? "disabled" : ""}`}
              onClick={currentIndex === 0 ? undefined : prevImage}
            >
              <IoIosArrowBack className="halm" />
            </div>

            {/* Right Arrow */}
            <div
              className={`sm_pol palk ${
                currentIndex === gall.length - 1 ? "disabled" : ""
              }`}
              onClick={currentIndex === gall.length - 1 ? undefined : nextImage}
            >
              <IoIosArrowForward className="halm" />
            </div>
          </div>

          {/* Main Opened Image with 3D Hover and Rotation */}
          <div className="sm_open">
            <AnimatePresence custom={direction}>
              <motion.img
                key={selectedImage}
                className="mail nalaya"
                src={selectedImage}
                alt="Selected"
                variants={{
                  enter: (direction) => ({
                    x: direction > 0 ? 100 : -100,
                    opacity: 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (direction) => ({
                    x: direction > 0 ? -100 : 100,
                    opacity: -0.5,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                custom={direction}
              />

              <h1 className="don" onClick={handleClose}>
                Close
                <IoCloseOutline className="caledra" />
              </h1>
            </AnimatePresence>

            {/* Small Preview Below */}
            <motion.div className="sm_sm_card" whileHover="onEnter">
              <motion.img
                className="mail"
                src={selectedImage}
                alt="Selected Thumbnail"
              />
            </motion.div>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default Gallery;
