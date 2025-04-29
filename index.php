<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>Elenchus</title>
</head>
<body>
  <header>
    <h1>Elenchus</h1>
  </header>
  <main>
    <section>
      <div id="list-form">
        <h2>Lists</h2>
        <button id="add-list-btn">+</button>
      </div>
      <ul id="lists-list">
        <li><button>All</button></li>
        <li><button>Thrash</button></li>
      </ul>
    </section>
    
    <section id="task-form">
    <h2 id="list-name">Select a list</h2>
      <form>
        <input type="text" id="task-input" placeholder="Create new task" name="taskName">
        <button id="add-task-btn">✔</button>
      </form>
      <ul id="tasks-list"> 

      </ul>
    </section>

    <section id="task-timer">
    </section>
  </main>

  <div id="overlay">
    <div class="popup"> 
      <h2>Add List</h2>
      <form>
        <input type="text" id="list-input" placeholder="Name" required name="listName">
        <button id="cancel-list-btn-popup">Cancel</button>
        <button id="add-list-btn-popup">Add</button>
      </form>
  </div>
  <script src="scripts.js"></script>
  
</body>
</html>
