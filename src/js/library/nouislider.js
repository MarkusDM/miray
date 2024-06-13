import noUiSlider from 'nouislider';

export const rangeSlider = document.querySelector('.range-slider');
document.addEventListener('DOMContentLoaded', () => {

    const inputFrom = document.getElementById('from');
    const inputTo = document.getElementById('to');
    const elementsStart = document.querySelector('[data-value-start]');
    const elementsEnd = document.querySelector('[data-value-end]');
    const attributeValuesRange = []; 

    if (rangeSlider) {
        console.log(typeof inputFrom.dataset.fromMin);
        console.log(typeof inputTo.dataset.toMax);
        console.log(typeof inputFrom.dataset.startNumber);
        console.log(typeof inputTo.dataset.endNumber);

        const startValue = parseInt(inputFrom.dataset.startNumber, 10);
        const endValue = parseInt(inputTo.dataset.endNumber, 10);
        attributeValuesRange.push(startValue, endValue);

        noUiSlider.create(rangeSlider, {
            range: {
                min: Number(inputFrom.dataset.fromMin),
                max: Number(inputTo.dataset.toMax)
            },
            step: 1,
            start: attributeValuesRange,
            connect: true,
            format: {
                to: function (value) {
                    return Math.round(value).toLocaleString('ru-RU') + '₽';
                },
                from: function (value) {
                    return value.replace(' ₽', '').replace(/\s/g, '');
                }
            }
        });

        const inputs = [inputFrom, inputTo];

        rangeSlider.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = values[handle];
        });

        inputs.forEach((input, index) => {
            input.addEventListener('click', () => {
                input.value = "";
            });
            input.addEventListener('change', (event) => {
                const value = event.currentTarget.value.replace('₽', '').replace(/\s/g, '');
                const range = [null, null];
                range[index] = value;

                rangeSlider.noUiSlider.set(range);
            });
        });
    }
});