const pool = require('../config/db')
const cloudinary = require('../config/cloudinary')

class MessagesService{
  async createMessage(senderId, receiverId, chatId, message, file) {
    if(!senderId || !receiverId || !chatId || !message) {
      throw new Error('All fields are required');
    }

    const createdAt = new Date();

    let imageUrl = null;
    if(file) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
          folder: 'messages',
          resource_type: 'image',
        });
      } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
      }
    }

    const query = 'INSERT INTO messages (senderId, receiverId, chatId, message, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [senderId, receiverId, chatId, message, createdAt];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Message creation failed');
    }
    return result.rows[0];
  }

  async getMessages(userToChatId, myId) {
    if(!userToChatId || !myId) {
      throw new Error('All fields are required');
    }

    const query = 'SELECT * FROM messages WHERE (senderId = $1 AND receiverId = $2) OR (senderId = $2 AND receiverId = $1)';
    const values = [userToChatId, myId];
    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = new MessagesService();