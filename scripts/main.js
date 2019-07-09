const wishlist = document.querySelector(".wishlist ul");
const url = "http://localhost:3000/items"

function fetchWishlistItems() {
    fetch(url)
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

fetchWishlistItems();