const { createDeck } = require('../repositories/deckRepository');
const Toast = require('../utils/toast');

function renderNewDeckForm() {
  const newDeckModal = document.getElementById('new-deck-modal');
  const newDeckModalToggle = document.getElementById('new-deck-modal-toggle');
  newDeckModalToggle.addEventListener('click', () => {
    newDeckModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header flex items-center justify-between">
        <h2 class="modal-title">Create new deck</h2>
        <button id="close-modal-btn" class="btn">
          <span class="close-modal-btn-icon">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="new-deck-form" class="flex flex-col gap-3">
          <div class="form-control flex flex-col gap-2">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" autofocus />
          </div>
          <div class="form-control flex flex-col gap-2">
            <label for="description">Description</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <div class="form-control flex flex-col gap-2">
            <div id="tags-display"></div>
            <label for="tags">Tags</label>
            <input type="text" id="tags" name="tags" />
          </div>
          <div class="form-control flex flex-col gap-2">
            <label for="visibility">Visibility</label>
            <select id="visibility" name="visibility" >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button type="submit" class="btn mt-4">Create</button>
        </form>
      </div>
    </div>
  `;
    newDeckModal.showModal();
    const closeModalBtn = document.getElementById('close-modal-btn');
    closeModalBtn.addEventListener('click', () => {
      newDeckModal.close();
    });

    const newDeckForm = document.getElementById('new-deck-form');
    newDeckForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const name = formData.get('name');
      const description = formData.get('description');
      const tags = formData.get('tags');
      const visibility = formData.get('visibility');

      console.log('Name: ', name);
      console.log('Description: ', description);
      const deck = await createDeck(name, description, 2, tags, visibility);
      console.log('Deck: ', deck);
      newDeckModal.close();
      const toast = new Toast();
      await toast.show('Deck created successfully');
      window.location.reload();
    });

    const tagsDisplay = document.getElementById('tags-display');
    tagsDisplay.style.display = 'none';
    tagsDisplay.classList.add('gap-1');
    const tagsInput = document.getElementById('tags');
    tagsInput.addEventListener('keyup', (e) => {
      e.target.value === ''
        ? (tagsDisplay.style.display = 'none')
        : (tagsDisplay.style.display = 'flex');
      const tags = e.target.value.split(',');
      tagsDisplay.innerHTML = `
      ${tags
        .map((tag) => {
          return `<span class="tag bg-gray-700 p-1 rounded-md relative text-xs">${tag}</span>`;
        })
        .join('')}
    `;
    });
  });
}

module.exports = renderNewDeckForm;
