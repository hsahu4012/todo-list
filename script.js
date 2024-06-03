const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("TodoList")) || [];
};

const addTodoListLocalStorage = (localTodoLists) => {
  localStorage.setItem("TodoList", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal();

const AddTodoDynamicElement = (CurrEle) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${CurrEle}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();
  inputValue.value = "";

  if (
    todoListValue !== "" &&
    !localTodoLists.some(
      (todo) => todo.toLowerCase() === todoListValue.toLowerCase()
    )
  ) {
    localTodoLists.push(todoListValue);
    addTodoListLocalStorage(localTodoLists);

    AddTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  localTodoLists.forEach((CurrEle) => {
    AddTodoDynamicElement(CurrEle);
  });
};
showTodoList();

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem = todoToRemove.parentElement;

  localTodoLists = localTodoLists.filter((currTodo) => {
    return currTodo.toLowerCase() !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorage(localTodoLists);
  parentElem.remove();
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
