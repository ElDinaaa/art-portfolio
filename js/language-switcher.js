document.addEventListener('DOMContentLoaded', () => {
    const langEn = document.getElementById('lang-en');
    const langRu = document.getElementById('lang-ru');

    langEn.addEventListener('click', () => {
        changeLanguage('en');
    });

    langRu.addEventListener('click', () => {
        changeLanguage('ru');
    });

    function changeLanguage(lang) {
        if (lang === 'en') {
            window.location.href = window.location.href.replace('/ru/', '/en/');
        } else if (lang === 'ru') {
            window.location.href = window.location.href.replace('/en/', '/ru/');
        }
    }
});