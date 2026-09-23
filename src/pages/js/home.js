// buttons
const addBtn = document.getElementById("add-item-btn");
// display
const estTDEE = document.getElementById("estimated-tdee");
const consumedStat = document.getElementById("consumed-cal");
const balanceStat = document.getElementById("balance-cal");
const balanceText = document.getElementById("sur-or-def-text");
const foodLogList = document.getElementById("food-log");

let userSettings = {
        age: 19,
        gender: "male",
        weight: 0,
        height: 0,
        activityLevel: "sedentary",
        tdee: 0
    };

addBtn.addEventListener("click", () => {
    window.location.href = "/src/pages/new-item.html";
});

userSettings = JSON.parse(localStorage.getItem("userSettings")) ?? [];


estTDEE.textContent = userSettings.tdee.toLocaleString();

// Display log
function UpdateFoodLog() {
    let foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];
    let totalConsumedCals = 0;

    foodLogList.innerHTML = "";

    foodLog.forEach(item => {
        foodLogList.insertAdjacentHTML("beforeend", `
            <li class="food-item" id="item-${item.id}">
                <div class="item-name-content">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-time">breakfast</p>
                </div>
                <div class="item-cals">
                    <h2>${item.cal}</h2>
                    <p>kcal</p>
                </div>
                <button class="item-favouriting">
                    <img src="../assets/icons/hollow-star-icon.svg" class="hollow${item.isFav ? "" : " show"}" />
                    <img src="../assets/icons/filled-star-icon.svg" class="filled${item.isFav ? " show" : ""}" />
                </button>
                <button class="item-delete">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </li>
            `
        );

        const favBtn = document.querySelector(`#item-${item.id} .item-favouriting`);
        favBtn.addEventListener("click", () => {
            favouriteItem(item.id, favBtn);
        });

        const deleteBtn = document.querySelector(`#item-${item.id} .item-delete`);
        deleteBtn.addEventListener("click", () => {
            deleteItem(item.id);
        });

        totalConsumedCals += Number(item.cal);
    });

    consumedStat.textContent = totalConsumedCals.toLocaleString();

    const balance = totalConsumedCals - Number(userSettings.tdee);
    balanceStat.textContent = balance.toLocaleString();

    balanceText.textContent = balance > 0 ? "surplus" : "deficit";
}
// localStorage.removeItem("food-log");
// localStorage.removeItem("fav-list");

function deleteItem(id) {
    let foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];

    foodLog = foodLog.filter(item => item.id !== id);
    localStorage.setItem("food-log", JSON.stringify(foodLog));

    const item = document.getElementById(`item-${id}`);

    item.remove();
    UpdateFoodLog();
}

function favouriteItem(id, favBtn) {
    let foodLog = JSON.parse(localStorage.getItem("food-log")) ?? [];

    const item = foodLog.find(item => item.id === id);
    item.isFav = !item.isFav;

    const favList = JSON.parse(localStorage.getItem("fav-list")) ?? [];

    const hollowStar = favBtn.querySelector(".hollow");
    const filledStar = favBtn.querySelector(".filled");

    if (item.isFav) {
        hollowStar.classList.remove("show");
        filledStar.classList.add("show");

        favList.push(item);
    } else {
        hollowStar.classList.add("show");
        filledStar.classList.remove("show");;
        
        const index = favList.findIndex(listItem => listItem.id === item.id);
        if (index !== -1) {
            favList.splice(favList.indexOf(item), 1);
        } else {
            console.log("cant find item to remove from favourites");
        }
    }

    localStorage.setItem("food-log", JSON.stringify(foodLog));
    localStorage.setItem("fav-list", JSON.stringify(favList));
}

UpdateFoodLog();

// localStorage.clear();