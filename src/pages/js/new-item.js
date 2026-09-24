// inputs
const itemNameInput = document.getElementById("item-name-input");
const itemCalInput = document.getElementById("item-cal-input");
const itemTypeInput = document.getElementById("item-type-input");
const favourite = document.getElementById("save-to-fav-btn");

// buttons
const addItemBtn = document.getElementById("add-item-btn");

// display
const favListDisplay = document.getElementById("favourites-list");
const errorBox = document.querySelector(".error-box");
const errorCount = document.querySelector(".error-count");
const nameError = document.getElementById("name-error");
const calError = document.getElementById("cal-error");

updateList();

function updateList() {
    const favList = JSON.parse(localStorage.getItem("fav-list")) ?? [];
    favListDisplay.innerHTML = "";

    favList.forEach(fav => {
        favListDisplay.insertAdjacentHTML("beforeend", `
                <li id="fav-${fav.id}">
                    <div class="text-container">
                        <h2>${fav.name}</h2>
                        <p><span>${fav.cal}</span> kcal</p>
                    </div>
                    <button class="add-to-log-btn">&plus;Add</button>
                    <button class="del-fav-btn"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                </li>
            `
        );

        const addBtn = document.querySelector(`#fav-${fav.id} .add-to-log-btn`);
        addBtn.addEventListener("click", () => {
            const foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];

            const newItem = { ...fav };
            newItem.id = getId(foodLog);
            newItem.isFav = false;

            foodLog.push(newItem);
            localStorage.setItem("food-log", JSON.stringify(foodLog));

            window.location.href = "./index.html";
        });

        const delBtn = document.querySelector(`#fav-${fav.id} .del-fav-btn`);
        delBtn.addEventListener("click", () => {
            let favList = JSON.parse(localStorage.getItem("fav-list")) ?? [];

            favList = favList.filter(item => item.id !== fav.id);
            localStorage.setItem("fav-list", JSON.stringify(favList));

            updateList();
        });
    });
}


addItemBtn.addEventListener("click", () => {
    const errors = {};

    if (itemNameInput.value.trim() === "") {
        errors.name = "Enter an item name";
    }

    if (itemCalInput.value === "") {
        errors.cal = "Enter a calorie amount";
    }

    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }

    let foodLog = [];

    foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];

    const id = getId(foodLog);

    const newItem = {
        id,
        name: itemNameInput.value,
        cal: itemCalInput.value,
        type: itemTypeInput.value,
        isFav: favourite.checked
    };

    if (favourite.checked) {
        const favList = JSON.parse(localStorage.getItem("fav-list")) ?? [];

        favList.push(newItem);
        localStorage.setItem("fav-list", JSON.stringify(favList));
    }

    foodLog.push(newItem);
    console.log(foodLog);

    localStorage.setItem("food-log", JSON.stringify(foodLog));

    window.location.href = "./index.html";
});

function getId(log) {
    const usedIds = log.map(item => item.id);
    console.log(usedIds);
    let id = 1;

    while (usedIds.includes(id)) {
        id++;
    }

    return id;
}

function displayErrors(errors) {
    errorBox.style.display = "grid";
    errorCount.querySelector("span").textContent = Object.keys(errors).length;

    for (const error in errors) {
        errorCount.insertAdjacentHTML("afterend", `<p>${errors[error]}</p>`);

        if (error === "name") {
            nameError.hidden = false;
            nameError.closest(".form-input").querySelector("input").classList.add("error");
        }
        if (error === "cal") {
            calError.hidden = false;
            calError.closest(".form-input").querySelector("input").classList.add("error");
        }
    }
}