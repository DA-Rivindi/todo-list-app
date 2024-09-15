// Function to add a task
function addTask() {
    const taskInput = document.getElementById('todo-input');
    const category = document.getElementById('category').value;
    const dueDate = document.getElementById('due-date').value;
    
    if (taskInput.value.trim() === '') return;
    
    const taskItem = document.createElement('li');
    taskItem.classList.add(category);
    taskItem.id = `task-${Date.now()}`;
    taskItem.draggable = true;
    
    taskItem.innerHTML = `
        ${taskInput.value} (Due: ${dueDate}) 
        <button class="remove-btn" onclick="removeTask(this.parentElement)">X</button>
    `;
    
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
    
    document.getElementById('todo-list').appendChild(taskItem);
    taskInput.value = '';
}

// Function to remove a task
function removeTask(taskElement) {
    taskElement.classList.add('removing');
    setTimeout(() => {
        taskElement.remove();
    }, 300); // Match the duration of the fade-out animation
}

// Function to filter tasks
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

// Function to search tasks
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

// Toggle Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.app-container').classList.toggle('dark-mode');
    document.getElementById('todo-input').classList.toggle('dark-mode');
    document.getElementById('add-btn').classList.toggle('dark-mode');
    const tasks = document.querySelectorAll('#todo-list li');
    tasks.forEach(task => task.classList.toggle('dark-mode'));
});
