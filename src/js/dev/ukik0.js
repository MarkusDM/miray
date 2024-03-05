import $ from 'jquery';

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
    const parent = $(button).closest('.recommendations__card-group')

    $(button).on('click', function (event) {
        event.preventDefault();

        if ($(button).hasClass('--selected-value')) return;

        $(this).addClass('--selected');

        if ($(button).hasClass('--secondary')) {
            $(parent).find('.--primary').addClass('--selected-value')
        }
    });
});
