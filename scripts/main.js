// API endpoints
const wishlistUrl = "http://localhost:3000/items"
const comparisonUrl = "http://localhost:3000/comparison_items"
const userUrl = "http://localhost:3000/users";

// Nav bar elements
const navLoginBtn = document.querySelector("#nav-login-btn");
const navWishListBtn = document.querySelector("#wish-list-btn");
const navLogoutBtn = document.querySelector("#logout-btn");
const loginBtn = document.querySelector("#login-btn");

// Login/Signup elemets 
const signUpBtn = document.querySelector("#sign-up-btn");
const newUserName = document.querySelector("#new-username");
const userName = document.querySelector("#username");
const loginModal = document.querySelector("#loginModal");

// Wishlist
const wishlist = document.querySelector(".wishlist-body ul");
const slideMenu = document.querySelector("#side-menu");
const exitMenuBtn = document.querySelector("#exit-list-btn");

// Left panel - Item name/cost
const leftCompare = document.querySelector(".compare-left form");
const name = leftCompare.children[0].children[0];
const cost = leftCompare.children[1].children[0];


// const rightCompare = document.querySelector(".compare-right form"); //not used

// Right panel - Comparison items dropdown
const dropdown = document.querySelector("select");

// Bottom panel - numeric/visual results, buttons
const resultHeader = document.querySelector("#result-header");
const resultCompare = document.querySelector("#result-compare");
const resultsDiv = document.querySelector(".results");
const resultBtns = document.querySelector("#result-btns");
const worthItBtn = document.querySelector("#worth-it");
const notWorthItBtn = document.querySelector("#not-worth-it");
const resultVisual = document.querySelector("#result-visual");

// Read modal elements 
const seeItemModal = document.querySelector("#seeItemModal");
const wishItemNameCell = document.querySelector("#show-item-name");
const wishItemCostCell = document.querySelector("#show-item-cost");
const editBtn = document.querySelector("#edit-btn");
const deleteBtn = document.querySelector("#delete-btn")

// Edit modal elements
const editItemField = document.querySelector("#edit-item");
const editCostField = document.querySelector("#edit-item-cost");
const editConfirmBtn = document.querySelector("#edit-confirm-btn");

/* All fetches */

// Creates a new user in the database
function createNewUser() {
    configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: newUserName.value
        })
    };
 
    fetch(userUrl, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(err => err.message);
}

// Fetches all the wishlist items for current user
function fetchWishlistItems() {
    let username = localStorage.getItem("user_name");
    fetch(`${userUrl}/${username}`)
    .then(resp => resp.json())
    .then(json => {
        displayWishlist(json.items);
    })
    .catch(err => err.message)
}

// Fetches all the comparison items
function fetchComparisonItems() {
    fetch(comparisonUrl)
    .then(resp => resp.json())
    .then(json => displayComparisonItems(json))
    .catch(err => err.message)
}

// Fetches a single comparison item
function fetchComparisonItem(cost, id) {
    fetch(`${comparisonUrl}/${id}`)
    .then(resp => resp.json())
    .then(obj => displayItemCount(cost, obj))
}

// Adds a new wishlist item to the database
// Refetches wishlist items and re-renders wishlist
function addWishItem() {
    let userId = localStorage.getItem("user_id");
    fetch(wishlistUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            cost: cost.value,
            user_id: userId
        })
    })
    .then(resp => resp.json())
    .then(obj => fetchWishlistItems())
    .catch(err => err.message)
}

// Updates the database with the selected items with information 
// Refetches wishlist items and re-renders wishlist
function updateItem() {
    let itemId = localStorage.getItem("cur_item_id");
    configObj = { method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
            cost: editCostField.value,
            name: editItemField.value
        })
    }
    fetch(`${wishlistUrl}/${itemId}`, configObj)
    .then(resp => resp.json())
    .then(json => fetchWishlistItems())
    .catch(err => err.message);
}

