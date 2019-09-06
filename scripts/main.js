/* All fetches */



var pluralize = import('pluralize')


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
    .then(json => json)
    .catch(err => err.message);
}

// Fetches all the wishlist items for current user
function fetchWishlistItems() {
    let username = localStorage.getItem("user_name");
    fetch(`${userUrl}/${username}`)
    .then(resp => resp.json())
    .then(json => {
        displayWishlist(json.items, username);
    })
    .catch(err => err.message);
}

// Fetches all the comparison items
function fetchComparisonItems() {
    fetch(comparisonUrl)
    .then(resp => resp.json())
    .then(json => displayComparisonItems(json))
    .catch(err => err.message);
}

// Fetches a single comparison item
function fetchComparisonItem(cost, id) {
    fetch(`${comparisonUrl}/${id}`)
    .then(resp => resp.json())
    .then(obj => displayItemCount(cost, obj));
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
    .catch(err => err.message);
}

// Updates the database with new user information
function updateUser() {
    let userId = localStorage.getItem("user_id");
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            email: editEmailInput.value
        })
    }
    fetch(`${userUrl}/${userId}`, configObj)
    .then(resp => resp.json())
    .then(obj => console.log(obj))
    .catch(err => err.message)
}

// Updates the database with the selected items with information 
// Refetches wishlist items and re-renders wishlist
function updateItem() {
    console.log("Updating...")
    let itemId = localStorage.getItem("cur_item_id");
    configObj = { method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
            cost: wishItemCostCell.value,
            name: wishItemNameCell.value
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
    .catch(err => err.message);
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
function displayWishlist(items, username) {
    if (username[username.length-1] !== "s") {
        usernameDisplay.textContent = `${username}'s`;
    } else {
        usernameDisplay.textContent = `${username}'`;
    }
    clearWishlist();
    items.forEach(item => {
        let li = document.createElement("li");
        li.setAttribute("class", "isWishList");
        let link = document.createElement("a");
        link.setAttribute("class", "isWishList");
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
    slideMenu.style.width = "350px";
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
    wishItemNameCell.value = item.name;
    wishItemCostCell.value = `${item.cost.toFixed(2)}`;
    setCurrentItemInLocalStorage(item);
}

function setCurrentItemInLocalStorage(item) {
    localStorage.removeItem("cur_item_id");
    localStorage.removeItem("cur_item_name");
    localStorage.removeItem("cur_item_cost");
    localStorage.setItem("cur_item_id", item.id);
    localStorage.setItem("cur_item_name", item.name);
    localStorage.setItem("cur_item_cost", item.cost);
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
    closeList();
    clearWishlist();
    toggleBtns();
}

// Makes sure that the user exists in the database
function validateUser(response) {
    if (response) {
        $("#loginModal").modal("hide");
        saveUserToLocalStorage(response);
        customizeUserPage(response.name);
        fetchWishlistItems();
        toggleBtns(response.id);
    } else {
        userName.value = "Invalid Login";
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
    let userName = localStorage.getItem("user_name");
    if (userId) {
        customizeUserPage(userName);
        toggleBtns(userId);
        fetchWishlistItems();
    }
}

// Customizes user link to match user name
function customizeUserPage(name) {
    userBtn.textContent = `${name}`;
    userCell.textContent = `${name}`;
}

// Toggles button access based on login status
function toggleBtns(userId) {
    let btns = [resultBtns, navWishListBtn, navLogoutBtn, userBtn];
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


/* main */

checkLocalStorage();
fetchComparisonItems();
loadListeners();

/* main */