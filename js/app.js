
const navBar = document.querySelector('#nav');
const navBarElements = document.querySelectorAll('#navElements .content');
const logo = document.querySelector('#logo');
const navElements = document.querySelector('#navElements');
const contact = document.querySelector('#contact');


function block() {
  navBar.style.display = 'none';
  document.querySelector("main").style.display = "none";
  document.querySelector("header").style.display = "none";

  Swal.fire({title: 'À bientôt :)', text: 'Le site n\'est pas encore terminé. Découvrez-le bientôt !', icon: 'error', confirmButtonText: 'Compris'});
}

block();

/**
 * Fonctions
 */

function navReduction() {
  if (window.innerWidth >= 1000) navBar.classList.add('reduce');
  else navBar.classList.remove('reduce');
  logo.classList.add('hidden');
  contact.classList.add('hidden');
  navElements.style.width = '100%';
}

function navIncrement() {
  if (window.innerWidth >= 1000) {
    navBar.classList.remove('reduce');
    logo.classList.remove('hidden');
    contact.classList.remove('hidden');
    navElements.style.width = '70%';
  }
}

function windowSizeNav() {
  if (window.innerWidth <= 1150) {
    navReduction();
  } else navIncrement();
}

function activeElement(element) {
  navBarElements.forEach((elementBis) => {
    if (elementBis.classList.contains('active')) elementBis.classList.remove('active');
  })
  element.classList.add('active');
}

/**
 * Event listeners
 */

document.querySelector('#scrollButton').addEventListener('click', function() {
  document.querySelector('main').scrollIntoView();
});

window.addEventListener('resize', function() {
  windowSizeNav();
})

window.addEventListener('load', function() {
  windowSizeNav();
})

navBarElements.forEach((element) => {
  element.addEventListener('click', function(event) {activeElement(element)});
})

navBarElements.forEach((element) => {
  element.addEventListener('click', function(event) {
    const children = Array.from(document.querySelectorAll('section'));
    const buttons = Array.from(element.parentNode.children);
    const section = children[buttons.indexOf(element)];
    let sectionPosY = section.getBoundingClientRect().top;
    sectionPosY -= navBar.clientHeight;
    sectionPosY -= parseInt(window.getComputedStyle(navBar).top) * 2;
    window.scrollBy({top: sectionPosY, behavior: "smooth"});
  })
})

/**
 * Observers
 * */

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.5) {
      const children = Array.from(entry.target.parentNode.children); // Convertit la NodeList en tableau
      const buttons = Array.from(document.querySelectorAll('#navElements .content'));
      activeElement(buttons[children.indexOf(entry.target)]);
      navReduction();
    }
  });
}, {
  threshold: [0.5]
});

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.target === document.querySelector('header') && entry.intersectionRatio >= 0.5) {
      document.querySelectorAll('#navElements .content').forEach((element) => {
        element.classList.remove('active');
      });
      navIncrement();
    }
  });
}, {
  threshold: [0.5] // Déclenche lorsque 50% de l'élément est visible
});

document.querySelectorAll("section").forEach((element) => {
  sectionObserver.observe(element);
})

headerObserver.observe(document.querySelector('header'));
