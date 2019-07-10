const wishlistUrl = "http://localhost:3000/items"
const comparisonUrl = "http://localhost:3000/comparison_items"
const wishlist = document.querySelector(".wishlist ul");
const dropdown = document.querySelector("select");
const leftCompare = document.querySelector(".compare-left form");
const rightCompare = document.querySelector(".compare-right form");
const resultHeader = document.querySelector("#result-header");
const resultCount = document.querySelector("#result-count");
const resultCompare = document.querySelector("#result-compare");


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
        li.textContent = item.name;
        wishlist.appendChild(li);
    })
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
    let name = leftCompare.children[0].children[0].value;
    let cost = leftCompare.children[1].children[0].value;
    if (name && cost) {
        resultHeader.textContent = `The ${name}`;
        fetchComparisonItem(dropdown.value);
    }
}

// Fetch a single comparison item
function fetchComparisonItem(id) {
    console.log(id);
    fetch(`${comparisonUrl}/${id}`)
    .then(resp => resp.json())
    .then(obj => console.log(obj))
}

function loadListeners() {
    addDropdownEventListener();
}

fetchWishlistItems();
fetchComparisonItems();
loadListeners();