import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://gamified-habit-tracker-7dfc5-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const habitsInDB = ref(database, "habits")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const habitListEl = document.getElementById("habit-list")
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(habitsInDB, inputValue)
    addHabitToList(inputValue)
    clear(inputFieldEl)
    console.log(`${inputValue} added to database`)
})

function clear(el){
    el.value = ""
}

function addHabitToList(inputValue){
    habitListEl.innerHTML += `
        <li>${inputValue}</li>
    `
}