// 1. STATE (Data Layer)
let todos = JSON.parse(localStorage.getItem('todos')) || []; 

// 2. DOM ELEMENTS
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearBtn = document.getElementById('clear-btn');


// 3. RENDER FUNCTION
function renderTodos() {
  // existing Items
  todoList.innerHTML = '';

  // render each item
  todos.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');
  });
}

//clearBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
;
// Clear Completed (Contains a Bug)
clearBtn.addEventListener("click", () => {
  // BUG: This keeps only completed tasks instead of removing them.
  todos = todos.filter(todo => todo.completed);

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
});
// renderTodos()