// inputs
const itemNameInput = document.getElementById("item-name-input");
const itemCalInput = document.getElementById("item-cal-input");
const favourite = document.getElementById("save-to-fav-btn");

// buttons
const addItemBtn = document.getElementById("add-item-btn");

// display
const favListDisplay = document.getElementById("favourites-list");

const favList = JSON.parse(localStorage.getItem("fav-list")) ?? [];

favList.forEach(fav => {
    favListDisplay.insertAdjacentHTML("beforeend", `
            <li id="fav-${fav.id}">
                <div class="text-container">
                    <h2>${fav.name}</h2>
                    <p><span>${fav.cal} kcal</p>
                </div>
                <button id="add-to-log-btn">&plus;Add</button>
            </li>
        `
    );

    const addBtn = document.getElementById(`fav-${fav.id}`);
    addBtn.addEventListener("click", () => {
        const foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];

        const newItem = { ...fav };
        newItem.id = getId(foodLog);
        newItem.isFav = false;

        foodLog.push(newItem);
        localStorage.setItem("food-log", JSON.stringify(foodLog));

        window.location.href = "/src/pages/index.html";
    });
});

addItemBtn.addEventListener("click", () => {
    if (itemNameInput.value.trim() === "") {
        console.log("Enter an item name");
        return;
    }

    if (itemCalInput.value === "") {
        console.log("Enter an item calories");
        return;
    }

    let foodLog = [];

    foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];

    const id = getId(foodLog);

    const newItem = {
        id,
        name: itemNameInput.value,
        cal: itemCalInput.value,
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

    window.location.href = "/src/pages/index.html";
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