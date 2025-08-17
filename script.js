// ❌ Insecure user "database" - stored in plain text
let users = [
  { username: "admin", password: "1234" },
  { username: "student", password: "abcd" }
];

let loggedInUser = null; // track current logged-in user
let userCarts = {}; // map username => cart array
let userTotals = {}; // map username => total amount

// Login & Register
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const uname = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const user = users.find(u => u.username === uname && u.password === pass);
  if (user) {
    loggedInUser = uname;
    document.getElementById("loginMsg").innerText = "✅ Logged in as " + uname;

    // Initialize cart for this user if not exists
    if (!userCarts[uname]) userCarts[uname] = [];
    if (!userTotals[uname]) userTotals[uname] = 0;

    // Load user's cart
    cart = userCarts[uname];
    total = userTotals[uname];
    renderCart();
  } else {
    document.getElementById("loginMsg").innerText = "❌ Invalid credentials";
  }
});

// Register new user
document.getElementById("registerBtn").addEventListener("click", function() {
  const uname = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  users.push({ username: uname, password: pass });
  alert("User " + uname + " registered successfully (insecurely).");

  // Initialize empty cart for new user
  userCarts[uname] = [];
  userTotals[uname] = 0;
});

function addToCart(item, price) {
  if (!loggedInUser) {
    alert("You must log in before adding items!");
    return;
  }
  cart.push({ name: item, price: price });
  total += price;

  // Update user's cart map
  userCarts[loggedInUser] = cart;
  userTotals[loggedInUser] = total;

  renderCart();
}

function renderCart() {
  const list = document.getElementById('cartItems');
  list.innerHTML = '';
  let sum = 0;
  cart.forEach(i => {
    list.innerHTML += `<li>${i.name} - $${i.price}</li>`;
    sum += i.price;
  });
  total = sum;

  // Update total for current user
  if (loggedInUser) userTotals[loggedInUser] = total;

  document.getElementById('totalAmount').innerText = `Total: $${total}`;
}

// Place Order
document.getElementById("orderForm").addEventListener("submit", function(e){
  e.preventDefault();
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("orderMessage").innerText = "✅ Order submitted successfully!";
  
  // Clear cart for current user
  cart = [];
  total = 0;
  if (loggedInUser) {
    userCarts[loggedInUser] = [];
    userTotals[loggedInUser] = 0;
  }

  renderCart();
  document.getElementById("orderForm").reset();
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value;
  const msg = document.getElementById("message").value;
  const li = document.createElement("li");
  li.innerHTML = `<b>${name}:</b> ${msg}`;
  document.getElementById("messageList").appendChild(li);
});
