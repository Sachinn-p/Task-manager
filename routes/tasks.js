const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// Constants for validation
const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
};

const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Validation middleware
const validateTask = (req, res, next) => {
  const { title, userId } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Check if user exists
  const user = User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  next();
};

// GET all tasks (with optional filters)
router.get('/', (req, res) => {
  try {
    const { userId, status, priority } = req.query;
    const filters = {};

    if (userId) filters.userId = parseInt(userId);
    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const tasks = Task.findAll(filters);
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// GET task by ID
router.get('/:id', (req, res) => {
  try {
    const task = Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

// POST create new task
router.post('/', validateTask, (req, res) => {
  try {
    const { title, description, userId, status, priority } = req.body;

    const task = Task.create({
      title,
      description: description || '',
      userId,
      status: status || TASK_STATUS.PENDING,
      priority: priority || TASK_PRIORITY.MEDIUM
    });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT update task
router.put('/:id', (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const task = Task.update(req.params.id, updateData);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE task
router.delete('/:id', (req, res) => {
  try {
    const deleted = Task.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
