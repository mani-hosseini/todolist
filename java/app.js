const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const itemsContainer = document.querySelector('section');

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(taskText, checkItem = false) {
    const newItem = document.createElement('div');
    newItem.classList.add('items');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checkItem;
    newItem.appendChild(checkbox);

    const taskParagraph = document.createElement('p');
    taskParagraph.textContent = taskText;
    newItem.appendChild(taskParagraph);

    const trashIcon = document.createElement('img');
    trashIcon.src = '../img/—Pngtree—vector%20trash%20icon_4152654.png';
    trashIcon.classList.add('recycle-bin');
    newItem.appendChild(trashIcon);

    checkbox.addEventListener('change', () => {
        newItem.style.backgroundColor = checkbox.checked ? '#efb3b3' : '';
        updateStorage();
    });

    trashIcon.addEventListener('click', () => {
        newItem.remove();
        updateStorage();
    });

    if (checkItem) {
        newItem.style.backgroundColor = '#efb3b3';
    }

    itemsContainer.appendChild(newItem);
}

function updateStorage() {
    const tasks = [];
    document.querySelectorAll('.items').forEach(item => {
        tasks.push({
            text: item.querySelector('p').textContent,
            completed: item.querySelector('input').checked
        });
    });
    saveTasks(tasks);
}

function addItem(e) {
    e.preventDefault();
    const taskText = input.value.trim();

    createTask(taskText);
    updateStorage();
    input.value = '';
}

function loadTasks() {
    const tasks = getTasks();
    for (let i = 0; i < tasks.length; i++) {
        createTask(tasks[i].text, tasks[i].completed);
    }
}

form.addEventListener('submit', addItem);
window.addEventListener('load', loadTasks);
