document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('tasks');
    const completedList = document.getElementById('completed-tasks');
    const progressBar = document.getElementById('progress-bar');

    let tasks = [];
    let completedTasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;
        const date = document.getElementById('task-date').value;
        const priority = document.getElementById('task-priority').value;

        const task = {
            title,
            desc,
            date,
            priority
        };

        tasks.push(task);
        renderTasks();
        updateProgress();
        
        taskForm.reset();
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task');
            li.innerHTML = `
                <span>${task.title} - ${task.desc} - ${task.date} - ${task.priority}</span>
                <div>
                    <button onclick="completeTask(${index})">Complete</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.completeTask = (index) => {
        completedTasks.push(tasks[index]);
        tasks.splice(index, 1);
        renderTasks();
        renderCompletedTasks();
        updateProgress();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
        updateProgress();
    };

    function renderCompletedTasks() {
        completedList.innerHTML = '';
        completedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task');
            li.innerHTML = `
                <span>${task.title} - ${task.desc} - ${task.date} - ${task.priority}</span>
            `;
            completedList.appendChild(li);
        });
    }
    function updateProgress() {
        const totalTasks = tasks.length + completedTasks.length;
        const completedPercentage = totalTasks === 0 ? 0 : (completedTasks.length / totalTasks) * 100;
        const progressBarFill = progressBar.querySelector('::after');
    
        progressBar.style.setProperty('--progress', `${completedPercentage}%`);
        progressBar.style.setProperty('--progress-width', `${completedPercentage}%`);
        progressBar.innerHTML = `<span>${completedPercentage.toFixed(2)}% Completed</span>`;
    }

});
