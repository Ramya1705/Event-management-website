
// DOM Elements
const sideNavbar = document.querySelector('.side-navbar');
const menuItems = document.querySelectorAll('.menu-item');
const tabContents = document.querySelectorAll('.tab-content');
const addEventBtns = document.querySelectorAll('#add-event-btn, #add-event-btn-2');
const addUserBtn = document.querySelector('#add-user-btn');
const eventModal = document.querySelector('#event-modal');
const userModal = document.querySelector('#user-modal');
const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const eventForm = document.querySelector('#event-form');
const userForm = document.querySelector('#user-form');

// Sample data for events
let events = [
{ id: 1, name: 'Annual Tech Symposium', date: '2025-05-15', location: 'Main Auditorium', status: 'active', capacity: 500, registrations: 320, price: 500 },
{ id: 2, name: 'Cultural Fest', date: '2025-05-28', location: 'College Grounds', status: 'pending', capacity: 1000, registrations: 756, price: 300 },
{ id: 3, name: 'Alumni Meetup', date: '2025-04-10', location: 'Conference Hall', status: 'cancelled', capacity: 200, registrations: 180, price: 0 },
{ id: 4, name: 'Coding Competition', date: '2025-06-05', location: 'Computer Labs', status: 'active', capacity: 150, registrations: 124, price: 200 },
{ id: 5, name: 'Sports Meet', date: '2025-07-12', location: 'Sports Complex', status: 'pending', capacity: 300, registrations: 210, price: 100 }
];

// Sample data for users
let users = [
{ id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', joinedDate: '2025-01-15', status: 'active' },
{ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', joinedDate: '2025-02-22', status: 'active' },
{ id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Organizer', joinedDate: '2025-03-10', status: 'pending' },
{ id: 4, name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'User', joinedDate: '2025-03-15', status: 'active' },
{ id: 5, name: 'Robert Brown', email: 'robert.b@example.com', role: 'Organizer', joinedDate: '2025-04-05', status: 'inactive' }
];

// Variable to track if we're editing an existing item
let currentEditId = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
// Toggle side navbar in mobile view
const toggleBtn = document.querySelector('.toggle-btn');
if (toggleBtn) {
toggleBtn.addEventListener('click', () => {
    sideNavbar.classList.toggle('expanded');
});
}

// Tab navigation
menuItems.forEach(item => {
item.addEventListener('click', () => {
    const tabId = item.getAttribute('data-tab');
    
    // Active menu item
    menuItems.forEach(item => item.classList.remove('active'));
    item.classList.add('active');
    
    // Active tab content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
});
});

// Update the tables
updateEventsTable();
updateUsersTable();

// Event delegation for dynamic elements
document.addEventListener('click', function(e) {
// Edit event buttons
if (e.target.classList.contains('edit-event')) {
    const eventId = parseInt(e.target.getAttribute('data-id'));
    const event = events.find(event => event.id === eventId);
    
    if (event) {
        currentEditId = eventId;
        document.querySelector('#event-modal .modal-title').textContent = 'Edit Event';
        document.getElementById('event-name').value = event.name;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-location').value = event.location;
        document.getElementById('event-status').value = event.status;
        document.getElementById('event-capacity').value = event.capacity;
        document.getElementById('event-price').value = event.price;
        
        if (document.getElementById('event-time')) {
            document.getElementById('event-time').value = '12:00';
        }
        
        if (document.getElementById('event-description')) {
            document.getElementById('event-description').value = 'Description for ' + event.name;
        }
        
        eventModal.classList.add('active');
    }
}

// Delete event buttons
if (e.target.classList.contains('delete-event')) {
    const eventId = parseInt(e.target.getAttribute('data-id'));
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== eventId);
        alert('Event deleted successfully!');
        updateEventsTable();
    }
}

// Edit user buttons
if (e.target.classList.contains('edit-user')) {
    const userId = parseInt(e.target.getAttribute('data-id'));
    const user = users.find(user => user.id === userId);
    
    if (user) {
        currentEditId = userId;
        document.querySelector('#user-modal .modal-title').textContent = 'Edit User';
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        
        const roleLower = user.role.toLowerCase();
        document.getElementById('user-role').value = roleLower;
        
        document.getElementById('user-status').value = user.status;
        userModal.classList.add('active');
    }
}

// Delete user buttons
if (e.target.classList.contains('delete-user')) {
    const userId = parseInt(e.target.getAttribute('data-id'));
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== userId);
        alert('User deleted successfully!');
        updateUsersTable();
    }
}
});

// Open event modal
addEventBtns.forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelector('#event-modal .modal-title').textContent = 'Add New Event';
    eventForm.reset();
    currentEditId = null;
    eventModal.classList.add('active');
});
});

// Open user modal
if (addUserBtn) {
addUserBtn.addEventListener('click', () => {
    document.querySelector('#user-modal .modal-title').textContent = 'Add New User';
    userForm.reset();
    currentEditId = null;
    userModal.classList.add('active');
});
}

// Close modals
closeBtns.forEach(btn => {
btn.addEventListener('click', () => {
    eventModal.classList.remove('active');
    userModal.classList.remove('active');
});
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
if (e.target === eventModal) {
    eventModal.classList.remove('active');
}
if (e.target === userModal) {
    userModal.classList.remove('active');
}
});

