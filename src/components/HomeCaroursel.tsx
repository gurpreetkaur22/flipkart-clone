import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";    


const HomeCaroursel = () => {

    const banners = [
        "https://rukminim2.flixcart.com/fk-p-flap/480/230/image/5c33d35e304bac51.jpg?q=80",
        "https://rukminim2.flixcart.com/fk-p-flap/1010/490/image/8057d40eb1e584a2.png?q=80",
        "https://rukminim2.flixcart.com/fk-p-flap/1010/490/image/c3e34f7d39a201d9.png?q=80",
    ];


    return (
        <Swiper
            modules={[Autoplay, Pagination]} 
            slidesPerView={1.2}
            spaceBetween={16}
            loop={true}
            pagination={{ clickable: true }} 
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 2.2, spaceBetween: 24 },
            }}
            className="home-carousel"
        >

            {banners.map((img, index) => {
                return <SwiperSlide key={index}>
                    <img src={img} alt="banner" />
                </SwiperSlide>
            })}
        </Swiper>
    )
}

export default HomeCaroursel