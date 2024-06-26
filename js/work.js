document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('categoryFilter');
    const artworkItems = Array.from(document.querySelectorAll('.artwork-item'));

    categoryFilter.addEventListener('change', filterAndSort);
    
    function filterAndSort() {
        const category = categoryFilter.value;
        let filteredItems = artworkItems;

        if(category !== 'all') {
            filteredItems = artworkItems.filter(item => item.dataset.category.split(' ').includes(category));
        }

        const artworkContainer = document.querySelector('.artwork');
        artworkContainer.innerHTML = '';

        if(filteredItems.length === 0){
            document.getElementById('no-results-message').classList.remove('hidden');
        } else {
            document.getElementById('no-results-message').classList.add('hidden');
            filteredItems.forEach(item => {
                artworkContainer.appendChild(item);
            });
        }
    }    

    filterAndSort();

});