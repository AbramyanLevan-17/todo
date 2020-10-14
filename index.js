let addTask = document.querySelector('.add-task');
let todoList = document.querySelector('.list-uchecked');
let arrayList = [];
const emptyUnch = document.querySelector('.unchecked .empty')




//check empty
const empty = () => {
  if(todoList.children.length){
    emptyUnch.classList.add('hidden');
  }else{
    emptyUnch.classList.remove('hidden')
  }
}

//local storage
const getTodos = () => {
    const data = JSON.parse(localStorage.getItem('todos'));
      if(data){
        for (const elem of data){
           createTask(elem.text)
        }
      }
        empty();
}

// Add a new task
const createTask = (text)=>{

    const newTask = document.createElement('li');
    newTask.classList.add('task');
    newTask.setAttribute('key',Date.now())
    const checkBox = document.createElement('INPUT');
    checkBox.setAttribute('type','checkbox');
    newTask.appendChild(checkBox);
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    newTask.appendChild(textSpan);
    const closeButton = document.createElement('INPUT');
    closeButton.setAttribute('type','button');
    closeButton.value = 'x'
    newTask.appendChild(closeButton);
    todoList.appendChild(newTask);
    let todo = {
      id: Date.now(),
      text: text,
      status: false,
    }
    arrayList = [...arrayList,todo]
    addTask.querySelector('input').value = '';
    localStorage.setItem('todos', JSON.stringify(arrayList));
    handlerDeleteTodo(closeButton,todo.id);
    handlerCheckTodo(checkBox,todo.id);
    empty();

}


addTask.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  createTask(addTask.querySelector('input').value);
 
})

// Delete Todo
const handlerDeleteTodo = (element,id) => {
  element.addEventListener('click',()=>{
    element.parentElement.remove();
    arrayList = arrayList.filter((todo)=>{
      return todo.id !== id;
    })
    localStorage.setItem('todos',JSON.stringify(arrayList));
    empty();
  })

}
// Check Todo
const handlerCheckTodo = (element,id) => {
  element.addEventListener('change',()=>{
  if(element.checked){
    for (const todo of arrayList){
      if(id === todo.id){
        todo.status = true;
        if(todo.status === true){
          element.parentElement.classList.add('task-checked')
        }
      }
    }
    localStorage.setItem('todos',JSON.stringify(arrayList));
  }else{
     for (const todo of arrayList){
      if(id === todo.id){
        todo.status = false;
          element.parentElement.classList.remove('task-checked')
      }
    }
    localStorage.setItem('todos',JSON.stringify(arrayList));
  }
})
}

getTodos();















