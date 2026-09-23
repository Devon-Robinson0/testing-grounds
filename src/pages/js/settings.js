// settings
const ageInput = document.getElementById("age-input");
const genderInput = document.getElementById("gender-dropdown");
const weightInput = document.getElementById("weight-input");
const heightInput = document.getElementById("height-input");
const activityLevelInput = document.getElementById("activity-level-dropdown");
// buttons
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
// display
const estTDEE = document.getElementById("tdee-estimate");

let userSettings = {
    age: 19,
    gender: "male",
    weight: 0,
    height: 0,
    activityLevel: "sedentary",
    tdee: 0
};

userSettings = JSON.parse(localStorage.getItem("userSettings")) ?? userSettings;

ageInput.value = userSettings.age;
genderInput.value = userSettings.gender;
weightInput.value = userSettings.weight;
heightInput.value = userSettings.height;
activityLevelInput.value = userSettings.activityLevel;
estTDEE.textContent = userSettings.tdee.toLocaleString();

saveBtn.addEventListener("click", () => {
    const age = Number(ageInput.value);
    const gender = genderInput.value;
    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);
    const activityLevel = activityLevelInput.value;

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);

    if (gender === "male") {
        bmr += 5;
    } else if (gender === "female") {
        bmr -= 161;
    } else {
        console.log("Err: gender not detected correctly");
    }

    const tdee = Math.round(bmr * getActivityLevel(activityLevel));

    estTDEE.textContent = tdee.toLocaleString();

    const newUserSettings = {
        age,
        gender,
        weight,
        height,
        activityLevel,
        tdee
    };

    localStorage.setItem("userSettings", JSON.stringify(newUserSettings));
});

function getActivityLevel(activityLevel) {
    let multiplier = 0;
    switch (activityLevel) {
        case "sedentary":
            multiplier = 1.2;
            break;
        case "lightly-active":
            multiplier = 1.375;
            break;
        case "moderately-active":
            multiplier = 1.55;
            break;
        case "very-active":
            multiplier = 1.725;
            break;
        case "extra-active":
            multiplier = 1.9;
            break;
        default:
            console.log("Err: Activity level not detected");
            break;
    }

    return multiplier;
}