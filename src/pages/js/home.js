// buttons
const addBtn = document.getElementById("add-item-btn");
// display
const estTDEE = document.getElementById("estimated-tdee");

let userSettings;

addBtn.addEventListener("click", () => {
    window.location.href = "/src/pages/new-item.html";
});

try {
    userSettings = JSON.parse(localStorage.getItem("userSettings"));
} catch {
    console.log("cant find user settings, setting default");
    userSettings = {
        age: 19,
        gender: "male",
        weight: 0,
        height: 0,
        activityLevel: "sedentary",
        tdee: 0
    };
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
}

estTDEE.textContent = userSettings.tdee.toLocaleString();