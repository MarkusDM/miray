import noUiSlider from 'nouislider';

export const rangeSlider = document.querySelector('.range-slider');
document.addEventListener('DOMContentLoaded', () => {

    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            range: {
                min: 20000,
                max: 850000
            },
            step: 1,
            start: [20000, 550000],
            connect: true
        });

        const inputFrom = document.getElementById('from');
        const inputTo = document.getElementById('to');

        const inputs = [inputFrom, inputTo];

        rangeSlider.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = Math.round(values[handle]);
        });

        inputs.forEach((input, index) => {
            input.addEventListener('change', (event) => {
                const range = [null, null];
                range[index] = event.currentTarget.value;

                rangeSlider.noUiSlider.set(range);
            });
        });
    }
})