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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(`${entry.target.id}`)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      navbars.forEach(navbar => navbar.classList.remove('active'));
      const navbarLink = document.querySelector(`a.navbar[href='#${entry.target.id}']`);
      if (navbarLink) {
        navbarLink.classList.add('active');
      }
    } else {
      entry.target.classList.remove('show');
    }
  });
},{
  threshold: 0.5
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const copyLine = document.querySelector('.email-address');

copyLine.addEventListener('click', () => {
  navigator.clipboard.writeText(copyLine.textContent)
    .then(() => {
      copyLine.textContent = "Copied!!!";
      setTimeout(()=>{
        copyLine.textContent = 'pratiktamrakar56@gmail.com';
      }, 1000);
    })
});