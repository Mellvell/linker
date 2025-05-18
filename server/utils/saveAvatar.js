require('dotenv').config();
const fs = require('fs');
const path = require('path');

const AVATARS_DIR = process.env.FILE_STORAGE_PATH

const saveAvatar = async (username, avatarBuffer) => {
  try {
    const userDir = await path.join(AVATARS_DIR, username);
    await fs.promises.mkdir(userDir, { recursive: true });

    const avatarPath = await path.join(userDir, 'avatar.png');
    await fs.promises.writeFile(avatarPath, avatarBuffer);
    const avatarUrl = `/${username}/avatar.png`

    return avatarUrl;
  } catch (error) {
    console.log('Error saving avatar:', error);
  }
}

module.exports = saveAvatar;
