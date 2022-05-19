if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: '/' })
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err));
} else {
    console.log('Service worker is not supported.')
}

const todoItemContainer = document.getElementById('todoItems');
function handleAddClick(event) {
    const newItem = document.getElementsByName('task')[0].value;

    if (!newItem) return;

    //create new element
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.addEventListener('click', compleTask);
    const node = document.createTextNode(newItem);
    listItem.appendChild(node);

    //append new element to todoItem
    todoItemContainer.appendChild(listItem);
}

//Helper function to mark task as complete or in-complete
function compleTask() {
    const item = this;
    if (item.classList.contains('line-through')) {
        item.classList.remove('line-through')
    } else {
        item.classList.add('line-through')
    }
}