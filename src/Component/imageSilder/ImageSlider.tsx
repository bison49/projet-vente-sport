import './imageSlider.css';

import { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const ImageSlider = ({ slides, setIsOpen, setSlide }: any) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  function handleModal(uri: string) {
    setSlide(`http://localhost:8000/uploads/users/articles/${uri}`);
    setIsOpen(true);
  }

  return (
    <section className="slider">
      <div className="arrow-wrapper arr-left">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      </div>

      {slides.map((slide, index) => (
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {index === current && (
            <button
              className="button-image-slide"
              type="button"
              onClick={() => {
                handleModal(slide.uri);
              }}
            >
              <img
                src={`http://localhost:8000/uploads/users/articles/${slide.uri}`}
                alt="bien à vendre"
                className="image-details"
              />
            </button>
          )}
          <span className="count-image">
            {index + 1}/{slides.length}
          </span>
        </div>
      ))}
      <div className="arrow-wrapper arr-right">
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      </div>
    </section>
  );
};

export default ImageSlider;
