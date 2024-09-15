// Get the button, input box, and list
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const themeToggleButton = document.getElementById('theme-toggle');

// Add event listener to the "Add" button
addButton.addEventListener('click', addTask);

// Function to add tasks
function addTask() {
  const taskText = todoInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  // Create remove button with icon
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-btn');
  removeButton.innerHTML = '<i class="fas fa-trash"></i>'; // FontAwesome trash icon
  removeButton.addEventListener('click', () => listItem.remove());

  listItem.appendChild(removeButton);
  todoList.appendChild(listItem);
  todoInput.value = '';

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
  });
}

// Dark Mode Toggle
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggleButton.textContent = isDarkMode ? '🌞' : '🌙';
});
