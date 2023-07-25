const renderDecks = require('./components/renderDecks.js');
const renderNewDeckForm = require('./components/renderNewDeckForm.js');
const initAccordions = require('./utils/accordion.js');

document.addEventListener('DOMContentLoaded', async () => {
  await renderDecks();
  initAccordions();
  renderNewDeckForm();
});
