import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './carsslider.css';

interface Slide {
  index: number;
  imageUrl: string;
  title: string;
  description: string;
}

interface CarsSliderProps {
  slides: Slide[];
}

const CarsSlider: React.FC<CarsSliderProps> = ({ slides }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const currentScrollLeft = sliderRef.current.scrollLeft;
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const newScrollLeft = currentScrollLeft < maxScrollLeft ? currentScrollLeft + 480 : 0; // Assuming each slide has a width of 480px
        sliderRef.current.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });
      }
    }, 2000); // Change 2000 to adjust the interval (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  const handleViewAllCars = () => {
    navigate("/cars");
  };

  return (
    <div className="home_fleet">
      <div className="container">
        <div className="component_header">
          <h2 className="title">ROBORIDE CARS</h2>
        </div>
      </div>
      <div className="home_fleet-slider" ref={sliderRef}>
        <div className="swiper-container swiper-container-initialized swiper-container-horizontal" id="HomeFleetSlider" style={{ cursor: 'grab' }}>
          <ul className="swiper-wrapper" style={{ transitionDuration: '0ms', transform: 'translate3d(0px, 0px, 0px)' }}>
            {slides.map((slide, index) => (
              <li key={index} className="swiper-slide" style={{ width: '470px', marginRight: '20px' }}>
                <div className="fleet-item">
                  <div className="image">
                    <img className="lazy" src={slide.imageUrl} alt={slide.title} />
                  </div>
                  <div className="text_wrap">
                    <h3 className="slider-title"><strong>{slide.title}</strong></h3>
                    <p className="text">{slide.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
            {slides.map((_, index) => (
              <span key={index} className={`swiper-pagination-bullet ${index === 0 ? 'swiper-pagination-bullet-active' : ''}`} tabIndex={0} role="button" aria-label={`Go to slide ${index + 1}`}></span>
            ))}
          </div>
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>
      <div className="slider-button">
        <button className="btn btn-brand btn-success" onClick={handleViewAllCars}><span><strong>VIEW ALL CARS</strong></span></button>
      </div>
    </div>
  );
}

export default CarsSlider;