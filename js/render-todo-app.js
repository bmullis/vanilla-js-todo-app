export const renderTodos = (todos, filters, errors) => {
  document.querySelector('#todoList').innerHTML = ''
  document.querySelector('#formErrors').innerHTML = ''

  let results = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(filters.searchQuery.toLowerCase())
  })

  if (results.length === 0) {
    const noResults = document.createElement('h4')
    noResults.textContent = 'No results found'    
    document.querySelector('#todoList').appendChild(noResults)
  }

  if (filters.sortBy === 'Asc') {
    results.sort((a, b) => {
      return a.text.localeCompare(b.text)
    })
  } else if (filters.sortBy === 'Desc') {
    results.sort((a, b) => {
      return b.text.localeCompare(a.text)
    })
  }

  if (filters.filter === 'Completed') {
    results = results.filter((todo) => {
      return todo.completed === true
    })
  } else if (filters.filter === 'In Progress') {
    results = results.filter((todo) => {
      return todo.completed === false
    })
  }

  results.map((todo) => {
    const newEle = document.createElement('li')
    const newEleBtn = document.createElement('button')
    newEle.innerText = todo.text
    newEle.classList.add('completeTodo')
    newEleBtn.textContent = 'Complete'
    newEleBtn.addEventListener('click', (event) => {
      const ele = todos.map((todo) =>  todo.text).indexOf(event.target.previousSibling.textContent)
      todos[ele].completed = true
      localStorage.setItem('todos', JSON.stringify(todos))
      renderTodos(todos, filters, errors)
    })
    if (todo.completed) newEle.classList.add('completed')
    document.getElementById('todoList').append(newEle)
    if (!todo.completed) newEle.appendChild(newEleBtn)
  })

  const incompleteTodos = results.filter((todo) => (
    todo.completed === false 
  ))

  if (errors.emptyTodo !== '') {
    const errorMessage = document.createElement('p')
    errorMessage.innerText = errors.emptyTodo
    document.querySelector('#formErrors').appendChild(errorMessage)
  }
  
  document.getElementById('todosSummary').innerHTML = `<b>${incompleteTodos.length}</b> incomplete todos showing.`
}
