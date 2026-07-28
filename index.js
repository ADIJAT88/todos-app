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
      <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button class="delete-btn" data-id="${todo.id}">X</button>
    `;

 todoList.appendChild(li);
    });
    // UPDATE THE FOOTER STAT
    const activeCount = todos.filter((t) => !t.completed).length;
    taskCount.textContent = `${activeCount} task${activeCount === 1 ? '' : 's'} left`;


}
// ACTIONS
const addTodo = (text) => {
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
  updateTaskCount();
};
//HELPER FOR HTML INJECTION ATTACKS
function escapeHtml(str){
  return str.replace(/&/g,'&amp;').replace(/>/g,'&gt;');

}
function updateTaskCount() {
    taskCount.textContent = `Total Tasks: ${todos.length}`;
}

renderTodos();
updateTaskCount();
//EVENT LISTENERS
todoForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  if (!todoInput.value.trim()) return;
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
// ACTIONS = C, R, U, D
const toggleTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
  updateTaskCount();
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  // Paste your Firebase config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveTask(task) {
  await addDoc(collection(db, "tasks"), {
    text: task,
    completed: false
  });
}

async function loadTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}

loadTasks();

// Clear Completed
clearBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
  updateTaskCount();
});





// renderTodos()