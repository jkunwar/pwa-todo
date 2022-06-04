if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa-todo/service-worker.js', { scope: '/pwa-todo/' })
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err));
} else {
    console.log('Service worker is not supported.')
}
const todoItemContainer = document.getElementById('todoItems');

const items = getFromLocalStorage('todoItems');
const todoItems = items ? JSON.parse(items) : [];
if (todoItems) {
    todoItems.forEach(todo => generateHTMLForTodoList(todo))
}

function handleAddClick(event) {
    const newItem = document.getElementsByName('task')[0].value;

    if (!newItem) return;

    const item = { title: newItem, isComplete: false };
    generateHTMLForTodoList(item)

    todoItems.push(item)
    setToLocalStorage('todoItems', JSON.stringify(todoItems))
}

function generateHTMLForTodoList(item) {
    //create new element
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.addEventListener('click', compleTask);
    const node = document.createTextNode(item.title);
    if (item.isComplete) {
        listItem.classList.add('line-through')
    }
    listItem.appendChild(node);

    //append new element to todoItem
    todoItemContainer.prepend(listItem);
}

//Helper function to mark task as complete or in-complete
function compleTask() {
    const selectedItem = this;
    const isTaskCompleted = selectedItem.classList.contains('line-through')
    if (isTaskCompleted) {
        selectedItem.classList.remove('line-through')
    } else {
        selectedItem.classList.add('line-through')
    }

    todoItems.map(todoItem => {
        if (selectedItem.textContent == todoItem.title) {
            todoItem.isComplete = !isTaskCompleted
        }

        return todoItem
    })

    setToLocalStorage('todoItems', JSON.stringify(todoItems))
}

function getFromLocalStorage(key) {
    return window.localStorage.getItem(key)
}

function setToLocalStorage(key, value) {
    window.localStorage.setItem(key, value)
}

window.addEventListener('online', () => {
    console.log('cdcskcnj')
    const internetStatus = document.getElementById('internetStatus')
    internetStatus.style.display = 'none'
});

window.addEventListener('offline', () => {
    console.log('cdnsjhn')
    const internetStatus = document.getElementById('internetStatus')
    internetStatus.style.display = 'block'
});