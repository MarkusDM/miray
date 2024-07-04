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

      $card.find('.input-sum-minus').click(function() {
          let count = parseInt($input.val()) - 1;
          count = count < 1 ? 1 : count;
          updateInputValue(count);
      });

      $card.find('.input-sum-plus').click(function() {
          let count = parseInt($input.val()) + 1;
          count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
          updateInputValue(count);
      });

      $input.bind("change keyup input click", function() {
          this.value = this.value.replace(/[^0-9]/g, '');
          if (this.value === "") {
              this.value = 1;
          }
          let count = parseInt(this.value);
          if (count < 1) {
              count = 1;
          }
          if (count > parseInt($input.data('max-count'))) {
              count = parseInt($input.data('max-count'));
          }
          updateInputValue(count);
      });

      // Initialize input values
      let count = parseInt($input.val());
      updateInputValue(count);
  });
});

tippy('[data-tippy-content]', {
  arrow: roundArrow,
  
});

tippy('[data-tippy-content-bottom]', {
  arrow: roundArrow,
  placement: 'bottom',
  
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
      $('.has-hover-modal-card').hover(function() {
        $('.card-modal').toggleClass('active');
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

$(document).on('mouseup', function(e){
  let s = $('.card-modal.active'); 
  if(!s.is(e.target) && s.has(e.target).length === 0) {
  
    s.removeClass('active');
  }
});

$('.card-modal__close').click(function() {
  $('.card-modal').removeClass('active');
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


$(document).ready(function() {
  const minValue = 1;

  $('.card__calc').each(function() {
      const $calculator = $(this);

      $calculator.find('.card__calc-plus').click(function() {
          let currentValue = parseInt($calculator.find('.card__calc-input').val());
          $calculator.find('.card__calc-input').val(currentValue + 1);
      });

      $calculator.find('.card__calc-minus').click(function() {
          let currentValue = parseInt($calculator.find('.card__calc-input').val());
          if (currentValue > minValue) {
              $calculator.find('.card__calc-input').val(currentValue - 1);
          }
      });
  });
});

$('.card__swiper-slide-like').on('click', function() {
  $(this).toggleClass('active');
});
