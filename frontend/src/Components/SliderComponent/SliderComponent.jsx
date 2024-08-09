// SliderComponent.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SliderComponent.css'; // Ensure you import the CSS file

const SliderComponent = ({props}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src="http://localhost:4000/upload/images/banner3.png" alt="Slide 3" />
                </div>
                <div>
                    <img src="http://localhost:4000/upload/images/banner2.png" alt="Slide 2" />
                </div>
                <div>
                    <img src="http://localhost:4000/upload/images/banner.png" alt="Slide 1" />
                </div>

            </Slider>
        </div>
    );
};

export default SliderComponent;
