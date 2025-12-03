# Task Manager

A simple and elegant web-based task management application built with vanilla HTML, CSS, and JavaScript.

## Features

### 📋 Task Management
- Create, view, edit, and delete tasks
- Mark tasks as completed or pending
- Set task priority (Low, Medium, High)
- Add due dates to tasks
- Filter tasks by status (All, Pending, Completed)

### 👤 User Profile
- Comprehensive user profile management
- Update personal information (name, email, phone)
- Add a bio
- Select timezone for better task scheduling
- Choose preferred language
- Toggle email notifications
- Subscribe to newsletter
- Customizable avatar colors

### 📊 Dashboard
- Quick statistics overview
- View total, completed, and pending tasks
- Recent tasks display
- Clean and intuitive interface

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server or additional installations required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sachinn-p/Task-manager.git
```

2. Navigate to the project directory:
```bash
cd Task-manager
```

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file.

## Usage

### Managing Tasks
1. Navigate to the "My Tasks" page
2. Fill in the task form with:
   - Task title (required)
   - Description (optional)
   - Priority level
   - Due date (optional)
3. Click "Add Task" to create a new task
4. Use the filter buttons to view tasks by status
5. Click "Complete" to mark a task as done
6. Click "Delete" to remove a task

### Updating Your Profile
1. Navigate to the "Profile" page
2. Fill in your personal information:
   - Full name (required)
   - Email address (required)
   - Phone number (optional)
   - Bio (max 200 characters)
   - Timezone
   - Preferred language
3. Set your notification preferences
4. Click "Save Changes" to update your profile
5. Click "Change Avatar" to randomize your avatar color

## File Structure

```
Task-manager/
├── index.html          # Home page with dashboard
├── tasks.html          # Task management page
├── profile.html        # User profile page
├── styles.css          # All styling
├── script.js           # Application logic
└── README.md           # Documentation
```

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Application logic
- **LocalStorage** - Data persistence

## Browser Compatibility

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features in Detail

### Data Persistence
All data is stored locally in the browser using LocalStorage:
- Tasks persist across browser sessions
- Profile information is saved automatically
- No server or database required

### Responsive Design
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

### User Experience
- Clean and modern interface
- Smooth animations and transitions
- Color-coded priority levels
- Relative timestamps (e.g., "2h ago")
- Toast notifications for user actions
- Form validation with helpful hints

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Sachinn-p

## Acknowledgments

- Inspired by modern task management applications
- Built with best practices in web development
- Designed for simplicity and usability