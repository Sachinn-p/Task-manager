// In-memory storage for users (replace with database in production)
let users = [];
let nextId = 1;

class User {
  constructor(name, email, role = 'user') {
    this.id = nextId++;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date().toISOString();
  }

  static create(userData) {
    const user = new User(userData.name, userData.email, userData.role);
    users.push(user);
    return user;
  }

  static findAll() {
    return users;
  }

  static findById(id) {
    return users.find(user => user.id === parseInt(id));
  }

  static update(id, userData) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...userData, id: parseInt(id) };
    return users[index];
  }

  static delete(id) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }
}

module.exports = User;
