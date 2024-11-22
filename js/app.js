
const navBar = document.querySelector('#nav');
const navBarElements = document.querySelectorAll('#navElements .content');
const logo = document.querySelector('#logo');
const navElements = document.querySelector('#navElements');
const contact = document.querySelector('#contact');
const tradButtons = document.querySelectorAll('#presentation .text-container #left-part #trad-button-zone div');

let headerVisible = true;

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
    headerVisible = true;
    console.log("oui")
  }
}

function windowSizeNav() {
  if (window.innerWidth <= 1150) {
    navReduction();
  } else if (headerVisible) navIncrement();
}

function activeElement(allElements, element) {
  allElements.forEach((elementBis) => {
    if (elementBis.classList.contains('active')) elementBis.classList.remove('active');
  })
  element.classList.add('active');
}

function switchLanguage(idxLang) {
  const langVersions = ["Étudiant en BUT Informatique à l'IUT de Lille, je suis spécialisé dans la création d'applications, de leur conception à leur validation. Mon ambition ? Devenir développeur full stack pour concevoir et réaliser des solutions innovantes, ergonomiques et performantes.\n\n Curieux et motivé, je m'intéresse à toutes les facettes du code : des interfaces utilisateur intuitives et attractives aux architectures back-end robustes et fiables. Grâce à ma formation, j'ai acquis de l'expérience pour être efficace à chaque étape du développement d'une application, depuis l'analyse des besoins du client jusqu'à sa livraison pour la rendre entièrement fonctionelle.",
                "As a student in the Computer Science bachelor's program (BUT Informatique) at IUT de Lille, I specialize in application development, from design to validation. My ambition? To become a full-stack developer, crafting innovative, user-friendly, and high-performance solutions.\n\n Curious and driven, I am passionate about all aspects of coding: from creating intuitive and appealing user interfaces to building robust and reliable back-end architectures. Through my studies, I have gained valuable experience to excel at every stage of application development, from analyzing client needs to delivering fully functional solutions."];
  document.querySelector("#left-part p").innerHTML = langVersions[idxLang].replace(/\n/g, "<br>");
}

/**
 * Event listeners
 */

document.querySelector('#scrollButton').addEventListener('click', function() {
  document.querySelector('main').scrollIntoView();
});

window.addEventListener('resize', function() {
   if (headerVisible) navIncrement();
   else navReduction();
})

window.addEventListener('load', function() {
  windowSizeNav();
  switchLanguage(0);
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
    activeElement(tradButtons, element);
    let buttonsList =  Array.from(tradButtons);
    switchLanguage(buttonsList.indexOf(element));
  });
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
      headerVisible = false;
      windowSizeNav();
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
      headerVisible = true;
      navIncrement();
    } else {
      navReduction();
    }
  });
}, {
  threshold: [0.5] // Déclenche lorsque 50% de l'élément est visible
});

document.querySelectorAll("section").forEach((element) => {
  sectionObserver.observe(element);
})

headerObserver.observe(document.querySelector('header'));

function block() {
  navBar.style.display = 'none';
  document.querySelector("main").style.display = "none";
  document.querySelector("header").style.display = "none";

  Swal.fire({title: 'À bientôt :)', text: 'Le site n\'est pas encore terminé. Découvrez-le bientôt !', icon: 'error', confirmButtonText: 'Compris'});
}

//block();
