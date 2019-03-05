import {renderTodos} from './render-todo-app.js'

export const addEventListeners = (todos, filters, errors) => {
  document.querySelector('#sortTodos').addEventListener('input', (event) => {
    filters.sortBy = event.target.value
    renderTodos(todos, filters, errors)
  })

  document.querySelector('#filterTodos').addEventListener('input', (event) => {
    filters.filter = event.target.value
    renderTodos(todos, filters, errors)
  })

  document.querySelector('#searchTodos').addEventListener('input', (event) => {
    filters.searchQuery = event.target.value
    renderTodos(todos, filters, errors)
  })

  document.querySelector('#newTodoForm').addEventListener('submit', (event) => {
    event.preventDefault()
    const newTodoTitle = event.target.elements.newTodo.value.trim()
    if (!newTodoTitle) {
      errors.emptyTodo = '🧐I think you forgot to type something'
      renderTodos(todos, filters.searchQuery)
      return
    } else {
      errors.emptyTodo = ''
    }
    todos.push({ text: newTodoTitle, completed: false })
    localStorage.setItem('todos', JSON.stringify(todos))
    event.target.elements.newTodo.value = ''

    renderTodos(todos, filters, errors)
  })
}