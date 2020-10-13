function onPageLoaded() {
let addTask = document.querySelector('.add-task');
let todoList = document.querySelector('.list-uchecked');
const emptyUnch = document.querySelector('.unchecked .empty')




//check empty
const empty = () => {
  if(todoList.children.length){
    emptyUnch.classList.add('hidden');
  }else{
    emptyUnch.classList.remove('hidden')
  }
}
// Add a new task
const getTodos = () => {
  const data = localStorage.getItem("todos");

        if (data) {
            todoList.innerHTML = data;
        }
        console.log(todoList)
        const deleteButtons = todoList.querySelectorAll("input[type=button]");
        for (const button of deleteButtons) {
          handlerDeleteTodo(button);
        }
        empty();
       
}
const createTask = (text)=>{

    const newTask = document.createElement('li');
    newTask.classList.add('task');
    const checkBox = document.createElement('INPUT');
    checkBox.setAttribute('type','checkbox');
    newTask.appendChild(checkBox);
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    newTask.appendChild(textSpan);
    const closeButton = document.createElement('INPUT');
    closeButton.setAttribute('type','button');
    closeButton.value = 'X'
    newTask.appendChild(closeButton);
    todoList.appendChild(newTask);
    addTask.querySelector('input').value = '';
    localStorage.setItem('todos', todoList.innerHTML);
    handlerDeleteTodo(closeButton);
    handlerCheckTodo(checkBox);
    empty();
}


addTask.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  createTask(addTask.querySelector('input').value);
 
})

// Delete Todo
const handlerDeleteTodo = (element) => {
  element.addEventListener('click',()=>{
    element.parentElement.remove();
    console.log(todoList);
    empty();
  })

}
// Check Todo
const handlerCheckTodo = (element) => {
  element.addEventListener('change',()=>{
    if(element.checked){
      element.parentElement.classList.add('task-checked');
    }else{
      element.parentElement.classList.remove('task-checked');
    }
   
  })
}
getTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
















