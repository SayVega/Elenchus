const taskList = document.getElementById("task-list");

const listBtn = document.getElementById("add-list-btn");
const listMenu = document.getElementById("overlay");
const cancelListBtn = document.getElementById("cancel-list-btn-popup");
const addListBtn = document.getElementById("add-list-btn-popup");
const listInput = document.getElementById("list-input");
const divListName = document.getElementById("list-name");

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8000/load_lists.php")
    .then(response => response.json())
    .then(lists => {
        lists.forEach(list => {
            createListBtn(list.listName);
        });
    })
    .catch(error => console.error("Error:", error));
});

addListBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    if(!listInput.value){
        alert("Please enter a task");
    }
    else{
        fetch("http://localhost:8000/list_data.php", {
            method: "POST",
            body: JSON.stringify({ "listName": listInput.value }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(list => {
            createListBtn(list.listName)
        })
        .catch(error => console.error("Error:", error));
        listInput.value = "";
    }
    listMenu.style.display = "none";
});

const createListBtn = (listName) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "list-item";
    btn.textContent = listName;
    btn.addEventListener("click", () => {
        divListName.innerHTML = `<h3>${listName}</h3>`;
    });
    taskList.appendChild(li).appendChild(btn);
}

listBtn.addEventListener("click", () =>{
    listMenu.style.display = "block";
})

cancelListBtn.addEventListener("click", () =>{
    listMenu.style.display = "none";
})