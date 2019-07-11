const wishlistUrl = "http://localhost:3000/items"
const comparisonUrl = "http://localhost:3000/comparison_items"
const userUrl = "http://localhost:3000/users";
const wishlist = document.querySelector(".wishlist-body ul");
const dropdown = document.querySelector("select");
const leftCompare = document.querySelector(".compare-left form");
const rightCompare = document.querySelector(".compare-right form");
const name = leftCompare.children[0].children[0];
const cost = leftCompare.children[1].children[0];
const resultHeader = document.querySelector("#result-header");
const resultCompare = document.querySelector("#result-compare");
const resultsDiv = document.querySelector(".results");
const worthItBtn = document.querySelector("#worth-it");
const notWorthItBtn = document.querySelector("#not-worth-it");
const signUpBtn = document.querySelector("#sign-up-btn");
const loginBtn = document.querySelector("#login-btn");
const newUserName = document.querySelector("#new-username");
const userName = document.querySelector("#username");
const loginModal = document.querySelector("#loginModal");
const resultBtns = document.querySelector("#result-btns");
const navLoginBtn = document.querySelector("#nav-login-btn");
const navWishListBtn = document.querySelector("#wish-list-btn");
const navLogoutBtn = document.querySelector("#logout-btn");
const resultVisual = document.querySelector("#result-visual");
const slideMenu = document.querySelector("#side-menu");
const exitMenuBtn = document.querySelector("#exit-list-btn");
// Read Item Modal
const seeItemModal = document.querySelector("#seeItemModal");
const wishItemNameCell = document.querySelector("#show-item-name");
const wishItemCostCell = document.querySelector("#show-item-cost");

// Todo: filter wishlist items
function fetchWishlistItems() {
    fetch(wishlistUrl)
    .then(resp => resp.json())
    .then(json => displayWishlist(json))
    .catch(err => err.message)
}

function displayWishlist(items) {
    while (wishlist.firstChild) {
        wishlist.removeChild(wishlist.firstChild);
    }
    items.forEach(item => {
        let li = document.createElement("li");
        let link = document.createElement("a");
        link.textContent = item.name;
        link.href = "#";
        link.setAttribute("data-toggle", "modal");
        link.setAttribute("data-target", "#seeItemModal")
        link.addEventListener("click", () => seeItem(item))
        li.appendChild(link);
        wishlist.appendChild(li);
    })
}

function seeItem(item) {
    wishItemNameCell.textContent = item.name;
    wishItemCostCell.textContent = `$${item.cost.toFigitxed(2)}`;
}

function fetchComparisonItems() {
    fetch(comparisonUrl)
    .then(resp => resp.json())
    .then(json => displayComparisonItems(json))
    .catch(err => err.message)
}

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

function addDropdownEventListener() {
    dropdown.addEventListener("change", populateItems);
}

function populateItems() {
    if (name.value && cost.value) {
        resultsDiv.style.display = "block";
        resultHeader.textContent = `The ${name.value}`;
        fetchComparisonItem(cost.value, dropdown.value);
        worthItBtn.addEventListener("click", () => {
            addWishItem();
            clearResults();
        })
        notWorthItBtn.addEventListener("click", clearResults);
    }
}

function clearResults() {
    console.log("clear!")
    name.value = "";
    cost.value = "";
    resultsDiv.style.display = "none";
}

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
    .then(obj => console.log(obj))
    .catch(err => err.message)
}

// Fetch a single comparison item
function fetchComparisonItem(cost, id) {
    fetch(`${comparisonUrl}/${id}`)
    .then(resp => resp.json())
    .then(obj => displayItemCount(cost, obj))
}

function displayItemCount(cost, compare_obj) {
    let num = Math.floor(cost / compare_obj.cost);
    let pluralized = pluralize(compare_obj.name, num, true);
    resultCompare.textContent = pluralized;
    populateImages(num, compare_obj);

}

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

function addSignUpEventListener() {
    signUpBtn.addEventListener("click", createNewUser)
}

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

function addLoginEventListener() {
    loginBtn.addEventListener("click", loginUser);
}

function loginUser() {
    fetch(`${userUrl}/${username.value}`)
    .then(resp => resp.json())
    .then(json => validateUser(json))
    .catch(err => err.message);
}

function validateUser(response) {
    // debugger;
    if (response) {
        //change login to logout
        //make worth/not btn available
        //save user to local storage
        //load wishlist
        // debugger;
        $("#loginModal").modal("hide");
        saveUserToLocalStorage(response);
        toggleBtns(response.id);
    } else {
        userName.value = "Invalid Login"
    }
}

function saveUserToLocalStorage(user) {
    localStorage.setItem("user_id", user.id);
}

function checkLocalStorage() {
    let userId = localStorage.getItem("user_id");
    console.log(`User id: ${userId}`);
    if (userId) {
        toggleBtns(userId);
    } else {
        //insert msg = username does not exist
    }
}

function toggleBtns(userId) {
    let btns = [resultBtns, navWishListBtn, navLogoutBtn];
    
    for (let btn of btns) {
        console.log(`${btn} - ${btn.style.display}`)
        if (userId) {
            btn.style.display = "block";
            navLoginBtn.style.display = "none";
        } else {
            btn.style.display = "none";
            navLoginBtn.style.display = "block";
        }
    }
}

function addLogoutEventListener() {
    navLogoutBtn.addEventListener("click", logoutUser)
}

function logoutUser() {
    localStorage.removeItem("user_id");
    toggleBtns();
}

function addSlideOpenEventListener() {
    navWishListBtn.addEventListener("click", openList)
}

function openList() {
    slideMenu.style.width = "30%";
}

function addSlideClosedEventListener() {
    exitMenuBtn.addEventListener("click", closeList)
}

function closeList() {
    slideMenu.style.width = "0";
}

function loadListeners() {
    addDropdownEventListener();
    addSignUpEventListener();
    addLoginEventListener();
    addLogoutEventListener();
    addSlideOpenEventListener();
    addSlideClosedEventListener();
}

checkLocalStorage();
fetchWishlistItems();
fetchComparisonItems();
loadListeners();