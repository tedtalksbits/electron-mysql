const initAccordions = require('./utils/accordion.js');
// const { deleteDeck, getDeck, getDecks, createDeck } = require('./utils/sql.js');
const renderDecks = require('./components/renderDecks.js');
const renderNewDeckForm = require('./components/renderNewDeckForm.js');
// const decksContainer = document.getElementById('decks');
// const createDeckBtn = document.getElementById('create-deck-btn');

// const newDeckModal = document.getElementById('new-deck-modal');
// const newDeckModalToggle = document.getElementById('new-deck-modal-toggle');

document.addEventListener('DOMContentLoaded', async () => {
  await renderDecks();
  initAccordions();
  renderNewDeckForm();
});

// interactivity
