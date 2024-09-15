// Get the button, input box, and list
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Add event listener to the "Add" button
addButton.addEventListener('click', addTask);

// Function to add tasks
function addTask() {
  const taskText = todoInput.value.trim();

  // Check if the input is empty
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  // Create new list item (li)
  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  // Create remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-btn');
  removeButton.addEventListener('click', () => listItem.remove());

  // Add remove button to list item
  listItem.appendChild(removeButton);

  // Add the new task to the list
  todoList.appendChild(listItem);

  // Clear input box
  todoInput.value = '';

  // Mark task as completed when clicked
  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
  });
}
