// ------------------------------------
        // Scroll Reveal Animation
        // ------------------------------------

        const revealElements =
            document.querySelectorAll(".reveal");

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });


        // ------------------------------------
        // Animated Skill Bars
        // ------------------------------------

        const skillBars =
            document.querySelectorAll(".skill-fill");

        const skillObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const width =
                                entry.target.dataset.width;

                            entry.target.style.width = width;

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });


        // ------------------------------------
        // Smooth navigation
        // ------------------------------------

        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        ).forEach(link => {

            link.addEventListener("click", function(e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });

        
/* =========================
   CERTIFICATES SLIDER
   RTL SAFE VERSION
========================= */

const certificateTrack =
    document.querySelector('.certificates-track');

const certificateCards =
    Array.from(
        document.querySelectorAll('.certificate-card')
    );

const prevCertificate =
    document.querySelector('.certificate-prev');

const nextCertificate =
    document.querySelector('.certificate-next');

const dotsContainer =
    document.querySelector('.certificate-dots');


if (
    certificateTrack &&
    certificateCards.length
) {

    /* =========================
       CREATE DOTS
    ========================= */

    certificateCards.forEach(
        (card, index) => {

            const dot =
                document.createElement('button');

            dot.type = 'button';

            dot.className =
                'certificate-dot';

            dot.setAttribute(
                'aria-label',
                `رفتن به مدرک ${index + 1}`
            );

            dot.addEventListener(
                'click',
                () => {

                    goToCertificate(index);

                }
            );

            dotsContainer.appendChild(dot);

        }
    );


    const dots =
        Array.from(
            document.querySelectorAll(
                '.certificate-dot'
            )
        );


    /* =========================
       GO TO SLIDE
    ========================= */

    function goToCertificate(index) {

        if (
            index < 0 ||
            index >= certificateCards.length
        ) {
            return;
        }


        const card =
            certificateCards[index];


        /*
         * Instead of scrollBy(),
         * use scrollIntoView().
         *
         * This avoids RTL scrollLeft
         * problems.
         */

        card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });


        updateActiveDot(index);

    }


    /* =========================
       ACTIVE DOT
    ========================= */

    function updateActiveDot(index) {

        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    'active',
                    dotIndex === index
                );

            }
        );

    }


    /* =========================
       FIND CURRENT SLIDE
    ========================= */

    function getCurrentCertificate() {

        const trackRect =
            certificateTrack.getBoundingClientRect();


        const trackCenter =
            trackRect.left +
            trackRect.width / 2;


        let closestIndex = 0;

        let closestDistance =
            Infinity;


        certificateCards.forEach(
            (card, index) => {

                const rect =
                    card.getBoundingClientRect();


                const cardCenter =
                    rect.left +
                    rect.width / 2;


                const distance =
                    Math.abs(
                        trackCenter -
                        cardCenter
                    );


                if (
                    distance <
                    closestDistance
                ) {

                    closestDistance =
                        distance;

                    closestIndex =
                        index;

                }

            }
        );


        return closestIndex;

    }


    /* =========================
       NEXT BUTTON
       → RIGHT
    ========================= */

    nextCertificate.addEventListener(
        'click',
        () => {

            const current =
                getCurrentCertificate();

            const next =
                Math.min(
                    current + 1,
                    certificateCards.length - 1
                );

            goToCertificate(next);

        }
    );


    /* =========================
       PREVIOUS BUTTON
       ← LEFT
    ========================= */

    prevCertificate.addEventListener(
        'click',
        () => {

            const current =
                getCurrentCertificate();

            const previous =
                Math.max(
                    current - 1,
                    0
                );

            goToCertificate(previous);

        }
    );


    /* =========================
       UPDATE DOTS ON SCROLL
    ========================= */

    let scrollTimer;

    certificateTrack.addEventListener(
        'scroll',
        () => {

            clearTimeout(scrollTimer);


            scrollTimer =
                setTimeout(
                    () => {

                        const current =
                            getCurrentCertificate();

                        updateActiveDot(
                            current
                        );

                    },
                    80
                );

        }
    );


    /* =========================
       INITIAL STATE
    ========================= */

    updateActiveDot(0);


    /* =========================
       KEYBOARD SUPPORT
    ========================= */

    document.addEventListener(
        'keydown',
        event => {

            /*
             * Only when modal isn't open
             */

            const modal =
                document.getElementById(
                    'certificateModal'
                );


            if (
                modal &&
                modal.classList.contains(
                    'active'
                )
            ) {
                return;
            }


            if (
                event.key === 'ArrowLeft'
            ) {

                const current =
                    getCurrentCertificate();

                goToCertificate(
                    Math.max(
                        current - 1,
                        0
                    )
                );

            }


            if (
                event.key === 'ArrowRight'
            ) {

                const current =
                    getCurrentCertificate();

                goToCertificate(
                    Math.min(
                        current + 1,
                        certificateCards.length - 1
                    )
                );

            }

        }
    );

}



const hamburger =
    document.getElementById("hamburger");

const navMenu =
    document.getElementById("navMenu");


hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navMenu.classList.toggle("active");

});


document
    .querySelectorAll(".nav-menu .nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");

            navMenu.classList.remove("active");

        });

    });

    document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedHamburger =
        hamburger.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedHamburger
    ) {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    }

});