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
        this.saveLocalTodos(this.todoInput.value);
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
    
        if (item.classList[0] === "trash-btn"){
            const todo = item.parentElement;
            todo.classList.add("fall");
            this.removeLocalTodos(todo);
            todo.addEventListener("transitionend", function(){
                todo.remove();
            })
           
        }
        if (item.classList[0] === "complete-btn"){
            const todo = item.parentElement;
            todo.classList.toggle("completed"); 
        }
        
    }
    saveLocalTodos(todo){
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
    filterTodo(event){
        const todos = this.todoList.childNodes;
        todos.forEach(function(todo){
            switch(event.target.value){
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
    getTodos(){
        let todos;
        if(localStorage.getItem("todos") == null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.forEach((todo)=>{
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
        this.todoList.append(todoDiv);
       })
    //    this.todoList.append(todoDiv)
    }

}

const myTask = new ToDo();


//Events Listeners
//document.addEventListener("DOMContentLoaded", getTodos);




myTask.todoButton.addEventListener("click", (event)=>{
    myTask.addTodo(event);
})

myTask.todoList.addEventListener("click", (event)=>{
    myTask.deleteTodo(event);
})

myTask.select.addEventListener("click", (event)=>{
    myTask.filterTodo(event);
})

document.addEventListener("DOMContentLoaded", ()=>{
    myTask.getTodos();
})






