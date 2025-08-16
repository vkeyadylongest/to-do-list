document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage
    loadTasks();
    
    // Add task event
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Create task element
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item adding';
        
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-actions">
                <button class="complete-btn">✓</button>
                <button class="delete-btn">✕</button>
            </div>
        `;
        
        // Add to list
        taskList.appendChild(taskItem);
        
        // Trigger animation
        setTimeout(() => {
            taskItem.classList.remove('adding');
        }, 10);
        
        // Add event listeners to buttons
        taskItem.querySelector('.complete-btn').addEventListener('click', completeTask);
        taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
        
        // Save to localStorage
        saveTasks();
        
        // Clear input
        taskInput.value = '';
        taskInput.focus();
    }
    
    function completeTask(e) {
        const taskItem = e.target.closest('.task-item');
        taskItem.classList.toggle('completed');
        saveTasks();
    }
    
    function deleteTask(e) {
        const taskItem = e.target.closest('.task-item');
        taskItem.classList.add('removing');
        
        // Remove after animation completes
        taskItem.addEventListener('animationend', () => {
            taskItem.remove();
            saveTasks();
        });
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                taskItem.innerHTML = `
                    <span class="task-text">${task.text}</span>
                    <div class="task-actions">
                        <button class="complete-btn">✓</button>
                        <button class="delete-btn">✕</button>
                    </div>
                `;
                
                taskList.appendChild(taskItem);
                
                // Add event listeners to buttons
                taskItem.querySelector('.complete-btn').addEventListener('click', completeTask);
                taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
            });
        }
    }
});