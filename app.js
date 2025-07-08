const arrows = document.querySelectorAll('.arrow');
const navbars = document.querySelectorAll('.navbar');


// navbars.forEach(navbar => {
//   navbar.addEventListener('click', (e) => {
//     navbars.forEach(nav => nav.classList.remove('active'));
//     e.currentTarget.classList.add('active');
//   });
// });

//changing active nav
function changeNav(){
  navbars.forEach(navbar => navbar.classList.remove('active'));
  this.classList.add('active');
}

navbars.forEach(navbar => navbar.addEventListener('click',changeNav));
