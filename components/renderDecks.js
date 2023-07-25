const { getDecks, deleteDeck } = require('../repositories/deckRepository');
const Toast = require('../utils/toast');

async function renderDecks() {
  const decksContainer = document.getElementById('decks');
  const decks = await getDecks();
  console.log('Decks: ', decks);
  decksContainer.innerHTML = renderDecksList(decks);
  handleDeleteDeck();
}

function renderDecksList(decks) {
  return `
  <div class="decks grid md:grid-cols-12 gap-2">
    ${decks
      ?.map((deck) => {
        return `
        <div class="deck col-span-4 card gap-2">
          <button class='deck-btn font-bold text-lg' id='${deck.id}'>
            ${deck.name}
          </button>
          <p class="text-">${deck.description ?? 'No description'}</p>
          <div class="tags flex gap-2">
            ${
              deck.tags
                ? deck.tags
                    ?.split(',')
                    .map((tag) => {
                      return `<span class="tag bg-gray-700 p-1 rounded-md relative text-xs">${tag}</span>`;
                    })
                    .join('')
                : ''
            }
          </div>
          <hr />
          <button class="accordion mt-auto" aria-labelledby="panel${deck.id}">
            <span class="accordion-summary-text">Actions</span>
            <!-- https://feathericons.dev/?search=chevron-right&iconset=feather -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="accordion-summary-icon"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            >
                <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div class="accordion-panel accordion-details" id="panel${deck.id}">
            <div class="actions flex items-center justify-between ">
              <button  class="btn btn-light">edit</button>
              <button id="deleteDeck" data-deckId="${
                deck.id
              }" class="btn btn-danger">delete</button>
            </div>
          </div>
        </div>
      `;
      })
      .join('')}
  </div>
`;
}

function handleDeleteDeck() {
  const deleteDeckBtns = document.querySelectorAll('#deleteDeck');
  deleteDeckBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const deckId = e.target.dataset.deckid;
      console.log('Deck id: ', deckId);
      try {
        const toast = new Toast();
        await deleteDeck(deckId);
        await toast.show(
          'Deck deleted successfully',
          'Success',
          500,
          'success'
        );
        window.location.reload();
      } catch (error) {
        const toast = new Toast();
        await toast.show('Error deleting deck', 'Error', 500, 'error');
      }
    });
  });
}

module.exports = renderDecks;
