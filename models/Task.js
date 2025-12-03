// In-memory storage for tasks (replace with database in production)
let tasks = [];
let nextId = 1;

class Task {
  constructor(title, description, userId, status = 'pending', priority = 'medium') {
    this.id = nextId++;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.status = status; // pending, in-progress, completed
    this.priority = priority; // low, medium, high
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static create(taskData) {
    const task = new Task(
      taskData.title,
      taskData.description,
      taskData.userId,
      taskData.status,
      taskData.priority
    );
    tasks.push(task);
    return task;
  }

  static findAll(filters = {}) {
    let filteredTasks = tasks;

    if (filters.userId) {
      filteredTasks = filteredTasks.filter(task => task.userId === parseInt(filters.userId));
    }

    if (filters.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }

    return filteredTasks;
  }

  static findById(id) {
    return tasks.find(task => task.id === parseInt(id));
  }

  static update(id, taskData) {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return null;

    tasks[index] = { 
      ...tasks[index], 
      ...taskData, 
      id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    return tasks[index];
  }

  static delete(id) {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  }
}

module.exports = Task;
