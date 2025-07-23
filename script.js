document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {id : 1, name: 'Product 1', price: 10.00},
    {id : 2, name: 'Product 2', price: 20.00},
    {id : 3, name: 'Product 3', price: 30.00},
  ];
  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutButton = document.getElementById("checkout-button");

  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} -  $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
  productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
       const productId = parseInt(event.target.getAttribute("data-id"));
       const product = products.find(p => p.id === productId);
       addToCart(product);
    }
  });
      function addToCart(product) {
        const cartItem = cart.find(item => item.product.id === product.id);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          cart.push({ product, quantity: 1 });
        }
        renderCart();
      }
  function renderCart() {
    cartItems.innerHTML = '';
    if (cart.length) {
      emptCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      let totalPrice = 0;
      cart.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        totalPrice += itemTotal;
        const cartItemDiv = document.createElement("div");
        cartItemDiv.innerHTML = `
          ${item.product.name} x ${item.quantity} - $${itemTotal.toFixed(2)}
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItemDiv);
      });
      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
    } else {
      emptCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "0.00";
    }
  }
 
  checkOutButton.addEventListener('click', () => {
    cart.length = 0; 
    alert("Checkout successful!"); 
    renderCart();   
  });
  
  cartItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      cart.splice(index, 1);
      renderCart();
    }
  });
});