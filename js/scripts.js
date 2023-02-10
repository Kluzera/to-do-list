{
  const welcome = () => {
    console.log("Hi everyone");
  };

  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
     tasks = [
      ...tasks, 
      {content: newTaskContent},
     ]
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0,taskIndex),
      ...tasks.slice(taskIndex+1),
    ]
    render();
  };
    
  // toggleAllTaskADone = () => {};
  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0,taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex+1),
    ]
    render();
  };

  const markAllDone = () => {
    tasks = tasks.map((task) =>({
      ...task,
      done:true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
     hideDoneTasks = !hideDoneTasks;
     render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

    const renderTasks = () => {
      let htmlString = "";
      for (const task of tasks) {
        htmlString += `
          <li class="list">
          <button class="list__button list__button--done js-done">
          ${task.done ? "✔" : ""}
          </button>
          <span class="list__taskName${task.done ? " list__taskName--done" : ""}">
                ${task.content}
            </span>
         <button class="list__button js-remove">🗑</button>
          </li>
          `;
      }
  
      document.querySelector(".js-tasks").innerHTML = htmlString;
  
    };

    const renderButtons = () => {
      const addButtons = document.querySelector(".buttons");
      

      if(!tasks.length){
        addButtons.innerHTML = "";
        return;
      }
        addButtons.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">Ukryj ukończone</button>
        <button class="buttons__button js-markAllDone">Ukończ wszystkie</button>
        `;
      };
      
    //const bindButtonEvents = () => {
         //if(mamy przycisk){to przupinamy add.EventsListener}
   // };
   const render = () => {
    
   renderTasks();
   renderButtons();
    

    bindEvents();
    //bindRemoveEvents();
    //bindToggleDoneEvents();
    //bindButtonEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  }

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);

    welcome();
  };

  init();
}
