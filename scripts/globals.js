/* Globals */

// API endpoints
const wishlistUrl = "https://isitworthitapi.herokuapp.com/items";
const comparisonUrl = "https://isitworthitapi.herokuapp.com/comparison_items";
const userUrl = "https://isitworthitapi.herokuapp.com/users";

// Nav bar elements
const userBtn = document.querySelector("#user-link");
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
const usernameDisplay = document.querySelector("#user-display");
const wishlist = document.querySelector(".wishlist-body ul");
const slideMenu = document.querySelector("#side-menu");
const exitMenuBtn = document.querySelector("#exit-list-btn");

// Left panel - Item name/cost
const leftCompare = document.querySelector(".compare-left form");
const name = leftCompare.children[0].children[1];
const cost = leftCompare.children[1].children[1];

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

// User modal elements
const userCell = document.querySelector("#user-cell");
const editEmailInput = document.querySelector("#edit-email");
const editUserBtn = document.querySelector("#edit-user-btn");


// Read modal elements 
const seeItemModal = document.querySelector("#seeItemModal");
const wishItemNameCell = document.querySelector("#show-item-name");
const wishItemCostCell = document.querySelector("#show-item-cost");
const editBtn = document.querySelector("#edit-btn");
const deleteBtn = document.querySelector("#delete-btn");

// Edit modal elements
const editItemField = document.querySelector("#edit-item");
const editCostField = document.querySelector("#edit-item-cost");
const editConfirmBtn = document.querySelector("#edit-confirm-btn");

/* Globals */