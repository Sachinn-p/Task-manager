const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Validation middleware
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};

// GET all users
router.get('/', (req, res) => {
  try {
    const users = User.findAll();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// GET user by ID
router.get('/:id', (req, res) => {
  try {
    const user = User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// POST create new user
router.post('/', validateUser, (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Check if email already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const user = User.create({ name, email, role });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT update user
router.put('/:id', validateUser, (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    const user = User.update(req.params.id, { name, email, role });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user
router.delete('/:id', (req, res) => {
  try {
    const deleted = User.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
