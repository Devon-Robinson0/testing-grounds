const addBtn = document.getElementById("add-btn");
const mealList = document.getElementById("meal-list")

// Edit Modal
const mealEditModal = document.getElementById("meal-edit-modal");
const mealNameInput = document.getElementById("meal-name-input");
const mealCalInput = document.getElementById("meal-cal-input");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const saveEditBtn = document.getElementById("save-edit-btn");
const favMealsList = document.getElementById("fav-meal-list");

let meals = [];
let favMeals = [];

let editingMeal;

addBtn.addEventListener("click", () => {
    const id = getNewMealId();

    const newMeal = {
        id: id,
        name: "Example",
        calories: 100
    }
    meals.push(newMeal);

    mealList.innerHTML += `
        <li id="${newMeal.id}">
            <div>
                <button class="del-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                <button class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
            </div>
            <div>
                <span class="meal-name">Item Example, </span>
                <span class="cal-no">100cal</span>
            </div>
            <button class="fav-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z"/></svg></button>
        </li>`;
});

mealList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        mealEditModal.hidden = false;

        editingMeal = meals.find(m => m.id === event.target.closest("li").id);

        mealNameInput.value = editingMeal.name;
        mealCalInput.value = editingMeal.calories;

        updateFavMealsList();
    }

    if (event.target.classList.contains("fav-btn")) {
        const favouritingMeal = meals.find(m => m.id === event.target.closest("li").id);
        
        const favMealsIds = favMeals.map(m => m.favId);
        const mealElement = document.getElementById(favouritingMeal.id);

        if (!favMealsIds.includes(`f${favouritingMeal.id}`)) {
            const newFavMeal = {
                favId: `f${favouritingMeal.id}`,
                mealId: favouritingMeal.id,
                name: favouritingMeal.name,
                calories: favouritingMeal.calories
            }

            favMeals.push(newFavMeal);
            mealElement.querySelector(".fav-btn").classList.add("fav");
        } else {
            favMeals = favMeals.filter(m => m.mealId !== favouritingMeal.id);
            mealElement.querySelector(".fav-btn").classList.remove("fav");
        }

    }

    if (event.target.classList.contains("del-btn")) {
        const mealToDel = meals.find(m => m.id === event.target.closest("li").id);

        meals = meals.filter(m => m.id !== mealToDel.id);

        const mealElement = document.getElementById(mealToDel.id);
        mealElement.remove();
    }
});

cancelEditBtn.addEventListener("click", () => {
    closeModal();
});

saveEditBtn.addEventListener("click", () => {
    editingMeal.name = mealNameInput.value;
    editingMeal.calories = mealCalInput.value;

    const mealElement = document.getElementById(editingMeal.id);

    mealElement.querySelector(".meal-name").textContent = editingMeal.name + ", ";
    mealElement.querySelector(".cal-no").textContent = `${editingMeal.calories}cal`;

    const matchingFavMeal = favMeals.find(m => m.mealId === editingMeal.id);

    if (matchingFavMeal) {
        matchingFavMeal.name = editingMeal.name;
        matchingFavMeal.calories = editingMeal.calories;
    }

    closeModal();
});

favMealsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("fav-meal")) {
        const favMeal = favMeals.find(m => m.favId === event.target.id);

        editingMeal.name = favMeal.name;
        editingMeal.calories = favMeal.calories;

        const mealElement = document.getElementById(editingMeal.id);

        mealElement.querySelector(".meal-name").textContent = editingMeal.name + ",";
        mealElement.querySelector(".cal-no").textContent = `${editingMeal.calories}cal`;

        closeModal();
    }
});

function getNewMealId() {
    const usedIds = meals.map(m => Number(m.id.slice(1)));

    let id = 0;
    while (usedIds.includes(id)) {
        id++;
    }

    return `m${id}`;
}

function closeModal() {
    mealEditModal.hidden = true;

    mealNameInput.value = '';
    mealCalInput.value = '';
    editingMeal = null;
}

function updateFavMealsList() {
    favMealsList.innerHTML = "";

    for (const meal of favMeals) {
        favMealsList.innerHTML += `
            <li id="${meal.favId}" class="fav-meal">${meal.name}, ${meal.calories}cal</li>`
    }
}