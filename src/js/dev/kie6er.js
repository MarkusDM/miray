import $ from 'jquery';
import { bodyLock, bodyUnlock } from '../utils/utils';

$(document).ready(() => {
    //header ==================================================================
    $(window).scroll(function () {
        window.scrollY > 0 ? $('.header').addClass('scroll') : $('.header').removeClass('scroll');
    });

    $('.header__search-input').on('focusin', function (evt) {
        $('.header__search-modal').addClass('show');

        if (window.innerWidth <= 768) {
            bodyLock();
        }
    });

    $('.header .search').on('input', (evt) => {
        if (evt.target.value !== '') {
            $('.search-modal__content.empty').removeClass('show');
            $('.search-modal__content.text').addClass('show');
        } else {
            $('.search-modal__content.empty').addClass('show');
            $('.search-modal__content.text').removeClass('show');
        }
    });

    $('.header__catalog-button').on('click', function () {
        $(this).toggleClass('show');
        $('.header-catalog').toggleClass('show');
    });

    $('.header__close-search-btn').on('click', function (e) {
        e.preventDefault();
        $('.header__search-modal').removeClass('show');
        $('.header .search').removeClass('show');
        bodyUnlock();
    });

    clickOutsidePopup($('.header__search-modal'), $('.header .search'));
    clickOutsidePopup($('.header-catalog'), $('.header__catalog-button'));

    // main-page map ==========================================================
    const map_card_buttons_modal = $('.map-card__button');
    const header_button_modal = $('.header__phone-btn');

    function openMiniModal(buttons) {
        buttons.each(function (i, el) {
            $(el).on('click', function (e) {
                $(this).siblings().toggleClass('show');
            });
            clickOutsidePopup($(el.nextElementSibling), $(el));
        });
    }

    openMiniModal(map_card_buttons_modal);
    openMiniModal(header_button_modal);
    // ========================================================================

    //hide and show password ==================================================
    const show_password_buttons = $('.input .show-password');
    show_password_buttons.on('click', function () {
        const show_icon = $(this).children('.show');
        const hide_icon = $(this).children('.hide');

        if (hide_icon.hasClass('active')) {
            show_icon.addClass('active');
            hide_icon.removeClass('active');
            $(this).siblings('input').attr('type', 'text');
        } else {
            show_icon.removeClass('active');
            hide_icon.addClass('active');
            $(this).siblings('input').attr('type', 'password');
        }
    });
    // ========================================================================

    // recovery password timer ================================================
    let seconds = 30;
    let interval;

    function countdown() {
        let minutes = '0' + Math.floor(seconds / 60);
        let remaining_seconds = seconds % 60;

        if (remaining_seconds < 10) {
            remaining_seconds = '0' + remaining_seconds;
        }

        $('#countdown').html(`${minutes}:${remaining_seconds}`);

        if (seconds === 0) {
            clearInterval(interval);
            $('.authorization__info-form-button').removeClass('--disabled');
        } else {
            seconds--;
        }
    }

    $('.authorization__info-form.password-recovery').on('submit', function (e) {
        e.preventDefault();
        const input_check = !this.querySelector('.input__field').classList.contains('_has-error');
        const input_text_check = this.querySelector('.input__field').textContent !== ' ';
        const button = this.querySelector('.authorization__info-form-button');

        if (input_check && input_text_check) {
            clearInterval(interval);
            interval = setInterval(countdown, 1000);
            seconds = 30;

            $(button).addClass('--disabled');
        }
    });
    // ========================================================================
});

function clickOutsidePopup(popup, button = null) {
    $(document).on('click', function (e) {
        if (button && popup[0]) {
            const checkButton = !button.children().is(e.target) && !button.is(e.target);
            if (!popup.is(e.target) && popup.has(e.target).length === 0 && checkButton) {
                popup.removeClass('show');
                button.removeClass('show');
                if (
                    popup[0].classList.contains('show') &&
                    popup.closest('.header__search') &&
                    !e.target.closest('.search-modal')
                ) {
                    bodyUnlock();
                }
            }
        } else {
            if (!popup.is(e.target) && popup.has(e.target).length === 0) {
                popup.removeClass('show');
            }
        }
    });
}
