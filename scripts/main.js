const wishlist = document.querySelector(".wishlist ul");
const url = "http://localhost:3000/items"

function fetchWishlistItems() {
    fetch(url)
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(err => err.message)
}

fetchWishlistItems();