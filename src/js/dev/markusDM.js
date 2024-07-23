import $ from 'jquery';
import tippy from 'tippy.js';
import {roundArrow} from 'tippy.js';

export const rem = function (rem) {
  if ($(window).width() > 768) {
    return 0.005208335 * $(window).width() * rem;
  } else {
    return (100 / 390) * (0.1 * $(window).width()) * rem;
  }
};


$('.card__description-tabs-item').click(function () {
  var id = $(this).attr('data-tab'),
    content = $('.card__description-text[data-tab="' + id + '"]');

  $('.card__description-tabs-item.active').removeClass('active'); // 1
  $(this).addClass('active'); // 2

  $('.card__description-text.active').removeClass('active'); // 3
  content.addClass('active'); // 4
});


function updateInputValue($input, count) {
  $input.val(count + ' штук');
}

$(document).ready(function() {
  $('.calc-global').each(function() {
      const $card = $(this);
      const $input = $card.find('.input-sum');
      
      function updateInputValue(count) {
          $input.val(count + ' штук');
      }

      function parseInputValue(value) {
          return parseInt(value.replace(/[^0-9]/g, ''), 10) || 1;
      }

      $card.find('.input-sum-minus').click(function() {
          let count = parseInputValue($input.val()) - 1;
          count = count < 1 ? 1 : count;
          updateInputValue(count);
      });

      $card.find('.input-sum-plus').click(function() {
          let count = parseInputValue($input.val()) + 1;
          count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
          updateInputValue(count);
      });

      $input.bind("change keyup input click", function() {
          let value = parseInputValue($input.val());
          let maxCount = parseInt($input.data('max-count'), 10);
          if (value < 1) {
              value = 1;
          } else if (value > maxCount) {
              value = maxCount;
          }
          updateInputValue(value);
      });

      // Initialize input values
      let count = parseInputValue($input.val());
      updateInputValue(count);
  });
});


// Инициализация tippy для элементов на странице
function initializeTippy() {
  tippy('[data-tippy-content]', {
    arrow: roundArrow,
  });

  tippy('[data-tippy-content-bottom]', {
    arrow: roundArrow,
    placement: 'bottom',
  });
}

// Запуск инициализации
initializeTippy();

// Используйте MutationObserver для отслеживания изменений в DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    initializeTippy(); // Переинициализируем tippy при каждом изменении
  });
});

// Настройка наблюдателя
observer.observe(document.body, {
  childList: true,
  subtree: true,
});



$('.modal-profile-open').click(function() {
  $('.modal-profile').addClass('active');
});

$('.modal-profile__close').click(function() {
  $('.modal-profile').removeClass('active');
});


$('.modal-global-email-open').click(function() {
  $('.modal-global-email').addClass('active');
});



$('.modal-global-phone-open').click(function() {
  $('.modal-global-email').addClass('active');
});


$('.modal-global__close').click(function() {
  $('.modal-global-email').removeClass('active');
  $('.modal-global-phone').removeClass('active');
});



$(document).ready(function() {
  // Устанавливаем минимальную ширину для десктопной версии
  const desktopMinWidth = 768;

  // Функция для проверки ширины окна и установки обработчика событий
  function handleHover() {
    if (window.innerWidth >= desktopMinWidth) {
      // Добавляем обработчик hover для десктопной версии
      $('.has-hover-modal-card').mouseenter(function() {
        $('.card-modal').fadeIn();
      });
    } else {
      // Удаляем обработчик hover для мобильной версии
      $('.has-hover-modal-card').off('hover');
    }
  }

  // Выполняем проверку при загрузке страницы
  handleHover();

  // Выполняем проверку при изменении размера окна
  $(window).resize(handleHover);
});


// $('.card-modal__close').click(function() {
//   $('.card-modal').removeClass('active');
// });

// $(document).on('mouseup', function(e){
//   let s = $('.card-modal.active'); 
//   if(!s.is(e.target) && s.has(e.target).length === 0) {
  
//     s.removeClass('active');
//   }
// });

$('.card-modal__close').click(function() {
  $('.card-modal').hide();
});

$('.pagination').each(function () {
  let more = $(this).find('.pagination__dots');
  let hide = $(this).find('.pagination__input');
  hide.hide(300);
  more.click(function () {
      hide.toggleClass('active');
      more.toggleClass('active');
  });
});

$(document).on('mouseup', function(e){
  let s = $('.pagination__input.active'); 
  if(!s.is(e.target) && s.has(e.target).length === 0) {
  
    s.removeClass('active');
  }
});

$(document).ready(function() {
  const minValue = 1;

  $('#increase').click(function() {
      let currentValue = parseInt($('#number').val());
      $('#number').val(currentValue + 1);
  });

  $('#decrease').click(function() {
      let currentValue = parseInt($('#number').val());
      if (currentValue > minValue) {
          $('#number').val(currentValue - 1);
      }
  });
});


document.addEventListener('click', function (event) {
  if (event.target && event.target.closest('.recommendations__card-calc-minus.input-sum-minus')){
      let button = event.target.closest('.recommendations__card-calc-minus.input-sum-minus');
      let input = button.nextElementSibling;
      if (input && input.name === 'count-items') {
          if (input.value >= 1) {//Получить значение инпута, у тебя видел функция там есть                    
              input.value--;//Отнимаем
              if(input.value==0){
                  let mainbutton = event.target.closest('.recommendations__card-calc.calc-global');
                  mainbutton.previousElementSibling.style.display = "flex";
                  mainbutton.style.display = "none";
              }  //Если 0 то скрываем, у тебя лок стоит на мин велью, не могу полвиять
          }
      }
  }else if (event.target && event.target.closest('.recommendations__card-calc-plus.input-sum-plus')){
      let button = event.target.closest('.recommendations__card-calc-plus.input-sum-plus');
      let input = button.previousElementSibling;
      if (input && input.name === 'count-items') {
          if (input.value >= 1) {
              let dataId = input.getAttribute('data-id');
              let type = 'add';
              addToBasket(dataId, type, '');
              input.value++;
          }
      }
  }else if (event.target && event.target.closest('.recommendations__card-calc-box')){
      let button = event.target.closest('.recommendations__card-calc-box');
      let input = button.previousElementSibling;
      if (input && input.name === 'count-items') {
          if (input.value >= 1) {
              let dataId = input.getAttribute('data-id');
              let type = 'add_corob';
              addToBasket(dataId, type, 'corob');
              input.value+=input.getAttribute('data-corob');
          }
      }
  }
});


$('.card__swiper-slide-like').on('click', function() {
  $(this).toggleClass('active');
});
