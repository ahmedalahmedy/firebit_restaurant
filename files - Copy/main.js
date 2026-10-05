/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

const setMenu = (open) => {
    navMenu.classList.toggle('show-menu', open)
    if (navToggle) navToggle.setAttribute('aria-expanded', String(open))
}

if (navMenu) {
    if (navToggle) navToggle.addEventListener('click', () => setMenu(true))
    if (navClose) navClose.addEventListener('click', () => setMenu(false))

    // Close with Escape key
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false) })

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show-menu') &&
            !navMenu.contains(e.target) && !navToggle.contains(e.target)) setMenu(false)
    })

    // Close the menu when a link is clicked
    document.querySelectorAll('.nav--link').forEach(l => l.addEventListener('click', () => setMenu(false)))

    // Reset the menu if the screen grows to desktop size
    window.matchMedia('(min-width: 1150px)').addEventListener('change', (e) => { if (e.matches) setMenu(false) })
}

/*=============== HEADER SHADOW + SCROLL UP + ACTIVE LINK ===============*/
const header = document.getElementById('header'),
      scrollUpBtn = document.getElementById('scroll-up'),
      sections = document.querySelectorAll('section[id]'),
      navLinks = document.querySelectorAll('.nav--link')

const onScroll = () => {
    const y = window.scrollY

    header.classList.toggle('scroll-header', y >= 50)
    scrollUpBtn.classList.toggle('show-scroll', y >= 350)

    let currentId = null
    sections.forEach((section) => {
        const top = section.offsetTop - 120
        if (y >= top && y < top + section.offsetHeight) currentId = section.id
    })
    navLinks.forEach((link) => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`)
    })
}

window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', onScroll)
window.addEventListener('load', onScroll)
onScroll()

/*=============== SCROLL REVEAL ANIMATION ===============*/
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (typeof ScrollReveal !== 'undefined' && !reduceMotion) {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500,
        delay: 300,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    })

    sr.reveal(`.home__title`, {delay: 600, origin: `top`})
    sr.reveal(`.home__fryinpan`, {delay: 600, rotate: {z: 60}})
    sr.reveal(`.home__rosemary-1`, {delay: 1200, origin: `right`, rotate: {z: -60}})
    sr.reveal(`.home__rosemary-2`, {delay: 1200, origin: `left`, rotate: {z: -60}})
    sr.reveal(`.home__tomato`, {delay: 1200, origin: `right`, rotate: {z: -60}})
    sr.reveal(`.home__spoon`, {delay: 1200, origin: `bottom`})
    sr.reveal(`.home__onion`, {delay: 1200, origin: `right`, rotate: {z: -60}})
    sr.reveal(`.home__pepper`, {delay: 1200, origin: `top`, distance: `120px`})
    sr.reveal(`.home__salt-1`, {delay: 1200, origin: `left`, distance: `120px`})
    sr.reveal(`.home__salt-2`, {delay: 1200, origin: `right`, distance: `120px`})

    sr.reveal(`.about--data > *`, {origin: 'top'})
    sr.reveal(`.about--flour`, {delay: 900})
    sr.reveal(`.about--rosemary`, {delay: 1200, origin: 'bottom'})

    sr.reveal(`.menu__header`)
    sr.reveal(`.menu__dish-1, .menu__dish-2, .menu__dish-3, .menu__dish-4`, {distance: '0', duration: 2000, rotate: {z: -30}})
    sr.reveal(`.menu__rosemary, .menu__flour-2, .menu__tomato, .menu__flour-4`, {delay: 600})
    sr.reveal(`.menu__flour-1, .menu__pepper, .menu__flour-3`, {delay: 900})
    sr.reveal(`.menu__info`, {delay: 600, origin: 'left'})

    sr.reveal(`.events__data > *`, {origin: 'top'})
    sr.reveal(`.events__flour`, {delay: 900})
    sr.reveal(`.events__spoon`, {delay: 1200, origin: 'bottom'})

    sr.reveal(`.ingredients__data`)
    sr.reveal(`.ingredients__images > img`, {delay: 1200, distance: '0', scale: 0.1})
    sr.reveal(`.ingredients__img-1`, {delay: 600, distance: '0', scale: 1.5})

    sr.reveal(`.contact__map`, {origin: 'left'})
    sr.reveal(`.contact__content`, {origin: 'right'})

    sr.reveal(`.reservation__content, .footer__container`)
}
