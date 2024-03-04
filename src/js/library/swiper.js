import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
    const saleSwiper = document.querySelector('.sale__swiper');
    if (saleSwiper) {
        // Initialize Swiper inside the DOMContentLoaded event listener
        new Swiper(saleSwiper, {
            modules: [EffectFade, Navigation, Pagination],
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'fade',
            loop: true,
            speed: 300,
            mousewheel: {
                invert: false
            },
            pagination: {
                el: '.sale__pagination-bullets',
                clickable: true
            }
        });
    }
});
