import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { remToPx } from '../utils/utils';

document.addEventListener('DOMContentLoaded', () => {
    const swiperSettings = (initializer, payload) => {
        if (!document.querySelector(`${initializer}-swiper`)) return;

        new Swiper(`${initializer}-swiper`, {
            modules: [Navigation, Pagination],
            spaceBetween: remToPx(4),
            speed: 1200,
            loop: true,
            pagination: {
                el: `${initializer} .swiper-pagination`,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
                clickable: true
            },
            navigation: {
                nextEl: `${initializer} .swiper-button-next`,
                prevEl: `${initializer} .swiper-button-prev`
            },

            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 4
                }
            },
            ...payload
        });
    };

    const saleSwiper = document.querySelector('.sale__swiper');
    if (saleSwiper) {
        // Initialize Swiper inside the DOMContentLoaded event listener
        new Swiper(saleSwiper, {
            modules: [EffectFade, Navigation, Pagination],
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 500,
            loop: true,
            mousewheel: {
                invert: false
            },
            pagination: {
                el: '.sale__pagination-bullets',
                clickable: true
            }
        });
    }

    const header = document.querySelector('.header');
    header &&
        new Swiper('.search-modal__slider', {
            modules: [Navigation],
            spaceBetween: `${remToPx(0.8)}rem`,
            slidesPerView: 'auto',
            speed: 800,
            navigation: {
                nextEl: '.search-modal__slider-next',
                prevEl: '.search-modal__slider-prev'
            }
        });

    swiperSettings('.recommendations', {});

    if (document.querySelector('.addiction-swiper')) {
        const sliders = document.querySelectorAll('.addiction-swiper');

        sliders.forEach((slider) => {
            new Swiper(slider, {
                modules: [Navigation, Pagination],
                spaceBetween: remToPx(1.6),
                slidesPerView: 2.5,
                speed: 1200,
                loop: true,
            })
        });
    }
});
