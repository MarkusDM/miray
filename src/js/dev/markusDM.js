import $ from 'jquery';


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


$('.card__retail-minus').click(function() {
  let $input = $(this).parent().find('.card__retail-quantity');
  let count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
});

$('.card__retail-plus').click(function() {
  let $input = $(this).parent().find('.card__retail-quantity');
  let count = parseInt($input.val()) + 1;
  count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
  $input.val(parseInt(count));
}); 


$('.card__retail-quantity').bind("change keyup input click", function() {
  if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
  }
  if (this.value == "") {
      this.value = 1;
  }
  if (this.value > parseInt($(this).data('max-count'))) {
      this.value = parseInt($(this).data('max-count'));
  }    
});   


