import $ from 'jquery';
import {_slideToggle, bodyLock, bodyUnlock} from '../utils/utils';
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
    const filters = document.querySelector('.catalog__filters');
    function toggleFilterActiveMenuClass(listClass, headingClass) {
        Array.from(document.querySelectorAll(listClass), (block) => {
            const heading = block.querySelector(headingClass);

           if (heading) {
               heading.addEventListener('click', () => {
                   block.classList.toggle('--active');

                   if (listClass === '.catalog__filters-block' && window.innerWidth <= 768) {
                       const height = calculateTotalHeightOfChildren(filters);

                       block.querySelector('.catalog__filters-fields-wrapper').style.height = `${Math.ceil((height / 10))}rem`
                   }
               });
           }
        });
    }

    toggleFilterActiveMenuClass('.catalog__filters-block', '.catalog__filters-block-heading');
    toggleFilterActiveMenuClass('.catalog__filters-block-nested', '.catalog__filters-block-nested-heading');


    function calculateTotalHeightOfChildren(parentElement) {
        if (!(parentElement instanceof Element)) {
            console.error('Переданный аргумент не является элементом DOM');
            return null;
        }

        let totalHeight = 0;

        const children = parentElement.children;

        // Проходим по каждому дочернему элементу
        for (let i = 0; i < children.length; i++) {
            totalHeight += children[i].getBoundingClientRect().height;
        }

        return totalHeight + parentElement.scrollHeight + 30;
    }

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

    //reset filters
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

                Array.from(document.querySelectorAll('.catalog__filters-block-sorting li input'), (radioButton, index) => {
                    if (index === 0) {
                        radioButton.checked = true;

                        document.querySelector('.catalog__filters-block-sorting-menu .catalog__filters-block figcaption').textContent = radioButton.value;

                        return;
                    }

                    radioButton.checked = false
                })
            });
        });
    }

    //basket checkboxes
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

    //contacts y-map
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

    //catalog filters mobile version
    if (document.querySelector('.catalog__filters')) {
        const filters = document.querySelector('.catalog__filters');
        const stickyButton = document.querySelector('.catalog__sticky-button');
        const backButton = filters.querySelector('.catalog__filters-back-button');

        stickyButton.addEventListener('click', () => {
            filters.classList.add('--active');
            bodyLock();
        });

        backButton.addEventListener('click', () => {
            filters.classList.remove('--active');
            bodyUnlock();
        });

        Array.from(document.querySelectorAll('.catalog__filters-fields-content .catalog__filters-back-button'), (button) => {
            button.addEventListener('click', () => {
                (button.closest('.catalog__filters-block-nested') || button.closest('.catalog__filters-block')).classList.remove('--active');
            })
        })

        const sortingTitle = document.querySelector('.catalog__filters-block figcaption');

        Array.from(document.querySelectorAll('.catalog__filters-block-sorting'), (radioButton) => {
            radioButton.addEventListener('change', ({target: {value}}) => {
                sortingTitle.textContent = value;
            })
        })
    }
});
