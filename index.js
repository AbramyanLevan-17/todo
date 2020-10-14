const addTask = document.querySelector('.add-task');
const todoList = document.querySelector('.list-uchecked');
const todoListChecked = document.querySelector('.list-checked')
let arrayList = [];
const emptyUnch = document.querySelector('.unchecked .empty');
const uncheckedBar = document.getElementById('unchecked-bar');
const checkedBar = document.getElementById('checked-bar');
const progressAmount = 10;



// set unchecked bar 
const setUncheckedBar = () =>{
  
  let count = arrayList.filter(todo=>{
    return todo.status === false;
  });
  if(count.length){
    let amount = count.length * progressAmount;
    uncheckedBar.style.width = amount + '%';
    uncheckedBar.classList.remove('hidden')
  }else{
    uncheckedBar.classList.add('hidden');
  }
  
}
const setCheckedBar = () =>{
  let count = arrayList.filter(todo=>{
    return todo.status === true;
  });
  if(count.length){
    let amount = count.length * progressAmount;
    checkedBar.style.width = amount + '%';
    checkedBar.classList.remove('hidden')
  }else{
    checkedBar.classList.add('hidden');
  }
}

// set counter unchecked
const setCounterUnch = () =>{
  let count = arrayList.filter(todo=>{
    return todo.status === false;
  });
  document.querySelector('.count-unchecked').textContent = count.length;
}

// set counter checked
const setCounter = () =>{
  let count = arrayList.filter(todo=>{
    return todo.status === true;
  });
  document.querySelector('.count-checked').textContent = count.length;
}
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
           createTask(elem.text,elem.status)
        }
      }
        empty();
        setUncheckedBar();
        setCheckedBar();
        setCounterUnch();
        setCounter();
}

// Add a new task
const createTask = (text,status)=>{

    const newTask = document.createElement('li');
    newTask.classList.add('task');
    const checkBox = document.createElement('INPUT');
    checkBox.setAttribute('type','checkbox');
    newTask.appendChild(checkBox);
    const textSpan = document.createElement('span');
    textSpan.classList.add('edit')
    textSpan.textContent = text;
    newTask.appendChild(textSpan);
    const closeButton = document.createElement('INPUT');
    closeButton.setAttribute('type','button');
    closeButton.value = 'x'
    newTask.appendChild(closeButton);
    todoList.appendChild(newTask);
    let todo = {
      id: Math.random(),
      text: text,
      status: status,
    }
    arrayList = [...arrayList,todo]
    addTask.querySelector('input').value = '';
    localStorage.setItem('todos', JSON.stringify(arrayList));
    handlerDeleteTodo(closeButton,todo.id);
    handlerCheckTodo(checkBox,todo.id,todo.status);
    handlerEdit(textSpan,todo.id)
    empty();
    setCounterUnch();
    setCounter();
    setUncheckedBar();
    setCheckedBar();


}


addTask.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  createTask(addTask.querySelector('input').value,false);
 
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
    setCounterUnch();
    setCounter();
    setUncheckedBar();
    setCheckedBar();
  })

}
// Check Todo
const handlerCheckTodo = (element,id,status) => {
  if(status === true){
    element.checked = true;
    for (const todo of arrayList){
      if(id === todo.id){
        todo.status = true;
        if(todo.status === true){
          element.parentElement.classList.add('task-checked');
          element.parentElement.remove();
          todoListChecked.appendChild(element.parentElement)
        }
      }
    }
    localStorage.setItem('todos',JSON.stringify(arrayList));
  }
  element.addEventListener('change',()=>{
  if(element.checked){
    for (const todo of arrayList){
      if(id === todo.id){
        todo.status = true;
        if(todo.status === true){
          element.parentElement.classList.add('task-checked');
          element.parentElement.remove();
          todoListChecked.appendChild(element.parentElement)
        }
      }
    }
    localStorage.setItem('todos',JSON.stringify(arrayList));
  }else{
     for (const todo of arrayList){
      if(id === todo.id){
        todo.status = false;
          element.parentElement.classList.remove('task-checked')
          element.parentElement.remove();
          todoList.appendChild(element.parentElement)
      }
    }
    localStorage.setItem('todos',JSON.stringify(arrayList));
  }
  setCounterUnch();
  setCounter();
  setUncheckedBar();
  setCheckedBar();
})
}

// edit task
const handlerEdit = (element,id)=>{
    element.addEventListener('dblclick',()=>{
      
      const editInput = document.createElement('input');
      editInput.classList.add('edit-input')
      editInput.value = element.textContent;
      console.log('dblclick')
        element.parentElement.replaceChild(editInput, element);
      let temple = document.querySelector('.edit-input');
        temple.addEventListener('change',()=>{
          for(const todo of arrayList){
            if(todo.id === id){
              todo.text = temple.value;
            }
          }
          localStorage.setItem('todos',JSON.stringify(arrayList));
          temple.parentElement.replaceChild(element, temple);
          element.textContent = temple.value
        })
    })
}


getTodos();















