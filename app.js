// https://firebase.google.com/docs/database/web/start
import  { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

// Gets triggered whenever there's change in database(add/update/delete)
onValue(shoppingListsInDb, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        // Clear UI lists
        clearUIShoppingLists()

        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            addToShoppingList(currentItem) 
        }
    } else {
        shoppingListUI.innerHTML = "No items here... yet"
    }


})

addBtn.addEventListener("click", function() {
    let item = inputField.value
    push(shoppingListsInDb, item)
    clearInputField()
})

function clearUIShoppingLists() {
    shoppingListUI.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}

function addToShoppingList(thingsToAdd) {
    // shoppingListUI.innerHTML += `<li>${thingsToAdd}</li>`

    let itemId = thingsToAdd[0]
    let itemValue = thingsToAdd[1]

    let createListEl = document.createElement("li")
    createListEl.textContent = itemValue

    createListEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingLists/${itemId}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingListUI.append(createListEl)
}
