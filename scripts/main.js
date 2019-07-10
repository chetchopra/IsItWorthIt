const wishlistUrl = "http://localhost:3000/items"
const comparisonUrl = "http://localhost:3000/comparison_items"
const wishlist = document.querySelector(".wishlist ul");
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
    fetch(wishlistUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            cost: cost.value,
            user_id: 1
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
}

function loadListeners() {
    addDropdownEventListener();
}

fetchWishlistItems();
fetchComparisonItems();
loadListeners();