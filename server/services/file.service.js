const path = require('path')
const fs = require('fs').promises

class FileService {
  async getAvatar(userId, avatarName) {

    if (!userId || !avatarName) {
      throw { status: 400, message: 'Missing parameters' };
    }

    const basePath = process.env.FILE_STORAGE_PATH;
    const filepath = path.resolve(basePath, userId, avatarName);

    try {
      await fs.access(filepath);
      return filepath;
    } catch (err) {
      console.error('Файл не найден:', err);
      throw { status: 404, message: 'File not found' };
    }
  }
}

module.exports = new FileService()
