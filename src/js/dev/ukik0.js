import $ from "jquery";
import { _slideToggle, bodyLock, bodyUnlock } from "../utils/utils";
import { rangeSlider } from "../library/nouislider";

$(document).ready(function() {
  $(document).on('mouseenter', '.recommendations__card-group-button.--secondary', function() {
      const parent = $(this).closest(".recommendations__card-group");

      $(this).addClass("--active");
      parent.find(".recommendations__card-group-button.--primary").addClass("--hovered");
  });

  $(document).on('mouseleave', '.recommendations__card-group-button.--secondary', function() {
      const parent = $(this).closest(".recommendations__card-group");

      $(this).removeClass("--active");
      parent.find(".recommendations__card-group-button.--primary").removeClass("--hovered");
  });
});


$(document).ready(function() {
  function isMobile() {
      return window.innerWidth <= 768;
  }

  function scrollToTop() {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  $('.catalog__filters-block, .catalog__filters-block-nested').on('click', function() {
      if (isMobile()) {
          scrollToTop();
      }
  });
});




document.addEventListener("DOMContentLoaded", () => {
  $(".recommendations__card-group-button.--secondary").each((_, button) => {
    $(button).hover(
      function () {
        const parent = $(this).closest(".recommendations__card-group");

        $(this).addClass("--active");
        $(parent)
          .find(".recommendations__card-group-button.--primary")
          .addClass("--hovered");
      },
      function () {
        const parent = $(this).closest(".recommendations__card-group");

        $(this).removeClass("--active");
        $(parent)
          .find(".recommendations__card-group-button.--primary")
          .removeClass("--hovered");
      },
    );
  });

  //catalog filters
  const filters = document.querySelector(".catalog__filters");

  function calculateTotalHeightOfChildren(element) {
      let totalHeight = 0;
      Array.from(element.children).forEach(child => {
          totalHeight += child.offsetHeight;
      });
      return totalHeight;
  }
  
  function toggleFilterActiveMenuClass(listClass, headingClass) {
      Array.from(document.querySelectorAll(listClass)).forEach(block => {
          const heading = block.querySelector(headingClass);
  
          if (heading) {
              heading.addEventListener("click", () => {
                  console.log('Heading clicked:', headingClass); // Debug: лог для проверки клика
                  block.classList.toggle("--active");
  
                  if (window.innerWidth <= 768) { // Check for mobile version
                      console.log('Mobile version detected'); // Debug: лог для проверки мобильной версии
                    
                      if (listClass === ".catalog__filters-block") {
                          const height = calculateTotalHeightOfChildren(filters);
                          const fieldsWrapper = block.querySelector(".catalog__filters-fields-wrapper");
  
                          if (fieldsWrapper) {
                              fieldsWrapper.style.height = `${Math.ceil(height / 10)}rem`;
                          }
                      }
                  }
              });
          }
      });
  }
  
  toggleFilterActiveMenuClass(".catalog__filters-block", ".catalog__filters-block-heading");
  toggleFilterActiveMenuClass(".catalog__filters-block-nested", ".catalog__filters-block-nested-heading");
  

  function calculateTotalHeightOfChildren(parentElement) {
    if (!(parentElement instanceof Element)) {
      console.error("Переданный аргумент не является элементом DOM");
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
    grid: "list",
    list: "grid",
  };

  Array.from(
    document.querySelectorAll(".catalog__sorting-views-button"),
    (button) => {
      const parent = document.querySelector(".catalog__cards");
      const children = Array.from(parent.children);

      button.addEventListener("click", () => {
        const view = button.dataset.view;

        setView(CLASSES[view]);
        changeCardView(children, CLASSES[view]);
        resetViewActiveClass();

        parent.classList.add(`--${CLASSES[view]}`);
        parent.classList.remove(`--${view}`);

        button.classList.add("--active");
      });

      const resetViewActiveClass = () => {
        Array.from(
          document.querySelectorAll(".catalog__sorting-views-button"),
          (button) => {
            button.classList.remove("--active");
          },
        );
      };

      const setView = (view) => {
        localStorage.setItem("view", view);
      };
    },
  );

  const changeCardView = (children, view) => {
    children.forEach((child) => {
      const card = child.querySelector(".recommendations__card") || child;

      card.classList.remove(`--${CLASSES[view]}`);
      card.classList.add(`--${view}`);
    });
  };

  const changeButtonView = (view) => {
    document
      .querySelector(`[data-view="${CLASSES[view]}"]`)
      .classList.add("--active");
  };

  const initView = () => {
    const view = localStorage.getItem("view") || "grid";
    const cards = document.querySelector(".catalog__cards");
    const children = Array.from(cards.children);

    cards.classList.add(`--${view}`);

    changeCardView(children, view);
    changeButtonView(view);
  };

  if (document.querySelector(".catalog")) {
    initView();
  }

  //reset filters
  if (filters) {
    const resetButton = filters.querySelector(".--reset");
    const checkboxes = filters.querySelectorAll('input[type="checkbox"]');

    Array.from(checkboxes, (checkbox) => {
      checkbox.addEventListener("change", () => {
        const isChecked = !!Array.from(checkboxes, (checkbox) => {
          return checkbox.checked;
        }).filter(Boolean).length;

        resetButton.classList.toggle("--active", isChecked);
      });
    });

    resetButton.addEventListener("click", () => {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;

        resetButton.classList.remove("--active");

        // rangeSlider.noUiSlider.set([20000, 100000]);

        Array.from(
          document.querySelectorAll(".catalog__filters-block-sorting li input"),
          (radioButton, index) => {
            if (index === 0) {
              radioButton.checked = true;

              document.querySelector(
                ".catalog__filters-block-sorting-menu .catalog__filters-block figcaption",
              ).textContent = radioButton.value;

              return;
            }

            radioButton.checked = false;
          },
        );
      });
    });
  }

  //basket checkboxes
  if (document.querySelector(".basket")) {
    Array.from(
      document.querySelectorAll(".basket__card-addiction-heading"),
      (button) => {
        button.addEventListener("click", () => {
          const parent = button.parentElement;

          parent.classList.toggle("--active");
        });
      },
    );

    Array.from(
      document.querySelectorAll(".basket__detailed-order-content-item-heading"),
      (button) => {
        button.addEventListener("click", () => {
          const parent = button.parentElement;

          parent.classList.toggle("--active");
        });
      },
    );

    const selectAllButton = document.querySelector(
      ".basket__cards-heading-field input",
    );

    selectAllButton.addEventListener("change", ({ target }) => {
      Array.from(
        document.querySelectorAll('.basket__cards input[type="checkbox"]'),
        (input) => {
          input.checked = !!target.checked;
        },
      );
    });

    Array.from(
      document.querySelectorAll('.basket__cards input[type="checkbox"]'),
      (input) => {
        input.addEventListener("change", ({ target }) => {
          checkBasketCards();
        });
      },
    );

    const checkBasketCards = () => {
      const cardsLength = Array.from(
        document.querySelectorAll(".basket__card-row"),
      ).length;
      const checkedCardsLength = Array.from(
        document.querySelectorAll(".basket__card-field input:checked"),
      ).length;

      selectAllButton.checked = cardsLength === checkedCardsLength;
    };
  }

  //contacts y-map
  if (document.querySelector(".contacts")) {
    const maps = document.querySelectorAll("[data-coordinats]");

    maps.forEach(async (item, index) => {
      await ymaps3.ready;

      const center = item.dataset.coordinats.split(", ");

      const content = document.createElement("div");
      content.classList.add("marker");
      const marker = new ymaps3.YMapMarker(
        { coordinates: center, draggable: false },
        content,
      );
      content.insertAdjacentHTML(
        "beforeend",
        `
                     <img src="./assets/images/icons/marker.svg" alt="" />
			    `,
      );

      const map = new ymaps3.YMap(document.getElementById(`map-${index + 1}`), {
        location: {
          center,
          zoom: 12,
        },
      });

      map.addChild(new ymaps3.YMapDefaultSchemeLayer());
      map.addChild(new ymaps3.YMapDefaultFeaturesLayer({ zIndex: 1800 }));
      map.addChild(marker);
    });
  }

  //catalog filters mobile version
  if (document.querySelector(".catalog__filters")) {
    const filters = document.querySelector(".catalog__filters");
    const stickyButton = document.querySelector(".catalog__sticky-button");
    const backButton = filters.querySelector(".catalog__filters-back-button");

    stickyButton.addEventListener("click", () => {
      filters.classList.add("--active");
      bodyLock();
    });

    backButton.addEventListener("click", () => {
      filters.classList.remove("--active");
      bodyUnlock();
    });

    Array.from(
      document.querySelectorAll(
        ".catalog__filters-fields-content .catalog__filters-back-button",
      ),
      (button) => {
        button.addEventListener("click", () => {
          (
            button.closest(".catalog__filters-block-nested") ||
            button.closest(".catalog__filters-block")
          ).classList.remove("--active");
        });
      },
    );

    const sortingTitle = document.querySelector(
      ".catalog__filters-block figcaption",
    );

    Array.from(
      document.querySelectorAll(".catalog__filters-block-sorting"),
      (radioButton) => {
        radioButton.addEventListener("change", ({ target: { value } }) => {
          sortingTitle.textContent = value;
        });
      },
    );
  }

  //catalog categories mobile menu
  if (document.querySelector(".categories")) {
    const cards = document.querySelectorAll(".categories__card");

    cards.forEach((card) => {
      const detailedMenu = card.querySelector(".categories__card-detailed");
      const backButton = detailedMenu.querySelector(
        ".categories__card-detailed-back-button",
      );

      card.addEventListener("click", () => {
        detailedMenu.classList.add("--active");
        bodyLock();
      });

      backButton.addEventListener("click", () => {
        setTimeout(() => {
          detailedMenu.classList.remove("--active");
        }, 0);
        bodyUnlock();
      });
    });
  }

  //products countdown

  if (document.querySelector(".recommendations__card-countdown")) {
    function startCountdown(element) {
      let seconds = parseInt(element.dataset.seconds);

      const [days, hours, minutes] = element.querySelectorAll(
        ".recommendations__card-countdown-item strong",
      );

      const updateCountdown = () => {
        seconds--;

        if (seconds < 0) {
          clearInterval(interval);

          days.textContent = "00";
          hours.textContent = "00";
          minutes.textContent = "00";

          return;
        }

        const timer = {
          days: Math.floor(seconds / (60 * 60 * 24)),
          hours: Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)),
          minutes: Math.floor((seconds % (60 * 60)) / 60),
        };

        days.textContent = timer.days.toString().padStart(2, "0");
        hours.textContent = timer.hours.toString().padStart(2, "0");
        minutes.textContent = timer.minutes.toString().padStart(2, "0");
      };

      updateCountdown();

      const interval = setInterval(updateCountdown, 1000);
    }

    Array.from(
      document.querySelectorAll(".recommendations__card-countdown-list"),
      (element) => {
        startCountdown(element);
      },
    );
  }

  //quantity
  // const changeInputText = (newval, inp, input) => {
  //   if (
  //     Number(newval) === 2 ||
  //     Number(newval) === 3 ||
  //     Number(newval) === 4 ||
  //     (Number(newval) > 21 &&
  //       !inp.value.endsWith("1") &&
  //       !inp.value.endsWith("5") &&
  //       !inp.value.endsWith("6") &&
  //       !inp.value.endsWith("7") &&
  //       !inp.value.endsWith("8") &&
  //       !inp.value.endsWith("9") &&
  //       !inp.value.endsWith("0"))
  //   ) {
  //     input.dataset.text = "штуки";
  //   } else if (inp.value.endsWith("1") && Number(newval) !== 11) {
  //     input.dataset.text = "штука";
  //   } else {
  //     input.dataset.text = "штук";
  //   }
  // };
  // const initQuantityInputs = () => {
  //   if (document.querySelectorAll(".quantity").length) {
  //     const min = 1;
  //     const step = 1;

  //     document.querySelectorAll(".quantity").forEach((input) => {
  //       const inp = input.querySelector("input");
  //       const btnminus = input.querySelector(".quantity__button_minus");
  //       const btnplus = input.querySelector(".quantity__button_plus");

  //       const qtyminus = (e) => {
  //         const current = Number(inp.value);
  //         let newval = current - step;

  //         if (newval < min) {
  //           newval = min;

  //           inp.closest(".recommendations__card._is-active") &&
  //             inp
  //               .closest(".recommendations__card._is-active")
  //               .classList.remove("_is-active");
  //         }

  //         inp.value = Number(newval);

  //         changeInputText(newval, inp, input);

  //         e.preventDefault();
  //       };

  //       const qtyplus = (e) => {
  //         const current = Number(inp.value);
  //         const newval = current + step;

  //         inp.value =
  //           Number(newval) > Number(inp.max) ? inp.max : Number(newval);

  //         changeInputText(newval, inp, input);

  //         e.preventDefault();
  //       };

  //       btnminus.addEventListener("click", qtyminus);
  //       btnplus.addEventListener("click", qtyplus);
  //     });
  //   }
  // };
  // initQuantityInputs();
});
