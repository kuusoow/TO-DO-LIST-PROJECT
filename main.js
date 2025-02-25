const todoForm=document.querySelector("#todo-form")
const todoInput =document.querySelector(".todo-input")
const todoList =document.querySelector('.todo-list')



todoForm.addEventListener('submit' , addTask)

function addTask(e){
    e.preventDefault();

const taskText =todoInput.value.trim()
if(taskText !== ""){
    const task={
        id:Date.now(),
        text:taskText,
        Completed:false
    }
    addTaskToDOM(task)
    saveToLocalStorage(task)
      todoInput.value = ""
   
}

}

function addTaskToDOM(task){
    const li =document.createElement('li')
    li.className=`todo-item${task.Completed ? 'completed' : ''}`
    li.dataset.id=task.id
    li.innerHTML =`
             <input type="checkbox" class="completed-check" ${task.Completed ? "checked" : ""}>
            <span class="task">${task.text}</span>
            <button class="editbtn">Edit</button>
            <button class="deletebtn">Delete</button>
    `
    todoList.appendChild(li)
    attachEventlisteners(li ,task)
}

function attachEventlisteners(li,task){
    const deletebtn =li.querySelector('.deletebtn')
    const editbtn =li.querySelector(".editbtn")
    const checkbox =li.querySelector('.completed-check')

    deletebtn.addEventListener('click', function(){
        handleDelete(task.id,li)
    })

    editbtn.addEventListener('click', function(){
        handleEdit(task.id , li)
    })
    // checkbox.addEventListener('change', function(){
    //     handlecheckbox(task.id , li, checkbox.Completed)

    // })

    checkbox.addEventListener('change', function () {
        toggleTaskCompletion(task.id, li, checkbox.checked);
    });
     
    
}


function toggleTaskCompletion(taskId, li, isCompleted) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id == taskId);
    if (task) {
        task.completed = isCompleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('completed', isCompleted);
    }
}
// function handlecheckbox(taskId,li,iscompleted){
//     let tasks=getTasksFromLocalStorage()
//     let task =tasks.find(task =>task.id==taskId)
//     if(task){
//         task.Completed=iscompleted
//         localStorage.setItem('tasks', JSON.stringify(tasks))
//         // localStorage.setItem('tasks', JSON.stringify(tasks))
//         li.classList.toggle('completed' , iscompleted)
        
//     }
// }




function handleDelete(id, li){
    let   tasks =getTasksFromLocalStorage();
  tasks = tasks.filter(task =>task.id != id)
  localStorage.setItem('tasks', JSON.stringify(tasks))

    li.remove()

}
 
function handleEdit(id ,li){
let taskspan =li.querySelector(".task")

let newtext = prompt("edit your task :", taskspan.textContent)

if(newtext !== null &&newtext.trim( )!== ''){
    taskspan.textContent= newtext
    let tasks =getTasksFromLocalStorage()
   let task= tasks.find(task =>task.id==id)
    if(task){
        task.text =newtext
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

}





document.addEventListener('DOMContentLoaded' , loadTasks)

function loadTasks(){
    const tasks = getTasksFromLocalStorage()
    tasks.forEach(task => {
        addTaskToDOM(task)
    });
}

function  saveToLocalStorage(task){
    const tasks = getTasksFromLocalStorage()
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


function getTasksFromLocalStorage(){
    const oldTask = JSON.parse(localStorage.getItem("tasks")) || [] ;
    return oldTask

}
