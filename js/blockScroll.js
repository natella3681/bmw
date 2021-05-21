const disabledScroll = () => {
    document.body.dataset.scrollY = window.scrollY;

    const scrollWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.cssText = `
        overflow:hidden;
        position:fixed;
        top: -${window.scrollY}px;
        left:0;
        width:100%;
        height:100vh;
        padding-right: ${scrollWidth}px;
    `;
};

const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dataset.scrollY
    });
};