// Deletes selected item from the database
// Refetches wishlist items and re-renders wishlist
function deleteItem() {
    let itemId = localStorage.getItem("cur_item_id");
    fetch(`${wishlistUrl}/${itemId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(resp => resp.json())
    .then(json => fetchWishlistItems())
    .catch(err => err.message)
}

/* All fetches */


/* Wish list */

// Clears wishlist
function clearWishlist() {
    while (wishlist.firstChild) {
        wishlist.removeChild(wishlist.firstChild);
    }
}

// Displays newly fetched wishlist items and creates links that open modals
function displayWishlist(items) {
    clearWishlist();
    items.forEach(item => {
        let li = document.createElement("li");
        let link = document.createElement("a");
        link.textContent = item.name;
        link.href = "#";
        link.setAttribute("data-toggle", "modal");
        link.setAttribute("data-target", "#seeItemModal");
        link.setAttribute("id", item.id);
        // click on link --> see wish item info in modal
        link.addEventListener("click", () => seeItem(item));
        li.appendChild(link);
        wishlist.appendChild(li);
    })
}

// Opens wish list
function openList() {
    slideMenu.style.width = "30%";
}

// Closes wishlist
function closeList() {
    slideMenu.style.width = "0";
}

/* Wish list */


/* Item access */

// Populates showItem modal with a name and cost. 
// Then stores currently selected item in local storage
function seeItem(item) {
    wishItemNameCell.textContent = item.name;
    wishItemCostCell.textContent = `$${item.cost.toFixed(2)}`;
    localStorage.removeItem("cur_item_id");
    localStorage.removeItem("cur_item_name");
    localStorage.removeItem("cur_item_cost");
    localStorage.setItem("cur_item_id", item.id);
    localStorage.setItem("cur_item_name", item.name);
    localStorage.setItem("cur_item_cost", item.cost);
}

// Sets editItem modal values
function setEditModalValues() {
    let itemName = localStorage.getItem("cur_item_name");
    let itemCost = localStorage.getItem("cur_item_cost");
    console.log(`Setting modal values ${itemName}  ${itemCost}`);
    editItemField.setAttribute("value", itemName);
    editCostField.setAttribute("value", itemCost);
}

/* Item access */


/* Comparison items */

// Populates comparison item dropdown
function displayComparisonItems(items) {
    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }
    items.forEach(item => {
        let option = document.createElement("option");
        option.value = item.id;
        option.textContent = `${item.name} - $${item.cost.toFixed(2)}`;
        dropdown.appendChild(option);
    })
}

/* Comparison items */


/* Numeric/Visual results */

// Vadilates user inputs and starts the results process
function populateItems() {
    if (name.value && cost.value) {
        resultsDiv.style.display = "block";
        resultHeader.textContent = `The ${name.value}`;
        fetchComparisonItem(cost.value, dropdown.value);
    }
}

// Displays comparison item count
function displayItemCount(cost, compare_obj) {
    let num = Math.floor(cost / compare_obj.cost);
    let pluralized = pluralize(compare_obj.name, num, true);
    resultCompare.textContent = pluralized;
    populateImages(num, compare_obj);

}

// Populates images for comparison
function populateImages(num, compare_obj) {
    while(resultVisual.firstChild) {
        resultVisual.removeChild(resultVisual.firstChild);
    }
    for (let i = 0; i < num; i++) {
        let image = document.createElement("img");
        image.src = compare_obj.img_url;
        resultVisual.appendChild(image);
    }
} 

// Clears the results and resets item input fields
function clearResults() {
    name.value = "";
    cost.value = "";
    resultsDiv.style.display = "none";
}

/* Numeric/Visual results */


/* User access */

// Logs user in 
function loginUser() {
    fetch(`${userUrl}/${username.value}`)
    .then(resp => resp.json())
    .then(json => validateUser(json))
    .catch(err => err.message);
}

// Logs a user out
function logoutUser() {
    localStorage.removeItem("user_id");
    clearWishlist();
    toggleBtns();
}

// Makes sure that the user exists in the database
function validateUser(response) {
    if (response) {
        $("#loginModal").modal("hide");
        saveUserToLocalStorage(response);
        fetchWishlistItems();
        toggleBtns(response.id);
    } else {
        userName.value = "Invalid Login"
    }
}

// Saves user to local storage
function saveUserToLocalStorage(user) {
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("user_name", user.name);
}

// Checks local storage to see if a user is logged in
function checkLocalStorage() {
    let userId = localStorage.getItem("user_id");
    console.log(`User id: ${userId}`);
    if (userId) {
        toggleBtns(userId);
        fetchWishlistItems();
    }
}

// Toggles button access based on login status
function toggleBtns(userId) {
    let btns = [resultBtns, navWishListBtn, navLogoutBtn];
    for (let btn of btns) {
        if (userId) {
            btn.style.display = "block";
            navLoginBtn.style.display = "none";
        } else {
            btn.style.display = "none";
            navLoginBtn.style.display = "block";
        }
    }
}

/* User access */


/* Event Listeners */

// Adds event listener to edit button
function addEditBtnEventListener() {
    editBtn.addEventListener("click", setEditModalValues);
}

// Adds event listener to delete button
function addDeleteBtnEventListener() {
    deleteBtn.addEventListener("click", deleteItem);
}

// Adds event listener to confirm edit button
function addEditConfirmBtnEventListener() {
    editConfirmBtn.addEventListener("click", function () {
        updateItem();
    });
}

// Adds event listener to dropdown change
function addDropdownEventListener() {
    dropdown.addEventListener("change", populateItems);
}

// Adds event listener to worthit button
function addWorthItBtnEventListener() {
    worthItBtn.addEventListener("click", () => {
        addWishItem();
        clearResults();
    })
}

// Adds event listener to notworthit button
function addNotWorthBtnEventListener() {
    notWorthItBtn.addEventListener("click", clearResults);
}

// Adds event listener to cost field on enter
function addCostFieldEventListener() {
    cost.addEventListener("keypress", (event) => {
        var key = event.which || event.keyCode;
        if (key == 13) {
            populateItems();
        }
    });
}

// Adds event listener to signup link
function addSignUpEventListener() {
    signUpBtn.addEventListener("click", createNewUser)
}

// Adds event listener to login button
function addLoginEventListener() {
    loginBtn.addEventListener("click", loginUser);
}

// Adds event listener to close wishlist button
function addSlideClosedEventListener() {
    exitMenuBtn.addEventListener("click", closeList)
}

// Adds event listener to logout button
function addLogoutEventListener() {
    navLogoutBtn.addEventListener("click", logoutUser)
}

// Adds event listener to wishlist open
function addSlideOpenEventListener() {
    navWishListBtn.addEventListener("click", openList)
}

// Loads all event listeners
function loadListeners() {
    addDropdownEventListener();
    addSignUpEventListener();
    addLoginEventListener();
    addLogoutEventListener();
    addSlideOpenEventListener();
    addSlideClosedEventListener();
    addWorthItBtnEventListener()
    addNotWorthBtnEventListener();
    addCostFieldEventListener();
    addEditBtnEventListener();
    addDeleteBtnEventListener();
    addEditConfirmBtnEventListener();
}

/* Event Listeners */


/* main */

checkLocalStorage();
fetchComparisonItems();
loadListeners();

/* main */