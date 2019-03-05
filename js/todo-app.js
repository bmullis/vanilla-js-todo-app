import {renderTodos} from './render-todo-app.js'
import {addEventListeners} from './event-listeners.js'

// Load todos from local storage, or set to empty array
const todos = JSON.parse(localStorage.getItem('todos')) || []

// Initialize filters
const filters = {
  filter: 'All',
  searchQuery: '',
  sortBy: 'Asc'
}

// Initialilze errors
const errors = {
  emptyTodo: ''
}

// Attach the various event listeners
addEventListeners(todos, filters, errors)

// Render the app
renderTodos(todos, filters, errors)