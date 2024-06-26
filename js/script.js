document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.getElementById('nav-links');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('is-active');
        closeMenu.classList.toggle('is-active');

        if(navLinks.classList.contains('active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    closeMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    //animation for header and navigation on page load

    const header = document.querySelector('.overlay h1');
    const navItems = document.querySelectorAll('.navigation a, nav ul#nav-links li a');

    if(header) {
        header.style.opacity = 0;
    }
    navItems.forEach(link => link.style.opacity = 0);

    setTimeout(() => {
        if(header){
            header.style.transition = 'opacity 1s';
            header.style.opacity = 1;
        }    
        navItems.forEach((link, index) => {
            link.style.transition = 'opasity 1s ${index * 0.2}s';
            link.style.opacity = 1;
        });
    }, 100);

    //smooth scroll for navigation links

    document.querySelectorAll('.navigation a, nav ul#nav-links li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href.startsWith('#')){
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

               if(targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop,
                      behavior: 'smooth'       
                    });
                }
            }        
        });
    });

    // modal window for images

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeModal = document.getElementById("closeModal");

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;
            const nextSiblingH2 = img.nextElementSibling?.querySelector('h2');
            if(nextSiblingH2) {
                captionText.innerHTML = nextSiblingH2.innerHTML;
            } else {
                captionText.innerHTML = img.alt;
            }
            document.body.classList.add('no-scroll');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.classList.remove('no-scroll');
    });

    window.addEventListener('click', (event) => {
        if(event.target == modal) {
            modal.style.display = "none";
            document.body.classList.remove('no-scroll');
        }
    });

    //adding share button 
    const shareText = document.getElementById('share-text');
    const shareMenu = document.querySelector('.share-menu');

    if (shareText && shareMenu) {
        console.log("Share elements found in DOM.");

    shareText.addEventListener('click', (event) => {
        event.stopPropagation();
        shareMenu.classList.toggle('active');
        console.log("Share button clicked, menu toggled.");
    });

    document.addEventListener('click', (event) => {
        if (!shareMenu.contains(event.target) && event.target !== shareText) {
            shareMenu.classList.remove('active');
            console.log("Clicked outside the share menu, menu hidden.");
        }
    });
    } else {
    console.log("Share elements not found in DOM.");
    }

    function shareToFacebook() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL), 'Share to Facebook', 'width=600,height=400');
    }

    function shareToInstagram() {
        window.open('https://www.instagram.com', 'Share to Instagram', 'width=600,height=400');
    }

    function shareToTwitter() {
        window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(document.URL) + '&text=' + encodeURIComponent(document.title), 'Share to Twitter', 'width=600,height=400');
    }

    function shareToPinterest() {
        window.open('https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL), 'Share to Pinterest', 'width=600,height=400');
    }

    window.shareToFacebook = shareToFacebook;
    window.shareToInstagram = shareToInstagram;
    window.shareToTwitter = shareToTwitter;
    window.shareToPinterest = shareToPinterest;

});