class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="header-container">
            <div class="logo">
                <a href="/en/index">Mubarik Elmurzaeva</a>
            </div>
            <nav class="navigation">
                <ul>
                    <li><a href="/en/work">Portfolio</a></li>
                    <li><a href="/en/about">About me</a></li>
                    <li><a href="/en/contact">Contact</a></li>
                </ul>
            </nav>
            <div class="language-switcher">
                <a href="/en/index" id="lang-en">en</a> | <a href="/ru/index" id="lang-ru">ru</a>
            </div>
        </div>
        <div class="header-line"></div>`;
        this.highlightActiveLink();
    }

    highlightActiveLink() {
        const links = this.querySelectorAll('.navigation a');
        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('special-header', SpecialHeader);

class SpecialHeaderRU extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="header-container">
            <div class="logo">
                <a href="/ru/index">Mubarik Elmurzaeva</a>
            </div>
            <nav class="navigation">
                <ul>
                    <li><a href="/ru/work">Портфолио</a></li>
                    <li><a href="/ru/about">Обо мне</a></li>
                    <li><a href="/ru/contact">Контакты</a></li>
                </ul>
            </nav>
            <div class="language-switcher">
                <a href="/en/index" id="lang-en">en</a> | <a href="/ru/index" id="lang-ru">ru</a>
            </div>
        </div>
        <div class="header-line"></div>`;
        this.highlightActiveLink();
    }

    highlightActiveLink() {
        const links = this.querySelectorAll('.navigation a');
        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('special-header-ru', SpecialHeaderRU);

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="footer-container">
            <div class="footer-line"></div>
            <div class="social-icons">
                <a href="https://www.facebook.com/yourpage" target="_blank">
                    <img src="/images/facebook.svg" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/yourpage" target="_blank">
                    <img src="/images/instagram.svg" alt="Instagram">
                </a>
                <a href="https://www.whatsapp.com/yourpage" target="_blank">
                    <img src="/images/whatsapp.svg" alt="Twitter">
                </a>
            </div>
        </div>`;
    }
}

customElements.define('special-footer', SpecialFooter);