import noUiSlider from 'nouislider';

export const rangeSlider = document.querySelector('.range-slider');
document.addEventListener('DOMContentLoaded', () => {
    const inputFrom = document.getElementById('from');
    const inputTo = document.getElementById('to');
    const attributeValuesRange = [];
    if (rangeSlider) {
        const startValue = Math.floor(parseInt(inputFrom.dataset.startNumber, 10));
        const endValue =  Math.ceil(parseInt(inputTo.dataset.endNumber, 10));
        attributeValuesRange.push(startValue, endValue);
        nouislider.create(rangeSlider, {
            range: {
                min: Math.floor(Number(inputFrom.dataset.fromMin)),
                max:  Math.ceil(Number(inputTo.dataset.toMax))
            },
            step: 1,
            start: attributeValuesRange,
            connect: true,
            format: {
                to: function (value) {
                    return Math.round(value).toLocaleString('ru-RU') + '₽';
                },
                from: function (value) {
                    return value.replace('₽', '').replace(/\s/g, '');
                }
            }
        });
        const inputs = [inputFrom, inputTo];
        rangeSlider.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = values[handle];

        });
        rangeSlider.noUiSlider.on('set', (values, handle) => {
            const event = new Event('input', { bubbles: true });
            inputs[handle].dispatchEvent(event);
        });
        inputs.forEach((input, index) => {
            input.addEventListener('click', () => {
                input.value = "";
            });

            input.addEventListener('change', event => {
                const value = event.currentTarget.value.replace('₽', '').replace(/\s/g, '');
                const range = [null, null];
                range[index] = value;
                rangeSlider.noUiSlider.set(range);
            });
        });
        const attributeChangeCallback = function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && (mutation.attributeName === 'data-from-min' || mutation.attributeName === 'data-to-max')) {
                    const newValue = mutation.target.getAttribute(mutation.attributeName);
                    const parsedValue = Number(newValue);
                    if (mutation.attributeName === 'data-from-min') {
                        rangeSlider.noUiSlider.set([parsedValue, rangeSlider.noUiSlider.get()[1]],true, true);
                        rangeSlider.noUiSlider.updateOptions({
                            range: {
                                'min': parsedValue,
                                'max': Number(inputTo.dataset.toMax)
                            }
                        });
                    } else if (mutation.attributeName === 'data-to-max') {
                        rangeSlider.noUiSlider.set([rangeSlider.noUiSlider.get()[0], parsedValue],true, true);
                        rangeSlider.noUiSlider.updateOptions({
                            range: {
                                'min': Number(inputFrom.dataset.fromMin),
                                'max': parsedValue
                            }
                        });
                    }
                }
            }
        };
        const observer = new MutationObserver(attributeChangeCallback);
        observer.observe(inputFrom, { attributes: true });
        observer.observe(inputTo, { attributes: true });
    }
});