// FAQ Toggle
document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
        const item = this.parentElement;
        item.classList.toggle('open');
    });
});

// Fade-in Animation
if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });
} else {
    document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('visible');
    });
}

// Carousel Navigation
const carousel = document.getElementById('carousel');
if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const cardWidth = 320; // 300px card + 20px gap

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', function () {
            track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
        });
    }

    // Auto-scroll (optional)
    let autoScroll;
    function startAutoScroll() {
        autoScroll = setInterval(function () {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 4000);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Pause on touch
    track.addEventListener('touchstart', stopAutoScroll, { passive: true });
    track.addEventListener('touchend', function () {
        setTimeout(startAutoScroll, 5000);
    });
}

// Track CTA clicks (optional: add your analytics here)
document.querySelectorAll('.cta-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        // Facebook Pixel Lead Event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Programa Aceleracao A Virada',
                value: 3697.00,
                currency: 'BRL'
            });
        }
    });
});
