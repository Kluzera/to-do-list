{
  const welcome = () => {
    console.log("Hi everyone");
  };

  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex), 
      ...tasks.slice(taskIndex + 1)
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const markAllDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
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
      <li class="
            list__task${task.done && hideDoneTasks ? " list__task--hidden" : ""}
          ">
        <button class="list__button list__button--done js-done">
          ${task.done ? "✔" : ""}
        </button>
          <span class="
          list__taskName${task.done ? " list__taskName--done" : ""}
          ">
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

    if (tasks.length === 0) {
      addButtons.innerHTML = "";
      return;
    }

    addButtons.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class="buttons__button js-markAllDone"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
  };

  const bindButtonEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllDone);
    }
    
    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindButtonEvents();
    bindToggleDoneEvents();
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
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);

    welcome();
  };

  init();
}