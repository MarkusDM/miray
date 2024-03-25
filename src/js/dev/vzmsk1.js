import {removeClasses} from "../utils/utils";


document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('.option-item__radio-btn input').length) {
        const btns = document.querySelectorAll('.option-item__radio-btn input')
    const input = document.querySelector('.companies-delivery-checkout__input')

        const setClass = (btn) => {
            if (btn.checked) {
                removeClasses(btn.closest('section').querySelectorAll('.option-item'), '_is-active')
                btn.closest('.option-item').classList.add('_is-active')

                if (btn.closest('.option-item__radio-btn_other')) {
                    input ? input.classList.add('_is-visible') : null
                } else {
                    input ? input.classList.remove('_is-visible') : null
                }
            }
        }

        btns.forEach(btn => {
            btn.addEventListener('input', function () {
                setClass(btn)
            })
            setClass(btn)
        })
    }

    if (document.querySelector('.data-checkout .input_file-input')) {
        const input = document.querySelector('.data-checkout .input_file-input input')
        const placeholder = input.parentElement.querySelector('.input__placeholder')
        const requiredFields = input.closest('.data-checkout__fields').querySelectorAll('[data-validate]')
        const reader = new FileReader();
        const placeholderData = placeholder.innerHTML

        const readFile = (file) => {
            reader.onload = readSuccess;
            function readSuccess(e) {
                if (file) {
                    console.log(file)
                    const data = {
                        // name: file.name.split('.').slice(0, -1).join(''),
                        name: file.name,
                        size: file.size,
                        extension: file.name.split('.').pop()
                    };
                    const extensions = ['jpeg', 'jpg', 'png', 'webp', 'pdf'];

                    const formatBytes = (bytes) => {
                        if (bytes >= 1000) {
                            return `${(bytes / 1048576).toFixed(2)} mб`;
                        }
                        return `${bytes} б`;
                    };
                    const addErr = () => {
                        // parent.classList.add('_error');
                        // parent.classList.remove('_filled');
                        // ths.addError(formRequiredItem);
                    };
                    placeholder ? (placeholder.innerHTML = data.name) : placeholder.innerHTML = placeholderData;

                    // if ((data.size / 1048576).toFixed(2) > maxSize) {
                    //     text.innerHTML = 'Большой размер файла';
                    //     addErr();
                    // } else if (!extensions.includes(data.extension)) {
                    //     text.innerHTML = ' Файл должен иметь формат jpeg,jpg,png,webp, или pdf';
                    //     addErr();
                    // } else {
                    //     parent.classList.remove('_error');
                    //     parent.classList.add('_filled');
                    //     ths.removeError(formRequiredItem);
                    // }

                    // if (removeBtn) {
                    //     removeBtn.addEventListener('click', function () {
                    //         parent.classList.remove('_error');
                    //         parent.classList.remove('_filled');
                    //         formRequiredItem.value = '';
                    // ths.removeError(formRequiredItem);
                    //     });
                    // }
                }
            }

            if (file) reader.readAsDataURL(file);

        }

        input.addEventListener('change', function (e) {
            readFile(e.srcElement.files[0])
        })
    }
})