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
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false) })
}

/*=============== CURRENT LANGUAGE (set early by the <head> script) ===============*/
let currentLang = document.documentElement.lang === 'ar' ? 'ar' : 'en'

const THEME_LABEL = {
    en: { dark: 'Switch to light mode', light: 'Switch to dark mode' },
    ar: { dark: 'التبديل إلى الوضع الفاتح', light: 'التبديل إلى الوضع الداكن' }
}

/*=============== DARK / LIGHT THEME ===============*/
const themeBtn = document.getElementById('theme-toggle'),
      root = document.documentElement

const setTheme = (theme, save) => {
    root.setAttribute('data-theme', theme)
    if (themeBtn) {
        themeBtn.querySelector('i').className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'
        themeBtn.setAttribute('aria-label', THEME_LABEL[currentLang][theme])
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#141414' : '#f6f3ee')
    if (save) { try { localStorage.setItem('theme', theme) } catch (e) {} }
}

setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false)
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true)
    })
}

/*=============== LANGUAGE (EN / AR) ===============*/
/* English text is read straight from the page; only Arabic lives here. */
const AR = {
    'brand': 'فاير بيت',

    'nav.home': 'الرئيسية', 'nav.about': 'من نحن', 'nav.menu': 'المنيو', 'nav.events': 'الفعاليات',
    'nav.ingredients': 'المكونات', 'nav.contact': 'تواصل معنا', 'nav.reservation': 'الحجز',
    'nav.close': 'إغلاق القائمة', 'nav.open': 'فتح القائمة',

    'hero.title': 'تجربة فاخرة<br />وأصيلة مع<br />فاير بيت',
    'hero.book': 'احجز طاولتك',
    'hero.panAlt': 'مقلاة عليها ستيك مشوي وخضار طازجة',

    'common.discover': 'اكتشف',

    'about.title': 'قصتنا',
    'about.desc': 'استمتع بتجربة فاخرة وأصيلة في فاير بيت. سواء كنت تزورنا لوجبة عادية، أو عشاء رومانسي، أو اجتماع عمل، أو لقاء طلابي، أو حفلة خاصة، أو لمجرد مشروب مع الأصدقاء، فإن فاير بيت يقدم لك خدمة استثنائية ونكهات لذيذة وتجربة طعام لا تُنسى للجميع.',
    'about.link': 'اكتشف المنيو',
    'about.imgAlt': 'مشويات لحوم فاخرة',

    'menu.title': 'المنيو',
    'menu.desc': 'قليل من الأشياء يضاهي متعة شريحة ستيك جيدة مع البطاطس المقلية، مطهوة ببساطة وبعناية واهتمام. ثق أن طهاتنا يتعاملون مع اللحم بالاحترام الذي يستحقه للحصول على أفضل جودة، والمطبخ المفتوح في كثير من مطاعم الستيك لدينا خير دليل على ذلك.',
    'menu.dishAlt': 'طبق مميز من المنيو',
    'menu.1.name': 'بروسكيتا', 'menu.1.sum': 'ابدأ بخبزنا الطازج مع بيضة وريحان فوقه.',
    'menu.2.name': 'الطبق الرئيسي', 'menu.2.sum': 'شريحة الستيك الطازجة المشوية والعصيرية جاهزة لإشباع شهيتك.',
    'menu.3.name': 'طبق السلطة', 'menu.3.sum': 'رافق الستيك بسلطة صحية مع شرائح اللحم الخالي من الدهون.',
    'menu.4.name': 'الحلوى', 'menu.4.sum': 'اختم تجربتك بقطعة كيك تنعش ذوقك.',

    'events.title': 'الفعاليات القادمة',
    'events.desc': 'لن تتذوق أفضل ستيك في المدينة فحسب، بل يمكنك أيضًا لقاء أصدقائك القدامى أثناء الاستمتاع بالطعام الذي نقدمه.',
    'events.name': 'حفلة شواء',
    'events.details': '26 أغسطس 2027 - وقت الغداء - أجواء غير رسمية',
    'events.link': 'شاهد على فيسبوك',
    'events.imgAlt': 'أشخاص يستمتعون بوجبة في مطعم',

    'ingr.title': 'أفضل المكونات',
    'ingr.desc': 'نفخر كثيرًا باختيار مكوناتنا بعناية لنضمن أن تكون نكهات طعامنا لذيذة وأصيلة قدر الإمكان. ونحقق هذا المستوى من التميز بفضل الاهتمام بالتفاصيل الذي نمنحه لكل طبق، وهو أمر يصعب إيجاده في مطاعم أخرى بفضل جودتنا العالية.',
    'ingr.imgAlt': 'مكونات طازجة وطبيعية',

    'contact.sub': 'تجدنا',
    'contact.title': 'تواصل معنا',
    'contact.mapTitle': 'موقع فاير بيت على الخريطة',
    'contact.directions': 'احصل على الاتجاهات',
    'contact.visit': 'زورونا',
    'contact.address': 'شارع المعهد الأزهري، المساعيد، العريش',
    'contact.call': 'اتصل بنا',
    'contact.res': 'الحجز',
    'contact.write': 'راسلنا',
    'social.fb': 'فيسبوك', 'social.ig': 'إنستجرام', 'social.wa': 'واتساب',

    'res.sub': 'الحجز',
    'res.title': 'احجز طلبك',
    'res.btn': 'احجز عبر واتساب',

    'footer.links': 'روابط',
    'footer.menu': 'المنيو',
    'footer.location': 'الموقع',
    'footer.address': 'شارع المعهد الأزهري<br> المساعيد العريش<br> مصر',
    'footer.hours': 'ساعات العمل',
    'footer.h1': 'الاثنين - السبت: 9 ص - 11 م',
    'footer.h2': 'الأحد - الخميس: 9 ص - 10 م',
    'footer.copy': '&#169; جميع الحقوق محفوظة<br>Ahmed Gomaa',

    'scrollTop': 'العودة للأعلى',

    'title.page': 'فاير بيت',
    'meta.desc': 'اكتشف أجود قطع اللحوم وأطباقًا مميزة وتجربة طعام مصممة لعشاق اللحوم الحقيقيين.'
}

