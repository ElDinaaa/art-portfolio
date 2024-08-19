document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('view-more-btn');
    const galleryContainer = document.querySelector('.gallery-container');
    const gallery = document.getElementById('gallery');
    let page = 1; // Номер текущей страницы
    const itemsPerPage = 6; // Количество элементов на странице
    const heightIncrement = 1854;

    // Определяем текущий язык на основе атрибута, установленного на странице
    const language = document.documentElement.lang || 'en'; // Например, 'en' или 'ru'

    // Загружаем соответствующий JSON файл в зависимости от языка
    const jsonFile = language === 'ru' ? '/json/ru/images.json' : '/json/en/images.json';

    fetch(jsonFile)
        .then(response => response.json())
        .then(images => {
            // После загрузки данных, продолжить выполнение

        loadMoreBtn.addEventListener('click', () => {
            loadMoreContent(images, page);
            page++;
            increaseGalleryContainerHeight();
        });

        function loadMoreContent(images, page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itemsToLoad = images.slice(startIndex, endIndex);

            itemsToLoad.forEach((image, index) => {
                const newItem = document.createElement('li');
                const itemIndex = startIndex + index + 7;
                newItem.className = `gallery-item item-${itemIndex}`;
                newItem.innerHTML = `
                    <img src="/images/${image.src}" alt="${image.title}" data-description="${image.description}" data-second-description="${image.secondDescription}" data-title="${image.title}" data-material="${image.material}">
                    <h3 class="image-title">${image.title}</h3>
                    <p class="image-material">${image.material}</p>`;
                gallery.appendChild(newItem);
            });

            // Перемещаем кнопку вниз после добавления новых элементов
            const lastItem = gallery.querySelector(`.item-${startIndex + itemsPerPage}`);
            const lastItemOffsetTop = lastItem.offsetTop + lastItem.offsetHeight;
            loadMoreBtn.style.marginTop = `${lastItemOffsetTop + 20}px`;

            // Если все изображения загружены, скрыть кнопку
            if (endIndex >= images.length) {
                loadMoreBtn.style.display = 'none';
            }
        }

        function increaseGalleryContainerHeight() {
            let currentHeight = galleryContainer.offsetHeight;
            let newHeight = currentHeight + heightIncrement;
            galleryContainer.style.height = `${newHeight - 40}px`;
        }

        // Устанавливаем начальную высоту для galleryContainer
        galleryContainer.style.height = `${heightIncrement}px`;

        // Создаем и добавляем модальное окно в DOM
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        document.body.appendChild(overlay);

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'none';  // Изначально скрываем модальное окно
        modal.innerHTML = `
            <div class="modal-content">
                <div class="rectangle">
                    <img src="" alt="">
                    <div class="text-container">
                        <h3 class="modal-title"></h3>
                        <br>
                        <p class="modal-description"></p>
                    </div>
                    <div class="rectangle-material">
                        <p class="modal-material"></p>
                    </div>
                    <div class="line-element"></div> <!-- Новая линия -->
                        <div class="vertical-line-element"></div> <!-- Новая вертикальная линия -->
                        <div class="new-rectangle">
                        <p class="second-description"></p> <!-- Второе описание картины -->
                        <button class="order-now-btn">
                            <span class="star-icon"></span>
                            Order now
                            <span class="star-icon"></span>
                        </button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('.modal-content img');
        const modalTitle = modal.querySelector('.modal-title');
        const modalMedium = modal.querySelector('.modal-material');
        const modalDescription = modal.querySelector('.modal-description');
        const modalSecondDescription = modal.querySelector('.second-description');

        // Показ модального окна по клику на изображение
        gallery.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                e.stopPropagation();

                const imgElement = e.target;

                // Установка координат для модального окна
                const rect = imgElement.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                modal.style.top = `${rect.top + scrollTop - 150}px`;

                modal.style.display = 'flex'; // Показываем модальное окно
                overlay.style.display = 'block'; // Показываем затемнение

            // Извлечение данных из атрибутов data-*
            modalImg.src = imgElement.src;
            modalTitle.textContent = imgElement.dataset.title;
            modalMedium.textContent = imgElement.dataset.material;
            modalDescription.textContent = imgElement.dataset.description;
            modalSecondDescription.textContent = imgElement.dataset.secondDescription;
            }
        });

        // Закрытие модального окна при клике вне его
        window.addEventListener('click', (e) => {
            if (modal.style.display === 'flex' && !modal.querySelector('.modal-content').contains(e.target)) {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            }
        });

        // Обработчик для кнопки "ORDER NOW"
        const orderNowBtn = modal.querySelector('.order-now-btn');
        orderNowBtn.addEventListener('click', () => {
            window.location.href = '/en/contact'; // Переход на страницу "CONTACT"
        });
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
});