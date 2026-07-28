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
 
 li.innerHTML = `
 <input type=checkbox"  ${todo.completed ? 'checked' : ''} data -id="${todo.id}">
 < span class="todo-text">${todo.text}</span>
 <button class="delete-btn" data-id="${todo.id}">X</button>
 `;

 todoList.appendChild(li);
    });
    //UPDATE THE FOOTER STAT
    const activeCount = todos.filter((t) => !t.completed).length;
    taskCount.textContent(`$ {activeCount} tasks${activeCount === 1 ? '': 's'} left`)


}
// ACTIONS
const addTodo = () => {
  const newTodo ={
    id: Data.now(),
    text: text.trim(),
    completed: false //boolean
  };
todo.push(newTodo);
}
//HELPER FOR HTML INJECTION ATTACKS
function escapeHtml(str){
  return str.replace(/&/g,'&amp;').replace(/>/g,'&gt;');

}

//EVENT LISTENERS
todoForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  if (!todoInput.ariaValueMax.trim()) return;
  addTodo(todoInput.value);
  // todoInput.value = '';
});

// for delete and toggle
todoList.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  if (e.target.matches('input[type="checkbox"]')) {
    toggleTodo(id);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTodo(id);
  }
});
//ACTIONS = C, R, U, D
const addTodo = () => {-
} 
const toggleTodo = (id) => {
  todos =todos.map((todo) => todo.id === id ? {...todo, complete: !todo.completed }  : todo);
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