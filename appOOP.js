//selectors

class ToDo{
    constructor(){
        this.todoInput = document.querySelector(".todo-input");
        this.todoButton = document.querySelector(".todo-button");
        this.todoList = document.querySelector(".todo-list");
        this.toComplete = document.querySelector(".select");
        this.select = document.querySelector(".filter-todo");
    }

    addTodo(event){
        event.preventDefault();
    
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText =  this.todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //save todos
        saveLocalTodos(this.todoInput.value);
        this.todoInput.value = "";
        //Completed button
        const completedButton=document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton)
        //remove button
        const trashButton=document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to ul list
        //todoList.appendChild(todoDiv);
        this.todoList.appendChild(todoDiv)
    
    }
    deleteTodo(event){
        const item = event.target;
        console.log(item.classList[0]);
    
        if (item.classList[0] === "trash-btn"){
            const todo = item.parentElement;
            todo.classList.add("fall");
            removeLocalTodos(todo);
            todo.addEventListener("transitionend", function(){
                todo.remove();
            })
           
        }
        if (item.classList[0] === "complete-btn"){
            const todo = item.parentElement;
            todo.classList.toggle("completed"); 
        }
        
    }
    removeLocalTodos(todo){
        let todos;
        if(localStorage.getItem("todos") == null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

}

const myTask = new ToDo();


//Events Listeners
//document.addEventListener("DOMContentLoaded", getTodos);


console.log(myTask.todoButton);

myTask.todoButton.addEventListener("click", (event)=>{
    myTask.addTodo(event);
})

myTask.todoList.addEventListener("click", (event)=>{
    myTask.deleteTodo(event);
})


// todoList.addEventListener("click", deleteTodo);
// select.addEventListener("click", filterTodo);


function selector(event){
    let item = event.target;
    console.log(item.value)
    console.log(todoList.style.display);

    if(item.value === "completed"){
        if(todoList.style.display === "none"){
            todoList.style.display = "block";
        }else{
            todoList.style.display = "none";
        }
    }
}


function deleteTodo(e){
    const item = e.target;
    console.log(item.classList[0]);

    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
       
    }
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        
    }
    
}

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);

    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
                break;
            case "todo":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    //checl of there is a local Todo
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText =  todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Completed button
    const completedButton=document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)
    //remove button
    const trashButton=document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to ul list
    //todoList.appendChild(todoDiv);
    if(inputCheck()){todoList.appendChild(todoDiv)}
    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}