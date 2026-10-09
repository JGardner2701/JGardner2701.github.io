document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id], div[id="timeline-completed"], div[id="timeline-inprogress"]');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (
                        href === `#${id}` ||
                        (href === '#projects' && (id === 'timeline-completed' || id === 'timeline-inprogress'))
                    ) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
    });

    document.querySelectorAll('#home, #about, #projects').forEach(el => {
        if (el) observer.observe(el);
    });
});