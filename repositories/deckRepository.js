const connection = require('../utils/sql');
const deckRepository = {
  async getDecks() {
    const [rows] = await connection.execute('SELECT * FROM decks');
    return rows;
  },

  async getDeck(id) {
    const [rows] = await connection.execute(
      'SELECT * FROM decks WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async deleteDeck(id) {
    const [rows] = await connection.execute('DELETE FROM decks WHERE id = ?', [
      id,
    ]);

    const [rows2] = await connection.execute(
      'DELETE FROM flashcards WHERE deck_id = ?',
      [id]
    );

    return {
      rows,
      rows2,
    };
  },

  async createDeck(name, description, user_id = 2, tags, visibility) {
    const [rows] = await connection.execute(
      'INSERT INTO decks (name, description, user_id, tags, visibility) VALUES (?, ?, ?, ?, ?)',
      [name, description, user_id, tags, visibility]
    );

    return await deckRepository.getDeck(rows.insertId);
  },

  async getDecksLikeName(name) {
    const [rows] = await connection.execute(
      'SELECT * FROM decks WHERE name LIKE ?',
      [`%${name}%`]
    );
    return rows;
  },
};

module.exports = deckRepository;
