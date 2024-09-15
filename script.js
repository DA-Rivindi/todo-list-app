// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('todo-input');
    const category = document.getElementById('category').value;
    const dueDatetime = document.getElementById('due-datetime').value;
    
    if (taskInput.value.trim() === '') return; // Do nothing if the input is empty
    
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', 'active'); // Default to active
    taskItem.id = `task-${Date.now()}`;
    taskItem.draggable = true;
    
    // Format the due date text if provided
    const dueText = dueDatetime ? ` (Due: ${dueDatetime})` : '';
    taskItem.innerHTML = `
        <input type="checkbox" class="status-checkbox" onclick="toggleStatus(this)" />
        ${taskInput.value}${dueText}
        <button class="remove-btn" onclick="removeTask(this.parentElement)">X</button>
    `;
    
    // Add drag-and-drop functionality
    taskItem.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
    
    taskItem.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    
    taskItem.addEventListener('drop', (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        const dropTarget = event.target.closest('li');
        
        if (dropTarget && draggedElement !== dropTarget) {
            document.getElementById('todo-list').insertBefore(draggedElement, dropTarget.nextSibling);
        }
    });
    
    // Append the new task to the list
    document.getElementById('todo-list').appendChild(taskItem);
    
    // Clear input fields after adding a task
    taskInput.value = '';
    document.getElementById('due-datetime').value = '';
}

// Function to remove a task
function removeTask(taskElement) {
    taskElement.classList.add('removing');
    setTimeout(() => {
        taskElement.remove();
    }, 300); // Match the duration of the fade-out animation
}

// Function to filter tasks by status
function filterTasks(status) {
    const tasks = document.querySelectorAll('#todo-list li');
    tasks.forEach(task => {
        if (status === 'all' || task.classList.contains(status)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

// Function to search tasks by text
function searchTasks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const tasks = document.querySelectorAll('#todo-list li');
    
    tasks.forEach(task => {
        if (task.textContent.toLowerCase().includes(searchTerm)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

// Function to toggle task status between active and completed
function toggleStatus(checkbox) {
    const taskItem = checkbox.parentElement;
    const isChecked = checkbox.checked;
    
    if (isChecked) {
        taskItem.classList.remove('active');
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
        taskItem.classList.add('active');
    }
}

// Toggle Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    document.querySelector('.app-container').classList.toggle('dark-mode');
    document.getElementById('todo-input').classList.toggle('dark-mode');
    document.getElementById('add-btn').classList.toggle('dark-mode');
    document.getElementById('search').classList.toggle('dark-mode');
    document.getElementById('due-datetime').classList.toggle('dark-mode');
    const tasks = document.querySelectorAll('#todo-list li');
    tasks.forEach(task => task.classList.toggle('dark-mode'));
    
    // Toggle button icon based on theme
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.textContent = isDarkMode ? '☀️' : '🌙';
});

// Initialize Flatpickr
flatpickr("#due-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true
});
