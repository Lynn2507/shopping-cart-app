// https://firebase.google.com/docs/database/web/start
import  { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-cart-a8098-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// Initialize Firebase
const app = initializeApp(appSettings)

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)

const shoppingListsInDb = ref(database, "shoppingLists")
const inputField = document.querySelector("#input-field")
const addBtn = document.getElementById("add-button")
const shoppingListUI = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    let item = inputField.value
    addToShoppingList(item)
    clear()
    // writeUserData(item)
    push(shoppingListsInDb, item)
})

function clear() {
    inputField.value = ""
}

function addToShoppingList(thingsToAdd) {
    shoppingListUI.innerHTML += `<li>${thingsToAdd}</li>`
}