document.addEventListener('DOMContentLoaded',()=>{
    let inputText = document.getElementById('todo-input');
    let addTaskButton = document.getElementById("add-task-btn");
    let list = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task));
    addTaskButton.addEventListener('click',()=>{
        let txt = inputText.value.trim();
        if(txt === "") return;

        const newTask = {
            id: Date.now(),
            text: txt,
            completed: false
        };
        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        inputText.value = "";

    })
    function renderTask(task){
        const li = document.createElement('li');
        li.setAttribute("data-id",task.id);
        if(task.completed) li.classList.add("completed");
        li.innerHTML=`
        <span>${task.text}</span>
        <button>delete</button>
        `;
        list.appendChild(li);
        li.addEventListener('click',(e)=>{
            // if(e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTask();
        });
        li.querySelector("button").addEventListener('click',(e)=>{
            e.stopPropagation();
            tasks = tasks.filter((t)=> t.id!==task.id);
            li.remove();
            saveTask();
        });
    }
    function saveTask(){
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
})
