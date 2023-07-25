function initAccordions() {
  const accordionButtons = document.querySelectorAll('.accordion');
  accordionButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const panel = document.getElementById(
        e.target.getAttribute('aria-labelledby')
      );
      button.classList.toggle('active');
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

module.exports = initAccordions;

// class Accordion {
//   constructor() {
//     this.accordionButtons = document.querySelectorAll('.accordion');
//   }

//   init() {
//     this.accordionButtons.forEach((button) => {
//       button.addEventListener('click', (e) => {
//         const panel = document.getElementById(
//           e.target.getAttribute('aria-labelledby')
//         );
//         button.classList.toggle('active');
//         if (panel.style.maxHeight) {
//           panel.style.maxHeight = null;
//         } else {
//           panel.style.maxHeight = panel.scrollHeight + 'px';
//         }
//       });
//     });
//   }
// }
