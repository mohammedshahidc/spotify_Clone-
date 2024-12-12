import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const CardCarousel = ({ children }) => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={3}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            
        >
            {React.Children.map(children, (child) => (
                <SwiperSlide className="flex justify-center">
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CardCarousel;