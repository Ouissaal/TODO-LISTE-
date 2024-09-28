const inputBox = document.getElementById("input-box");
const inputBox1 = document.getElementById("input-box1");
const alertText = document.getElementById("alert-text");
const listContainer = document.getElementById("list-container");

const addDivEl = document.getElementById("addDiv");
const updateDivEl = document.getElementById("updateDiv");

let id = 0;
let updateId = 0;

function showAlert(isSuccess, message) {
  if (isSuccess) {
    alertText.innerHTML = message;
    alertText.style.color = "#0dd157";
  } else {
    alertText.innerHTML = message;
    alertText.style.color = "#fb4143";
  }
}

function addTask() {
  if (inputBox.value === "") {
    showAlert(false, "Something is wrong!");
  } else {
    const value = inputBox.value;
    listContainer.innerHTML += `
                                <li id="${id}">${value}
                                    <button class="update" onclick="getTask('${id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button class="delete" onclick="removeTask('${id}')"><i class="fa-solid fa-trash"></i></button>
                                </li>`;

    showAlert(true, "Congratulations! Added successfully.");
  }

  inputBox.value = "";
  inputBox.focus();
  id++;

  saveData();
}

function getTask(id) {
  addDivEl.style.display = "none";
  updateDivEl.style.display = "flex";

  const updateBtnEls = document.querySelectorAll(".update");
  for (let index in updateBtnEls) {
    if (index == "entries") break;
    updateBtnEls[index].style.display = "none";
  }

  const deleteBtnEls = document.querySelectorAll(".delete");
  for (let index in deleteBtnEls) {
    if (index == "entries") break;
    deleteBtnEls[index].style.display = "none";
  }

  const el = document.getElementById(id);
  let value = el.innerText;
  inputBox1.value = value;

  updateId = id;

  saveData();
}

function updateTask() {
  if (inputBox1.value === "") {
    showAlert(false, "Something is wrong!");
  } else {
    const el = document.getElementById(updateId);
    el.innerHTML = `
                    ${inputBox1.value}
                    <button class="update" onclick="getTask('${updateId}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete" onclick="removeTask('${updateId}')"><i class="fa-solid fa-trash"></i></button>`;

    addDivEl.style.display = "flex";
    updateDivEl.style.display = "none";

    const updateBtnEls = document.querySelectorAll(".update");
    for (let index in updateBtnEls) {
      if (index === "entries") break;
      updateBtnEls[index].style.display = "inline";
    }

    const deleteBtnEls = document.querySelectorAll(".delete");
    for (let index in deleteBtnEls) {
      if (index === "entries") break;
      deleteBtnEls[index].style.display = "inline";
    }

    showAlert(true, "Congratulations! Updated successfully.");
    saveData();
  }
}

function removeTask(id) {
  const el = document.getElementById(id);
  if (el) {
    el.remove();
    showAlert(true, "Congratulations! Deleted successfully.");
  } else {
    showAlert(false, "Something is wrong!");
    saveData();
  }
}

listContainer.addEventListener("click", function (e) {
  e.target.classList.toggle("checked");
  saveData();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();