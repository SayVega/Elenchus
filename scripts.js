const tasksList = document.getElementById("tasks-list");
const taskInput = document.getElementById("task-input");
const taskBtn = document.getElementById("add-task-btn");
const listName = document.getElementById("list-name");

const listBtn = document.getElementById("add-list-btn");
const listsList = document.getElementById("lists-list");

const listMenu = document.getElementById("overlay");
const cancelListBtn = document.getElementById("cancel-list-btn-popup");
const addListBtn = document.getElementById("add-list-btn-popup");
const listInput = document.getElementById("list-input");
let jsonList = {};
let actualId = "";

const getLists = async () => {
    try{
        const response = await fetch("http://localhost:8000/load_lists.php");
        if(!response.ok){
            throw new Error(`http error status ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error:", error);
    }
}

const showLists = (data) => {
        data.forEach(i => {
            createListBtn(i);
        });
    }

const showTasks = (listId) => {
    getLists().then(data =>{
        jsonList = data;
    });

    jsonList.forEach(list => {
        if(list.listId === listId){
            tasksList.innerHTML = "";
            for(let i = 1; i < list.taskList.length; i++){
                createTask(list.taskList[i]);
            }
        }
    });
}

const createListBtn = (list) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "list-item";
    btn.textContent = list.listName;
    btn.addEventListener("click", () => {
        listName.innerText = list.listName;
        actualId = list.listId;
        showTasks(actualId);
    });
    listsList.appendChild(li).appendChild(btn);
}

const createTask = (task) => {
    const li = document.createElement("li");
    const check = document.createElement("input");
    const taskName = document.createElement("span");
    taskName.textContent = task.taskName;
    check.type = "checkbox";
    li.className = "task-item";
    li.appendChild(taskName);
    li.appendChild(check);
    tasksList.appendChild(li);
}

const isTaskCompleted = () =>{
    

}

document.addEventListener("DOMContentLoaded", () => {
    getLists().then(data =>{
        jsonList = data;
        showLists(data);
    });
});

addListBtn.addEventListener("click", (event) =>{
    event.preventDefault();
        if(!listInput.value){
            alert("Please enter a name for the list");
        }
        else{
            fetch("http://localhost:8000/list_data.php", {
                method: "POST",
                body: JSON.stringify({ "listName": listInput.value }),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(list => {
                createListBtn(list);
            })
            .catch(error => console.error("Error:", error));
            listInput.value = "";
        }
        listMenu.style.display = "none";
});

taskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if(actualId===""){
        alert("Please select a list");
    }
    else{
        if(!taskInput.value){
            alert("Please enter a task");
        }
        else{
            fetch("http://localhost:8000/task_data.php", {
                method: "POST",
                body: JSON.stringify({
                    "taskName": taskInput.value,
                    "listId": actualId
                    }),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(task => {
                createTask(task);
            })
            .catch(error => console.error("Error:", error));
            taskInput.value = "";
        }
    }
});

listBtn.addEventListener("click", () =>{
    listMenu.style.display = "block";
});

cancelListBtn.addEventListener("click", () =>{
    listMenu.style.display = "none";
});