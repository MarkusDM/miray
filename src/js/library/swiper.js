import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules';
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
    swiperSettings('.watched-b', {});
    swiperSettings('.variants', {
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 3
            }
        }
    });
    swiperSettings('.news', {
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 3
            }
        }
    });

    swiperSettings('.receipts', {
        breakpoints: {
            0: {
                slidesPerView: 1.38
            },
            768: {
                slidesPerView: 4
            }
        }
    });

    if (document.querySelector('.addiction-swiper')) {
        const sliders = document.querySelectorAll('.addiction-swiper');

        sliders.forEach((slider) => {
            new Swiper(slider, {
                modules: [Navigation, Pagination],
                speed: 1200,
                loop: true,
                navigation: {
                    nextEl: slider.querySelector('.basket__card-addiction-navigation')
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.15,
                        spaceBetween: remToPx(3.2)
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: remToPx(1.6)
                    }
                }
            });
        });
    }
});

if (document.querySelector('.card__left')) {
    const cardThumb = new Swiper('.card__thumb', {
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        spaceBetween: remToPx(1.6),
        speed: 1200,
        slideToClickedSlide: true
    });

    const cardSwiper = new Swiper('.card__swiper', {
        modules: [Thumbs, Navigation, Pagination],
        speed: 1200,
        grabCursor: true,
        thumbs: {
            swiper: cardThumb
        },

        navigation: {
            prevEl: '.card__swiper-button-prev',
            nextEl: '.card__swiper-button-next'
        },
        slidesPerView: 1,

        breakpoints: {
            0: {
                spaceBetween: remToPx(3.2)
            },
            768: {
                spaceBetween: remToPx(1.6)
            }
        }
    });
}
