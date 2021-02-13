'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// smooth scroll

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true
});




///////////////////////////////////////
// tabs component

const tabsContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const contentElements = document.querySelectorAll('.operations__content')


tabsContainer.addEventListener('click', (e) => {
  let clicked = e.target.closest('.operations__tab')

  if (!clicked) return
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  contentElements.forEach(el => el.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})





///////////////////////////////////////
// menu fade animation
const nav = document.querySelector('nav')

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    let link = e.target
    let siblings = link.closest('.nav').querySelectorAll('.nav__link')
    let logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity
    })
    logo.style.opacity = opacity
  }
}

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5)
})
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1)
})






///////////////////////////////////////
// sticky navigation

const header = document.querySelector('header');

function stickyNav(entries) {
  const entry = entries[0];
  console.log(nav.getBoundingClientRect().height)
  // console.log(!entry.isIntersecting)
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`
})

headerObserver.observe(header)







///////////////////////////////////////
// reveal sections

const allHiddenSections = document.querySelectorAll('section')

function revealSection(entries, observer) {
  let [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.,
  rootMargin: `-${0.15 * window.innerHeight}px`
})

allHiddenSections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})







///////////////////////////////////////
// img lazy loading

const lazyImages = document.querySelectorAll('img[data-src]')

function imgLoad(entries, observer) {
  let [entry] = entries
  if (!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'))
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0,
  rootMargin: '100px'
})

lazyImages.forEach(img => imgObserver.observe(img))









///////////////////////////////////////
// slider
// slides variables
const slides = document.querySelectorAll('.slide')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
let currentSlide = 0;
// dots variables
const dotsContainer = document.querySelector('.dots')


// creating the dots
for (let i = 0; i < slides.length; i++) {
  let dot = document.createElement('button');
  dot.classList.add('dots__dot')
  dot.dataset.dotSlideNumber = i
  // dot.addEventListener('click', function (e) {
  //   currentSlide = parseInt(e.target.dataset.dotSlideNumber);
  //   slide()
  // })
  dotsContainer.appendChild(dot)
}

let dots = document.querySelectorAll('.dots__dot')

// dots functionality
dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = parseInt(e.target.dataset.dotSlideNumber);
    slide()
  }
})


// main slider functionality
function slide() {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`
  })
  dots.forEach(dot => dot.classList.remove('dots__dot--active'))
  dots[currentSlide].classList.add('dots__dot--active')
}

function slideRight() {
  currentSlide = currentSlide >= (slides.length - 1) ? 0 : currentSlide + 1
  slide()
}
function slideLeft() {
  currentSlide = currentSlide <= 0 ? slides.length - 1 : currentSlide - 1
  slide()
}

btnRight.addEventListener('click', slideRight)
btnLeft.addEventListener('click', slideLeft)

// onload
slide()

// arrows slide
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') slideRight()
  if (e.key === 'ArrowLeft') slideLeft()
})