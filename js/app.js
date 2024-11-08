
// Scroll du header au main
document.querySelector('#scrollButton').addEventListener('click', function() {
  document.querySelector('main').scrollIntoView();
});

/**
 * Gestion de la barre de navigation
 */
const navBar = document.querySelector('#nav');
const logo = document.querySelector('#logo');
const navElements = document.querySelector('#navElements');
const contact = document.querySelector('#contact');

function navReduction() {
  if (window.innerWidth >= 1000) navBar.classList.add('reduce');
  logo.classList.add('hidden');
  contact.classList.add('hidden');
  navElements.style.width = '100%';
}

function navIncrement() {
  navBar.classList.remove('reduce');
  logo.classList.remove('hidden');
  contact.classList.remove('hidden');
  navElements.style.width = '70%';
}

// Gestion de la width de la barre de la navigation
function windowSizeNav() {
  if (window.innerWidth <= 1150) {
    navReduction();
  } else navIncrement();
}

window.addEventListener('resize', function() {
  windowSizeNav();
})

window.addEventListener('load', function() {
  windowSizeNav();
})


// Gestion des boutons de la barre de navigation
function activeElement(element) {
    navBarElements.forEach((elementBis) => {
      if (elementBis.classList.contains('active')) elementBis.classList.remove('active');
    })
    element.classList.add('active');
}

const navBarElements = document.querySelectorAll('#navElements .content');
navBarElements.forEach((element) => {
  element.addEventListener('click', function(event) {activeElement(element)});
})

navBarElements.forEach((element) => {
  element.addEventListener('click', function(event) {
    const children = Array.from(document.querySelectorAll('section'));
    const buttons = Array.from(element.parentNode.children);
    children[buttons.indexOf(element)].scrollIntoView();
  })
})

// Gestion de la navigation active selon la position
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
  threshold: [0.5] // Déclenche lorsque 50% de l'élément est visible
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
