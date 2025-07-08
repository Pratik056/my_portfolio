const arrows = document.querySelectorAll('.arrow');
const navbars = document.querySelectorAll('.navbar');


navbars.forEach(navbar => {
  navbar.addEventListener('click', (e) => {
    navbars.forEach(nav => nav.classList.remove('active'));
    e.currentTarget.classList.add('active');
  });
});

function changeNav(){
  navbars.forEach(navbar => navbar.classList.remove('active'));
  this.classList.add('active');
}


