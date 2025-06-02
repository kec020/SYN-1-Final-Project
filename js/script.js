let latestScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    latestScrollY = window.scrollY;
    requestTick();
});

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
    }
}

function update() {
    const scrollTop = latestScrollY;
    const viewportHeight = window.innerHeight;
    const progress = Math.min(scrollTop / (3 * viewportHeight), 1);

    const frame1 = document.querySelector('.frame-1 img');
    const frame2 = document.querySelector('.frame-2 img');
    const frame3 = document.querySelector('.frame-3 img');

    // Parallax effect (move upwards)
    frame1.style.transform = `translateY(${-scrollTop * 0.05}px)`;
    frame2.style.transform = `translateY(${-scrollTop * 0.07}px)`;
    frame3.style.transform = `translateY(${-scrollTop * 0.1}px)`;

    // Frame 1 fade out during first 1/3 viewportHeight
    if (scrollTop < viewportHeight / 3) {
        const ratio = scrollTop / (viewportHeight / 3);
        frame1.style.opacity = 1 - ratio;
        frame2.style.opacity = ratio;
        frame3.style.opacity = 0;
    } 
    // Frame 2 active after frame 1 fades
    else if (scrollTop < viewportHeight * (1 + 1/3)) {
        const ratio = (scrollTop - viewportHeight / 3) / (viewportHeight * (1/3));
        frame1.style.opacity = 0;
        frame2.style.opacity = 1 - ratio;
        frame3.style.opacity = ratio;
    } 
    // Frame 3 fully visible after
    else {
        frame1.style.opacity = 0;
        frame2.style.opacity = 0;
        frame3.style.opacity = 1;
    }

    ticking = false;
}

