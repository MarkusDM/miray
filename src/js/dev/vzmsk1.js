import { removeClasses, bodyLockStatus, bodyLock, bodyUnlock } from '../utils/utils';

import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
    const mm = window.matchMedia('(max-width: 768px)');

    if (document.querySelectorAll('.map-card__button').length) {
        document.addEventListener('click', function (e) {
            if (e.target.closest('.map-card__button') && !e.target.closest('.map-card__footer._is-active')) {
                e.target.closest('.map-card__footer').classList.add('_is-active');
            } else if (
                document.querySelector('.map-card__footer._is-active') &&
                (e.target.closest('.map-card__button') || !e.target.closest('.map-card__footer'))
            ) {
                document.querySelector('.map-card__footer._is-active').classList.remove('_is-active');
            }
        });
    }

    if (document.querySelectorAll('[data-three-card]').length) {
        document.querySelectorAll('[data-three-card]').forEach((card) => {
            card.addEventListener('mousemove', function (e) {
                const xPos = e.clientX / window.innerWidth - 0.5;
                const yPos = e.clientY / window.innerHeight - 0.5;

                gsap.to(card, {
                    duration: 0.5,
                    rotationY: xPos * 50,
                    rotationX: yPos * 50,
                    ease: 'power2.out'
                });
            });
            card.addEventListener('mouseleave', function (e) {
                gsap.to(card, {
                    duration: 0.5,
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    if (document.querySelector('.header__mm-link_hamburger')) {
        document.querySelector('.header__mm-link_hamburger').addEventListener('click', function () {
            document.documentElement.classList.add('_show-menu');
            bodyLock();
        });
    }

    if (document.querySelector('.menu-header')) {
        document.querySelector('.menu-header').addEventListener('click', function (e) {
            if (
                document.documentElement.classList.contains('_show-menu') &&
                !e.target.closest('.menu-header__inner')
            ) {
                document.documentElement.classList.remove('_show-menu');
                bodyUnlock();
            }
        });
    }

    if (document.querySelectorAll('.option-item__radio-btn input').length) {
        const btns = document.querySelectorAll('.option-item__radio-btn input');
        const input = document.querySelector('.companies-delivery-checkout__input');

        const setClass = (btn) => {
            if (btn.checked) {
                removeClasses(btn.closest('section').querySelectorAll('.option-item'), '_is-active');
                btn.closest('.option-item').classList.add('_is-active');

                if (btn.closest('.option-item__radio-btn_other')) {
                    input ? input.classList.add('_is-visible') : null;
                } else {
                    input ? input.classList.remove('_is-visible') : null;
                }
            }
        };

        btns.forEach((btn) => {
            btn.addEventListener('input', function () {
                setClass(btn);
            });
            setClass(btn);
        });
    }

    if (document.querySelector('.data-checkout .input_file-input')) {
        const input = document.querySelector('.data-checkout .input_file-input input');
        const placeholder = input.parentElement.querySelector('.input__placeholder');
        const requiredFields = input.closest('.data-checkout__fields').querySelectorAll('[data-validate]');
        const reader = new FileReader();
        const placeholderData = placeholder.innerHTML;

        const readFile = (file) => {
            reader.onload = readSuccess;
            function readSuccess(e) {
                if (file) {
                    console.log(file);
                    const data = {
                        // name: file.name.split('.').slice(0, -1).join(''),
                        name: file.name,
                        size: file.size,
                        extension: file.name.split('.').pop()
                    };
                    const extensions = ['jpeg', 'jpg', 'png', 'webp', 'pdf'];

                    const formatBytes = (bytes) => {
                        if (bytes >= 1000) {
                            return `${(bytes / 1048576).toFixed(2)} mб`;
                        }
                        return `${bytes} б`;
                    };
                    const addErr = () => {
                        // parent.classList.add('_error');
                        // parent.classList.remove('_filled');
                        // ths.addError(formRequiredItem);
                    };
                    placeholder
                        ? (placeholder.innerHTML = data.name)
                        : (placeholder.innerHTML = placeholderData);

                    // if ((data.size / 1048576).toFixed(2) > maxSize) {
                    //     text.innerHTML = 'Большой размер файла';
                    //     addErr();
                    // } else if (!extensions.includes(data.extension)) {
                    //     text.innerHTML = ' Файл должен иметь формат jpeg,jpg,png,webp, или pdf';
                    //     addErr();
                    // } else {
                    //     parent.classList.remove('_error');
                    //     parent.classList.add('_filled');
                    //     ths.removeError(formRequiredItem);
                    // }

                    // if (removeBtn) {
                    //     removeBtn.addEventListener('click', function () {
                    //         parent.classList.remove('_error');
                    //         parent.classList.remove('_filled');
                    //         formRequiredItem.value = '';
                    // ths.removeError(formRequiredItem);
                    //     });
                    // }
                }
            }

            if (file) reader.readAsDataURL(file);
        };

        input.addEventListener('change', function (e) {
            readFile(e.srcElement.files[0]);
        });
    }

    if (document.querySelector('.myprofile-account__title')) {
        const heading = document.querySelector('.myprofile-account__title');
        const menuItems = document.querySelectorAll('.menu-account');
        const openSubmenuBtn = document.querySelector('.menu-account__open-submenu-btn');
        const submenu = document.querySelector('.menu-account_account-type');
        const mainMenu = document.querySelector('.menu-account_main');

        heading.addEventListener('click', function () {
            if (mainMenu && window.innerWidth <= 768 && bodyLockStatus) {
                bodyLock();
                mainMenu.classList.add('_is-active');
            }
        });
        if (menuItems.length) {
            menuItems.forEach((menuItem) => {
                menuItem.addEventListener('click', function (e) {
                    const target = e.target;

                    if (
                        target.closest('.menu-account__open-submenu-btn') &&
                        window.innerWidth <= 768 &&
                        bodyLockStatus
                    ) {
                        submenu.classList.add('_is-active');
                    }
                    if (target.closest('.menu-account__close-btn')) {
                        target.closest('.menu-account').classList.remove('_is-active');
                        if (target.closest('.menu-account_main')) bodyUnlock();
                    }
                });
            });
        }
    }

    if (document.querySelector('.header__mm-link_search')) {
        document.querySelector('.header__mm-link_search').addEventListener('click', function () {
            document.querySelector('.header').classList.toggle('_show-search');
        });
    }

    if (document.querySelector('.header-catalog')) {
        document.querySelector('.header-catalog').addEventListener('mouseover', function (e) {
            if (e.target.closest('.header-catalog__item')) {
                removeClasses(document.querySelectorAll('.header-catalog__item'), '_active');
                e.target.closest('.header-catalog__item').classList.add('_active');
            }
        });
    }

    if (document.querySelector('.consultation__poster')) {
        const container = document.querySelector('.consultation__poster');
        const duration = 1000;
        let step = 0;

        container.addEventListener('click', function (e) {
            if (e.target.closest('.consultation__poster-img')) {
                step = step >= 3 ? 0 : ++step;
                container.dataset.step = step;
                container.classList.add('_is-animating');

                setTimeout(() => {
                    container.classList.remove('_is-animating');
                }, duration);
            }
        });
    }

    const handleMouseover = (e) => {
        const target = e.target;

        if (target.closest('[data-nav-sublink-index]')) {
            const el = target.closest('[data-nav-sublink-index]');
            const subnav = document.querySelector(`[data-subnav-index="${el.dataset.navSublinkIndex}"]`);

            removeClasses(document.querySelectorAll('[data-nav-sublink-index]'), '_is-active');
            removeClasses(document.querySelectorAll('[data-subnav-index]'), '_is-active');
            el.classList.add('_is-active');
            if (subnav) subnav.classList.add('_is-active');
        }
    };

    mm.addEventListener('change', function () {
        if (!mm.matches) {
            if (document.querySelector('.menu-account._is-active') && bodyLockStatus) {
                bodyUnlock();
                removeClasses(document.querySelectorAll('.menu-account._is-active'), '_is-active');
            }
            if (document.documentElement.classList.contains('_show-menu')) {
                bodyUnlock();
                document.documentElement.classList.remove('_show-menu');
            }
        }
    });
    document.addEventListener('mouseover', handleMouseover);
});
