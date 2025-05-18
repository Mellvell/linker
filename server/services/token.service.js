const jwt = require('jsonwebtoken');
const pool = require('../config/db');

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const query = `SELECT * FROM tokens WHERE userid = $1`;
    const values = [userId];
    const result = await pool.query(query, values);

    if(result.rows.length > 0) {
      const updateQuery = `UPDATE tokens SET refreshtoken = $1 WHERE userid = $2`;
      const updateValues = [refreshToken, userId];
      await pool.query(updateQuery, updateValues);
    }
    else {
      const insertQuery = `INSERT INTO tokens (userid, refreshtoken) VALUES ($1, $2)`;
      const insertValues = [userId, refreshToken];
      await pool.query(insertQuery, insertValues);
    }
  }

  async removeToken(refreshToken) {
    const query = `DELETE FROM tokens WHERE refreshtoken = $1`;
    const values = [refreshToken];
    const result = await pool.query(query, values);
    return {"message": "Token removed successfully"};
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }
 
  async findToken(refreshToken) {
    const query = `SELECT * FROM tokens WHERE refreshtoken = $1`;
    const values = [refreshToken];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new TokenService();
