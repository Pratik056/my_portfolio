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

 const aboutLink = document.querySelector('a.navbar[href="#about"]');
  if (aboutLink) {
    aboutLink.classList.add('active');
  }
}));

//section observer + nav active
const observer1 = new IntersectionObserver((entries) => {
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
  threshold: 0.3
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer1.observe(el));


//Element animation
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('animationShow');
    } else {
      entry.target.classList.remove('animationShow')
    }
  })
},{
  threshold:0.6
});

const animationHidden = document.querySelectorAll('.animationHidden');
animationHidden.forEach((el) => observer2.observe(el));

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

// Animate skills progress bars within their container
const progressBars = Array.from(document.querySelectorAll('.skills-card_innerline'));
progressBars.forEach((bar) => {
  const parent = bar.parentElement;
  if (!parent) return;
  const targetPercent = Math.max(0, Math.min(100, Math.round((bar.offsetWidth / parent.clientWidth) * 100)));
  bar.dataset.targetWidth = `${targetPercent}%`;
  bar.style.width = '0%';
});

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const bar = entry.target;
    if (entry.isIntersecting) {
      const target = bar.dataset.targetWidth || '90%';
      bar.style.width = target;
    } else {
      bar.style.width = '0%';
    }
  });
}, { threshold: 0.5 });

progressBars.forEach((bar) => progressObserver.observe(bar));

// one-section-at-a-time smooth scrolling
const sections = Array.from(document.querySelectorAll('.full-screen'));
let scrollLock = false;

function getCurrentSectionIndex() {
  const viewportMiddle = window.scrollY + window.innerHeight / 2;
  let closestIndex = 0;
  let smallestDistance = Infinity;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionMiddle = window.scrollY + rect.top + rect.height / 2;
    const distance = Math.abs(sectionMiddle - viewportMiddle);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = index;
    }
  });
  return closestIndex;
}

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  scrollLock = true;
  sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => { scrollLock = false; }, 700);
}

window.addEventListener('wheel', (e) => {
  if (sections.length === 0) return;
  if (scrollLock) { e.preventDefault(); return; }
  const delta = e.deltaY;
  if (Math.abs(delta) < 10) return; // ignore micro scrolls
  const current = getCurrentSectionIndex();
  const target = Math.max(0, Math.min(sections.length - 1, current + (delta > 0 ? 1 : -1)));
  if (target !== current) {
    e.preventDefault();
    scrollToSection(target);
  }
}, { passive: false });

window.addEventListener('keydown', (e) => {
  if (sections.length === 0) return;
  if (scrollLock) { e.preventDefault(); return; }
  const keysDown = ['ArrowDown', 'PageDown', ' '];
  const keysUp = ['ArrowUp', 'PageUp'];
  const current = getCurrentSectionIndex();
  if (keysDown.includes(e.key)) {
    e.preventDefault();
    scrollToSection(Math.min(sections.length - 1, current + 1));
  } else if (keysUp.includes(e.key)) {
    e.preventDefault();
    scrollToSection(Math.max(0, current - 1));
  }
});