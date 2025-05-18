class UserDto {
  id;
  name;
  surname;
  email;
  username;
  avatar;

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.username = user.username;
    this.avatar = user.avatar;
  }
}

module.exports = UserDto;
