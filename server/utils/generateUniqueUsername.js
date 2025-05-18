const generateUniqueUsername = () => {
  const username = "user@"
  const randomDigit = Math.floor(100 + Math.random() * 900000);
  return`${username}${randomDigit}`;
}

module.exports = generateUniqueUsername;