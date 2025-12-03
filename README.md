# Task Manager API

A simple RESTful API for managing tasks and users built with Node.js and Express.

## Features

- User management (Create, Read, Update, Delete)
- Task management (Create, Read, Update, Delete)
- Task filtering by user, status, and priority
- Input validation
- In-memory data storage

## Installation

1. Clone the repository
```bash
git clone https://github.com/Sachinn-p/Task-manager.git
cd Task-manager
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Root
- `GET /` - API information and available endpoints

### Users

#### Create a new user
```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Get all users
```
GET /api/users
```

#### Get user by ID
```
GET /api/users/:id
```

#### Update user
```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin"
}
```

#### Delete user
```
DELETE /api/users/:id
```

### Tasks

#### Create a new task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "userId": 1,
  "status": "pending",
  "priority": "high"
}
```

#### Get all tasks (with optional filters)
```
GET /api/tasks
GET /api/tasks?userId=1
GET /api/tasks?status=completed
GET /api/tasks?priority=high
GET /api/tasks?userId=1&status=pending
```

#### Get task by ID
```
GET /api/tasks/:id
```

#### Update task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "medium"
}
```

#### Delete task
```
DELETE /api/tasks/:id
```

## Task Status Values
- `pending` - Task is not started
- `in-progress` - Task is being worked on
- `completed` - Task is finished

## Task Priority Values
- `low` - Low priority
- `medium` - Medium priority (default)
- `high` - High priority

## User Roles
- `user` - Regular user (default)
- `admin` - Administrator

## Response Format

All responses follow this format:

Success response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error response:
```json
{
  "error": "Error message description"
}
```

## Example Usage

### Creating a user and a task

1. Create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","email":"alice@example.com"}'
```

2. Create a task for that user:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Review code","description":"Review PR #123","userId":1,"priority":"high"}'
```

3. Get all tasks for a user:
```bash
curl http://localhost:3000/api/tasks?userId=1
```

## License

ISC