const arrows = document.querySelectorAll('.arrow');
const navbars = document.querySelectorAll('.navbar');

//changing active nav
function changeNav(){
  navbars.forEach(navbar => navbar.classList.remove('active'));
  this.classList.add('active');
}

navbars.forEach(navbar => navbar.addEventListener('click',changeNav));

arrows.forEach(arrow => arrow.addEventListener('click', () => {
  navbars.forEach(navbar => navbar.classList.remove('active'));

 document.querySelector('a.navbar[href="#about"]').classList.add('active');
  // if (aboutLink) {
  //   aboutLink.classList.add('active');
  // }
}));

