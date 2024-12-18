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
            slidesPerView={1} // Default for mobile
            breakpoints={{
                640: {
                    slidesPerView: 2, // For small devices
                },
                768: {
                    slidesPerView: 3, // For medium devices
                },
                1024: {
                    slidesPerView: 4, // For large devices
                },
            }}
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
