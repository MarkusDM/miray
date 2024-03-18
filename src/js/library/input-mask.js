import Inputmask from 'inputmask';

export const initInputMask = () => {
    const maskElements = document.querySelectorAll('[data-tel-mask]');

    if (maskElements.length) {
        maskElements.forEach((maskElement) => {
            Inputmask({ mask: '+7 (999) 999-9999', showMaskOnHover: false, jitMasking: true }).mask(
                maskElement
            );
        });
    }
};

initInputMask();