// Event form submission
eventForm.addEventListener('submit', (e) => {
e.preventDefault();

const eventName = document.getElementById('event-name').value;
const eventDate = document.getElementById('event-date').value;
const eventLocation = document.getElementById('event-location').value;
const eventStatus = document.getElementById('event-status').value;
const eventCapacity = parseInt(document.getElementById('event-capacity').value);
const eventPrice = parseInt(document.getElementById('event-price').value);

if (currentEditId) {
    // Update existing event
    const index = events.findIndex(event => event.id === currentEditId);
    if (index !== -1) {
        events[index] = {
            ...events[index],
            name: eventName,
            date: eventDate,
            location: eventLocation,
            status: eventStatus,
            capacity: eventCapacity,
            price: eventPrice
        };
        alert('Event updated successfully!');
    }
} else {
    // Add new event
    const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        name: eventName,
        date: eventDate,
        location: eventLocation,
        status: eventStatus,
        capacity: eventCapacity,
        registrations: 0,
        price: eventPrice
    };
    
    events.push(newEvent);
    alert('Event saved successfully!');
}

updateEventsTable();
eventModal.classList.remove('active');
currentEditId = null;
});

// User form submission
userForm.addEventListener('submit', (e) => {
e.preventDefault();

const userName = document.getElementById('user-name').value;
const userEmail = document.getElementById('user-email').value;
const userRole = document.getElementById('user-role').value;
const userStatus = document.getElementById('user-status').value;

if (currentEditId) {
    // Update existing user
    const index = users.findIndex(user => user.id === currentEditId);
    if (index !== -1) {
        users[index] = {
            ...users[index],
            name: userName,
            email: userEmail,
            role: userRole.charAt(0).toUpperCase() + userRole.slice(1),
            status: userStatus
        };
        alert('User updated successfully!');
    }
} else {
    // Add new user
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: userName,
        email: userEmail,
        role: userRole.charAt(0).toUpperCase() + userRole.slice(1),
        joinedDate: new Date().toISOString().split('T')[0],
        status: userStatus
    };
    
    users.push(newUser);
    alert('User saved successfully!');
}

updateUsersTable();
userModal.classList.remove('active');
currentEditId = null;
});

// Profile form submission
document.getElementById('profile-form').addEventListener('submit', (e) => {
e.preventDefault();
alert('Profile updated successfully!');
});

// Password form submission
document.getElementById('password-form').addEventListener('submit', (e) => {
e.preventDefault();

const currentPassword = document.getElementById('current-password').value;
const newPassword = document.getElementById('new-password').value;
const confirmPassword = document.getElementById('confirm-password').value;

if (!currentPassword || !newPassword || !confirmPassword) {
    alert('Please fill all password fields.');
    return;
}

if (newPassword !== confirmPassword) {
    alert('New password and confirm password do not match.');
    return;
}

alert('Password updated successfully!');
document.getElementById('password-form').reset();
});
});

// Update Events table
function updateEventsTable() {
const eventsTables = document.querySelectorAll('#dashboard table tbody, #events table tbody');

eventsTables.forEach(table => {
table.innerHTML = '';

events.forEach(event => {
    const row = document.createElement('tr');
    
    if (table.closest('#dashboard')) {
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.location}</td>
            <td><span class="status ${event.status}">${capitalizeFirstLetter(event.status)}</span></td>
            <td class="action-icons">
                <i class="fas fa-edit edit-event" data-id="${event.id}"></i>
                <i class="fas fa-trash-alt delete-event" data-id="${event.id}"></i>
            </td>
        `;
    } else {
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.location}</td>
            <td>${event.capacity}</td>
            <td>${event.registrations}</td>
            <td><span class="status ${event.status}">${capitalizeFirstLetter(event.status)}</span></td>
            <td class="action-icons">
                <i class="fas fa-edit edit-event" data-id="${event.id}"></i>
                <i class="fas fa-trash-alt delete-event" data-id="${event.id}"></i>
            </td>
        `;
    }
    
    table.appendChild(row);
});
});
}

// Update Users table
function updateUsersTable() {
const usersTable = document.querySelector('#users table tbody');
if (!usersTable) return;

usersTable.innerHTML = '';

users.forEach(user => {
const row = document.createElement('tr');
row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.role}</td>
    <td>${formatDate(user.joinedDate)}</td>
    <td><span class="status ${user.status}">${capitalizeFirstLetter(user.status)}</span></td>
    <td class="action-icons">
        <i class="fas fa-edit edit-user" data-id="${user.id}"></i>
        <i class="fas fa-trash-alt delete-user" data-id="${user.id}"></i>
    </td>
`;
usersTable.appendChild(row);
});
}

// Helper function to format dates
function formatDate(dateString) {
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date(dateString);
return date.toLocaleDateString('en-US', options);
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
// When opening modal
function openModal(modal) {
document.body.classList.add('modal-open');
modal.classList.add('active');
}

// When closing modal
function closeModal(modal) {
document.body.classList.remove('modal-open');
modal.classList.remove('active');
}

// Update your modal open/close event listeners to use these functions
addEventBtns.forEach(btn => {
btn.addEventListener('click', () => {
document.querySelector('#event-modal .modal-title').textContent = 'Add New Event';
eventForm.reset();
currentEditId = null;
openModal(eventModal);
});
});

closeBtns.forEach(btn => {
btn.addEventListener('click', () => {
closeModal(eventModal);
closeModal(userModal);
});
});

window.addEventListener('click', (e) => {
if (e.target === eventModal) {
closeModal(eventModal);
}
if (e.target === userModal) {
closeModal(userModal);
}
});


