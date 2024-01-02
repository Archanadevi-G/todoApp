//function to display the date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3] + " - " + date[0];
  document.querySelector("#date").innerHTML = date;
}

//localStrage
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

document.querySelector("#item").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

function createItem(item) {
  if (item.value == "") {
    alert("Please Enter Something");
  } else {
    // Save items as objects with a 'value' property and 'completed' status
    const newItem = { value: item.value, completed: false };

    itemsArray.push(newItem);
    localStorage.setItem("items", JSON.stringify(itemsArray));

    location.reload();
  }
}

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
                <div class="input-controller">
                <textarea disabled class="${
                  itemsArray[i].completed ? "completed" : ""
                }">${itemsArray[i].value}</textarea>

                  <div class="edit-controller">
                  <i class="fa-solid fa-thumbs-up completeBtn"></i>
                    <i class="fa-solid fa-trash deleteBtn"></i>
                  </div>
                </div>
              </div>`;
  }

  document.querySelector(".to-do-list").innerHTML = items;

  completeItem();
  deleteItem();
}

function completeItem() {
  let completeBtn = document.querySelectorAll(".completeBtn");
  completeBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      // Toggle a CSS class for completed items
      document
        .querySelectorAll(".item textarea")
        [i].classList.toggle("completed");

      // localStorage.setItem("items", JSON.stringify(itemsArray));
    });
  });
}

function deleteItem() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      itemsArray.splice(i, 1);

      localStorage.setItem("items", JSON.stringify(itemsArray));
      location.reload();
    });
  });
}

window.onload = function () {
  displayDate();
  displayItems();
};
