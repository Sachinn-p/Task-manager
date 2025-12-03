const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Task Manager API',
    endpoints: {
      users: '/api/users',
      tasks: '/api/tasks'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
