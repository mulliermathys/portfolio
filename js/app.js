
// Scroll du header au main
document.querySelector('#scrollButton').addEventListener('click', function() {
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
});

// Gestion de la barre de navigation selon scroll

window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  const threshold = document.querySelector('main').getBoundingClientRect().top + scrollPosition - 300;

  const navBar = document.querySelector('#nav');
  const title = document.querySelector('#title');
  const navElements = document.querySelector('#navElements');
  const contact = document.querySelector('#contact');

  if (scrollPosition > threshold) {
    navBar.classList.add('reduce');
    title.classList.add('hidden');
    contact.classList.add('hidden');
    navElements.style.width = '100%';
  } else {
    navBar.classList.remove('reduce');
    title.classList.remove('hidden');
    contact.classList.remove('hidden');
    navElements.style.width = '70%';
  }
});
