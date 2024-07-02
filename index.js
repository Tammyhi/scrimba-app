import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
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
    clearInput(inputFieldEl)
})

onValue(habitsInDB, function(snapshot){
    let habitsArr = Object.entries(snapshot.val())
    clearList()
    for(let i = 0; i < habitsArr.length; i++){
        let currHabitID = habitsArr[i][0]
        let currHabitVal = habitsArr[i][1]
        addHabitToList(habitsArr[i])
    }
})

function clearList(){
    habitListEl.innerHTML = ""
}

function clearInput(el){
    el.value = ""
}

function addHabitToList(habit){
    let habitID = habit[0]
    let habitVal = habit[1]
    let newHabitEl = document.createElement("li")
    newHabitEl.textContent = habitVal
    habitListEl.append(newHabitEl)
}