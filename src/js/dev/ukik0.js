import $ from 'jquery';
import { _slideToggle } from '../utils/utils';
import { rangeSlider } from '../library/nouislider';

document.addEventListener('DOMContentLoaded', () => {
    $('.recommendations__card-group-button.--secondary').each((_, button) => {
        $(button).hover(
            function () {
                const parent = $(this).closest('.recommendations__card-group');

                $(this).addClass('--active');
                $(parent).find('.recommendations__card-group-button.--primary').addClass('--hovered');
            },
            function () {
                const parent = $(this).closest('.recommendations__card-group');

                $(this).removeClass('--active');
                $(parent).find('.recommendations__card-group-button.--primary').removeClass('--hovered');
            }
        );
    });

    $('.recommendations__card-group-button').each((_, button) => {
        const parent = $(button).closest('.recommendations__card-group');

        $(button).on('click', function (event) {
            event.preventDefault();

            if ($(button).hasClass('--selected-value')) return;

            $(this).addClass('--selected');

            if ($(button).hasClass('--secondary')) {
                $(parent).find('.--primary').addClass('--selected-value');
            }
        });
    });


    //catalog filters
    function toggleFilterActiveMenuClass(listClass, headingClass) {
        Array.from(document.querySelectorAll(listClass), (block) => {
            const heading = block.querySelector(headingClass);

            heading.addEventListener('click', () => {
                block.classList.toggle('--active');
            });
        });
    };

    toggleFilterActiveMenuClass('.catalog__filters-block', '.catalog__filters-block-heading')
    toggleFilterActiveMenuClass('.catalog__filters-block-nested', '.catalog__filters-block-nested-heading')

    //catalog change view
    const CLASSES = {
        grid: 'list',
        list: 'grid'
    };

    Array.from(document.querySelectorAll('.catalog__sorting-views-button'), (button) => {
        const parent = document.querySelector('.catalog__cards');
        const children = Array.from(parent.children);

        button.addEventListener('click', () => {
            const view = button.dataset.view;

            setView(CLASSES[view]);
            changeCardView(children, CLASSES[view]);
            resetViewActiveClass();

            parent.classList.add(`--${CLASSES[view]}`);
            parent.classList.remove(`--${view}`);

            button.classList.add('--active');
        });

        const resetViewActiveClass = () => {
            Array.from(document.querySelectorAll('.catalog__sorting-views-button'), (button) => {
                button.classList.remove('--active');
            });
        };

        const setView = (view) => {
            localStorage.setItem('view', view);
        };
    });

    const changeCardView = (children, view) => {
        children.forEach((child) => {
            const card = child.querySelector('.recommendations__card') || child;

            card.classList.remove(`--${CLASSES[view]}`);
            card.classList.add(`--${view}`);
        });
    };

    const changeButtonView = (view) => {
        document.querySelector(`[data-view="${CLASSES[view]}"]`).classList.add('--active');
    };

    const initView = () => {
        const view = localStorage.getItem('view') || 'grid';
        const cards = document.querySelector('.catalog__cards');
        const children = Array.from(cards.children);

        cards.classList.add(`--${view}`);

        changeCardView(children, view);
        changeButtonView(view);
    };

    if (document.querySelector('.catalog')) {
        initView();
    }

    const filters = document.querySelector('.catalog__filters');

    if (filters) {
        const resetButton = filters.querySelector('.--reset');
        const checkboxes = filters.querySelectorAll('input[type="checkbox"]');

        Array.from(checkboxes, (checkbox) => {
            checkbox.addEventListener('change', () => {
                const isChecked = !!Array.from(checkboxes, (checkbox) => {
                    return checkbox.checked;
                }).filter(Boolean).length;

                resetButton.classList.toggle('--active', isChecked);
            });
        });

        resetButton.addEventListener('click', () => {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;

                resetButton.classList.remove('--active');

                rangeSlider.noUiSlider.set([20000, 100000]);
            });
        });
    }

    if (document.querySelector('.basket')) {
        Array.from(document.querySelectorAll('.basket__card-addiction-heading'), (button) => {
            button.addEventListener('click', () => {
                const parent = button.parentElement;

                parent.classList.toggle('--active');
            });
        });

        Array.from(document.querySelectorAll('.basket__detailed-order-content-item-heading'), (button) => {
            button.addEventListener('click', () => {
                const parent = button.parentElement;

                parent.classList.toggle('--active');
            });
        });

        const selectAllButton = document.querySelector('.basket__cards-heading-field input');

        selectAllButton.addEventListener('change', ({ target }) => {
            Array.from(document.querySelectorAll('.basket__cards input[type="checkbox"]'), (input) => {
                input.checked = !!target.checked;
            });
        });

        Array.from(document.querySelectorAll('.basket__cards input[type="checkbox"]'), (input) => {
            input.addEventListener('change', ({ target }) => {
                checkBasketCards();
            });
        });

        const checkBasketCards = () => {
            const cardsLength = Array.from(document.querySelectorAll('.basket__card-row')).length;
            const checkedCardsLength = Array.from(
                document.querySelectorAll('.basket__card-field input:checked')
            ).length;

            selectAllButton.checked = cardsLength === checkedCardsLength;
        };
    }

    if (document.querySelector('.contacts')) {
        const maps = document.querySelectorAll('[data-coordinats]');

        maps.forEach(async (item, index) => {
            await ymaps3.ready;

            const center = item.dataset.coordinats.split(', ');

            const content = document.createElement('div');
            content.classList.add('marker');
            const marker = new ymaps3.YMapMarker({ coordinates: center, draggable: false }, content);
            content.insertAdjacentHTML(
                'beforeend',
                `
                     <img src="./assets/images/icons/marker.svg" alt="" />
			    `
            );

            const map = new ymaps3.YMap(document.getElementById(`map-${index + 1}`), {
                location: {
                    center,
                    zoom: 12
                }
            });

            map.addChild(new ymaps3.YMapDefaultSchemeLayer());
            map.addChild(new ymaps3.YMapDefaultFeaturesLayer({ zIndex: 1800 }));
            map.addChild(marker);
        });
    }
});
