// LocalStorage keys
const STORAGE_KEYS = {
    TASKS: 'taskManager_tasks',
    PROFILE: 'taskManager_profile',
    CURRENT_USER: 'taskManager_currentUser'
};

// Initialize data structures
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
        const defaultProfile = {
            name: 'User',
            email: 'user@example.com',
            phone: '',
            bio: '',
            timezone: 'UTC',
            language: 'en',
            notifications: true,
            newsletter: false,
            avatarColor: '#667eea'
        };
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultProfile));
    }
}

// Initialize on load
initStorage();

// Task Management Functions
function getTasks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS)) || [];
    } catch (e) {
        console.error('Error loading tasks:', e);
        return [];
    }
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-due-date').value;

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString()
    };

    const tasks = getTasks();
    tasks.unshift(task);
    saveTasks(tasks);

    // Reset form
    document.getElementById('task-form').reset();

    // Reload tasks
    loadTasks();

    // Show success message
    showNotification('Task added successfully!', 'success');
}

function loadTasks(filter = 'all') {
    const tasks = getTasks();
    const container = document.getElementById('tasks-container');
    
    if (!container) return;

    // Filter tasks
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No tasks found</h3>
                <p>Start by adding your first task!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}">
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">
                    <span class="task-priority ${task.priority}">
                        ${task.priority.toUpperCase()}
                    </span>
                    ${task.dueDate ? `<span>📅 ${formatDate(task.dueDate)}</span>` : ''}
                    <span>🕒 ${formatRelativeTime(task.createdAt)}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn ${task.completed ? 'btn-secondary' : 'btn-success'}" 
                        onclick="toggleTask(${task.id})">
                    ${task.completed ? '↶ Undo' : '✓ Complete'}
                </button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">
                    🗑 Delete
                </button>
            </div>
        </div>
    `).join('');
}

function toggleTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        loadTasks();
        updateDashboard();
        showNotification(`Task ${task.completed ? 'completed' : 'reopened'}!`, 'info');
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = getTasks();
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        saveTasks(filteredTasks);
        loadTasks();
        updateDashboard();
        showNotification('Task deleted!', 'info');
    }
}

function filterTasks(filter) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load tasks with filter
    loadTasks(filter);
}

// Profile Management Functions
function getProfile() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE));
    } catch (e) {
        console.error('Error loading profile:', e);
        return null;
    }
}

function saveProfileData(profile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

function loadProfile() {
    const profile = getProfile();
    if (!profile) return;

    // Update form fields
    document.getElementById('profile-name').value = profile.name || '';
    document.getElementById('profile-email').value = profile.email || '';
    document.getElementById('profile-phone').value = profile.phone || '';
    document.getElementById('profile-bio').value = profile.bio || '';
    document.getElementById('profile-timezone').value = profile.timezone || 'UTC';
    document.getElementById('profile-language').value = profile.language || 'en';
    document.getElementById('profile-notifications').checked = profile.notifications !== false;
    document.getElementById('profile-newsletter').checked = profile.newsletter === true;

    // Update avatar
    const avatarDisplay = document.getElementById('avatar-display');
    if (avatarDisplay) {
        if (profile.avatarColor) {
            avatarDisplay.style.backgroundColor = profile.avatarColor;
        }
        const initials = profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
        document.getElementById('avatar-initials').textContent = initials;
    }
}

function saveProfile() {
    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();
    const bio = document.getElementById('profile-bio').value.trim();
    const timezone = document.getElementById('profile-timezone').value;
    const language = document.getElementById('profile-language').value;
    const notifications = document.getElementById('profile-notifications').checked;
    const newsletter = document.getElementById('profile-newsletter').checked;

    // Validation
    if (!name) {
        showMessage('Please enter your name', 'error');
        return;
    }

    if (!email || !isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    if (bio.length > 200) {
        showMessage('Bio must be 200 characters or less', 'error');
        return;
    }

    const profile = getProfile();
    const updatedProfile = {
        ...profile,
        name,
        email,
        phone,
        bio,
        timezone,
        language,
        notifications,
        newsletter
    };

    saveProfileData(updatedProfile);
    loadProfile();
    showMessage('Profile updated successfully!', 'success');
}

// Dashboard Functions
function updateDashboard() {
    const tasks = getTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    // Update stats if elements exist
    const totalEl = document.getElementById('total-tasks');
    const completedEl = document.getElementById('completed-tasks');
    const pendingEl = document.getElementById('pending-tasks');

    if (totalEl) totalEl.textContent = totalTasks;
    if (completedEl) completedEl.textContent = completedTasks;
    if (pendingEl) pendingEl.textContent = pendingTasks;

    // Update recent tasks on home page
    const recentTasksList = document.getElementById('recent-tasks-list');
    if (recentTasksList) {
        const recentTasks = tasks.slice(0, 5);
        if (recentTasks.length === 0) {
            recentTasksList.innerHTML = `
                <div class="empty-state">
                    <h3>No tasks yet</h3>
                    <p>Create your first task to get started!</p>
                </div>
            `;
        } else {
            recentTasksList.innerHTML = recentTasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}">
                    <div class="task-content">
                        <div class="task-title">${escapeHtml(task.title)}</div>
                        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                        <div class="task-meta">
                            <span class="task-priority ${task.priority}">
                                ${task.priority.toUpperCase()}
                            </span>
                            ${task.dueDate ? `<span>📅 ${formatDate(task.dueDate)}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `message message-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real app, this would clear session data
        // For now, just redirect to home
        window.location.href = 'index.html';
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
