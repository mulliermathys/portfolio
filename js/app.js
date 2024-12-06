
const navBar = document.querySelector('#nav');
const navBarElements = document.querySelectorAll('#navElements .content');
const logo = document.querySelector('#logo');
const navElements = document.querySelector('#navElements');
const contact = document.querySelector('#contact');
const tradButtons = document.querySelectorAll('#presentation .text-container #left-part #trad-button-zone div');
const navButtons = Array.from(document.querySelectorAll('#navElements .content'));
let navReduced = true;

/**
 * Fonctions
 */

function navReduction(full) {
  logo.style.display = "none";
  contact.style.display = "none";
  if (full) navBar.classList.add('reduce');
  navElements.style.width = "100%";
}

function navIncrement() {
  logo.style.display = "flex";
  contact.style.display = "flex";
  navBar.classList.remove('reduce');
  navElements.style.width = "70%";
}

function windowSizeNav() {
  if (!navReduced) {
    if (window.innerWidth > 1150) navIncrement();
    else navReduction(false);
  } else {
    if (window.innerWidth < 1150) navBar.classList.remove('reduce');
    else navBar.classList.add('reduce');
  }
}

function activeElement(allElements, element) {
  allElements.forEach((elementBis) => {
    if (elementBis.classList.contains('active')) elementBis.classList.remove('active');
  })
  element.classList.add('active');
}

function disableElements(allElements) {
  allElements.forEach((element) => {
    element.classList.remove('active');
  })
}

async function readFile() {
  const response = await fetch('./assets/lang.csv');
  const text = await response.text();
  return text
    .split("\n")
    .filter(row => row.trim() !== "") // Ignore les lignes vides
    .map(row => row.split(";"));
}

async function getLangVersions() {
  const fileContent = await readFile();
  let langVersions = [];
  for (let idxTab = 0; idxTab < fileContent.length; idxTab++) {
    if (fileContent[idxTab].length > 1) { // Vérifie que la deuxième colonne existe
      langVersions.push(fileContent[idxTab][1].replace(/\\n/g, "\n"));
    }
  }
  return langVersions;
}

async function switchLanguage(idxLang) {
  const langVersions = await getLangVersions();
  if (idxLang < 0 || idxLang >= langVersions.length) {
    console.error("Index hors limites !");
    return;
  }
  document.querySelector("#left-part p").innerHTML = langVersions[idxLang].replace(/\n/g, "<br>");
}

/**
 * Event listeners
 */

document.querySelector('#scrollButton').addEventListener('click', function() {
  document.querySelector('main').scrollIntoView();
});

window.addEventListener('load', function() {
  windowSizeNav();
  switchLanguage(0);
})

window.addEventListener('resize', function() {
  windowSizeNav();
})

navBarElements.forEach((element) => {
  element.addEventListener('click', function(event) {activeElement(navBarElements, element)});
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

tradButtons.forEach((element) => {
  element.addEventListener('click', function(event) {
    let buttonsList =  Array.from(tradButtons);
    activeElement(tradButtons, element);
    switchLanguage(buttonsList.indexOf(element));
  });
})

/**
 * Observers
 * */

const sectionObserver = new IntersectionObserver ((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5) {
        if (window.innerWidth > 1150) navReduction(true);
        else navReduction(false);
        const children = Array.from(entry.target.parentNode.children); // Convertit la NodeList en tableau
        activeElement(navButtons, navButtons[children.indexOf(entry.target)]);
        navReduced = true;
      }
    });
  },
  {
    threshold: [0.5], // Déclenche quand la visibilité atteint 50%
  }
);

document.querySelectorAll('main section').forEach((element) => {
  sectionObserver.observe(element);
});

const headerObserver = new IntersectionObserver ((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5) {
        navReduced = false;
        windowSizeNav();
        disableElements(navButtons);
      }
    });
  },
  {
    threshold: [0.5], // Déclenche quand la visibilité atteint 50%
  }
);

headerObserver.observe(document.querySelector("header"));

function block() {
  navBar.style.display = 'none';
  document.querySelector("main").style.display = "none";
  document.querySelector("header").style.display = "none";

  Swal.fire({title: 'À bientôt :)', text: 'Le site n\'est pas encore terminé. Découvrez-le bientôt !', icon: 'error', confirmButtonText: 'Compris'});
}

//block();
