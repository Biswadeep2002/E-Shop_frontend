
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

// import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';

import { bannerList } from '../../utils';

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner = () => {

    return (
        // <div className='py-2 rounded-md'>
        //     <Swiper
        //         grabCursor = {true}
        //         autoplay = {{
        //             delay:4000,
        //             disableOnInteraction: false,
        //         }}
        //         navigation
        //         modules={[Pagination, EffectFade, Navigation, Autoplay]}
        //         pagination={{clickable: true}}
        //         scrollbar={{ draggable: true}}
        //         slidesPerView={1}
        //         className='home-banner-swiper'>

        //             {bannerList.map((item, i) => (
        //                 <SwiperSlide key={item.id}>
        //                     <div className={`home-banner-slide ${colors[i]} h-[420px] sm:h-[540px]`}>
        //                         <div className='home-banner-content'>
        //                             <div className='home-banner-text'>
        //                                 <span className='home-banner-chip'>Signature edit</span>
        //                                 <p className='home-banner-kicker'>New season release</p>
        //                                 <h3 className='home-banner-title'>
        //                                     {item.title}
        //                                 </h3>
        //                                 <h1 className='home-banner-subtitle'>
        //                                     {item.subTitle}
        //                                 </h1>
        //                                 <p className='home-banner-description'>
        //                                     {item.description}
        //                                 </p>
        //                                 <Link
        //                                     className='home-banner-button'
        //                                     to="/products">
        //                                     Shop collection
        //                                 </Link>
        //                             </div>
        //                             <div className='hidden lg:flex w-[320px] justify-center'>
        //                                 <img src={item?.image} alt={item?.title} className='home-banner-image' />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </SwiperSlide>
        //             ))}
        //     </Swiper>
        // </div>


         <div className='py-2 rounded-md'>
                    <Swiper
                        grabCursor = {true}
                        autoplay = {{
                            delay:4000,
                            disableOnInteraction: false,
                        }}
                        navigation
                        modules={[Pagination, EffectFade, Navigation, Autoplay]}
                        pagination={{clickable: true}}
                        scrollbar={{ draggable: true}}
                        slidesPerView={1}
                        className='home-banner-swiper'>
        
                            {bannerList.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div
                                        className='home-banner-slide h-[420px] sm:h-[540px]'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    >
                                        <div className='home-banner-content'>
                                            <div className='home-banner-text'>
                                                <span className='home-banner-chip'>Featured developments</span>
                                                <p className='home-banner-kicker'>Premium residences & commercial spaces</p>
                                                <h3 className='home-banner-title'>
                                                    {item.title}
                                                </h3>
                                                <h1 className='home-banner-subtitle'>
                                                    {item.subTitle}
                                                </h1>
                                                <p className='home-banner-description'>
                                                    {item.description}
                                                </p>
                                                <Link
                                                    className='home-banner-button'
                                                    to="/contact">
                                                  Shop collection
                                                </Link>
                                            </div>
                                            {/* <div className='home-banner-facts'>
                                                {item.facts.map((fact) => (
                                                    <span key={fact}>{fact}</span>
                                                ))}
                                            </div> */}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
    );
};

export default HeroBanner;