const langBtn = document.getElementById('lang-toggle'),
      metaDesc = document.querySelector('meta[name="description"]'),
      i18nEls = document.querySelectorAll('[data-i18n]'),
      i18nAttrEls = document.querySelectorAll('[data-i18n-attr]')

// Remember the English originals straight from the page
const EN = { 'title.page': document.title, 'meta.desc': metaDesc ? metaDesc.content : '' }
i18nEls.forEach(el => { if (!(el.dataset.i18n in EN)) EN[el.dataset.i18n] = el.innerHTML })
i18nAttrEls.forEach(el => el.dataset.i18nAttr.split(',').forEach(pair => {
    const [attr, key] = pair.split(':')
    if (!(key in EN)) EN[key] = el.getAttribute(attr)
}))

const applyLang = (lang, save) => {
    currentLang = lang
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    const dict = lang === 'ar' ? AR : EN

    i18nEls.forEach(el => { const v = dict[el.dataset.i18n]; if (v !== undefined) el.innerHTML = v })
    i18nAttrEls.forEach(el => el.dataset.i18nAttr.split(',').forEach(pair => {
        const [attr, key] = pair.split(':')
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key])
    }))

    document.title = dict['title.page']
    if (metaDesc) metaDesc.setAttribute('content', dict['meta.desc'])

    // The button always offers the OTHER language
    if (langBtn) {
        langBtn.textContent = lang === 'ar' ? 'EN' : 'Ar'
        langBtn.setAttribute('lang', lang === 'ar' ? 'En' : 'ar')
        langBtn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية')
    }

    // Refresh the theme button label in the new language
    setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false)

    if (save) { try { localStorage.setItem('lang', lang) } catch (e) {} }
}

applyLang(currentLang, false)
if (langBtn) langBtn.addEventListener('click', () => applyLang(currentLang === 'ar' ? 'en' : 'ar', true))

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
    // "Book a table" button
    sr.reveal(`.home__button`, {delay: 1000, origin: 'bottom', distance: '40px'})
    sr.reveal(`.home__fryinpan`, {delay: 600, rotate: {z: 60}})
    sr.reveal(`.home__rosemary-1`, {delay: 1200, origin: `right`, rotate: {z: -60}})
    sr.reveal(`.home__rosemary-2`, {delay: 1200, origin: `left`, rotate: {z: -60}})
    sr.reveal(`.home__tomato`, {delay: 1200, origin: `right`, rotate: {z: -60}})
    sr.reveal(`.home__spoon`, {delay: 1200, origin: `bottom`})
    sr.reveal(`.home__onion`, {delay: 1200, origin: `right`, rotate: {z: -60}})
    sr.reveal(`.home__pepper`, {delay: 1200, origin: `top`, distance: `120px`})
    sr.reveal(`.home__salt-1`, {delay: 1200, origin: `left`, distance: `120px`})
    sr.reveal(`.home__salt-2`, {delay: 1200, origin: `right`, distance: `120px`})

    // The boxes themselves (fade + gentle scale-up)
    sr.reveal(`.about--data, .events__data`, {distance: '0', scale: 0.9, duration: 1400, delay: 200})

    sr.reveal(`.about--data > *`, {origin: 'top', delay: 600})
    sr.reveal(`.about--flour`, {delay: 900})
    sr.reveal(`.about--rosemary`, {delay: 1200, origin: 'bottom'})

    sr.reveal(`.menu__header`)
    sr.reveal(`.menu__dish-1, .menu__dish-2, .menu__dish-3, .menu__dish-4`, {distance: '0', duration: 2000, rotate: {z: -30}})
    sr.reveal(`.menu__rosemary, .menu__flour-2, .menu__tomato, .menu__flour-4`, {delay: 600})
    sr.reveal(`.menu__flour-1, .menu__pepper, .menu__flour-3`, {delay: 900})
    sr.reveal(`.menu__info`, {delay: 600, origin: 'left'})

    sr.reveal(`.events__data > *`, {origin: 'top', delay: 600})
    sr.reveal(`.events__flour`, {delay: 900})
    sr.reveal(`.events__spoon`, {delay: 1200, origin: 'bottom'})

    sr.reveal(`.ingredients__data`)
    sr.reveal(`.ingredients__images > img`, {delay: 1200, distance: '0', scale: 0.1})
    sr.reveal(`.ingredients__img-1`, {delay: 600, distance: '0', scale: 1.5})

    // Desktop: cards on the left, map on the right
    const wide = window.matchMedia('(min-width: 1150px)').matches
    const rtl = document.documentElement.dir === 'rtl'
    sr.reveal(`.contact__map`, {origin: wide ? (rtl ? 'left' : 'right') : 'bottom'})
    sr.reveal(`.contact__info`, {origin: wide ? (rtl ? 'right' : 'left') : 'bottom', distance: '40px', interval: 150})

    sr.reveal(`.reservation__content, .footer__container`)
}
