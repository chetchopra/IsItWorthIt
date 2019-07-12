/* Event Listeners */

document.addEventListener("click", function (event) {
  if (event.target.classList[0] !== "isWishList") {
    closeList();
  }
})

// Adds event listener to edit button
function addEditBtnEventListener() {
  editBtn.addEventListener("click", updateItem);
}

// Adds event listener to delete button
function addDeleteBtnEventListener() {
  deleteBtn.addEventListener("click", deleteItem);
}

// Adds event listener to edit user button
function addEditUserEventListener() {
  editUserBtn.addEventListener("click", updateUser);
}

// // Adds event listener to confirm edit button
// function addEditConfirmBtnEventListener() {
//   editConfirmBtn.addEventListener("click", function () {
//       updateItem();
//   });
// }

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
  addEditUserEventListener();
  // addEditConfirmBtnEventListener();
}

/* Event Listeners */