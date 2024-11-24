
  let cart = [];
  function updateCart() {
      const cartItemsContainer = document.querySelector('.cart-items');
      cartItemsContainer.innerHTML = '';
      let totalPrice = 0;

      cart.forEach(item => {
          totalPrice += item.price * item.quantity;
          cartItemsContainer.innerHTML += `
              <div class="cart-item">
                  <h4>${item.name}</h4>
                  <p>Price: ${item.price} Rs/-</p>
                  <p>Quantity: 
                      <button class="decrease" data-name="${item.name}">-</button>
                      ${item.quantity}
                      <button class="increase" data-name="${item.name}">+</button>
                  </p>
                  <button class="remove" data-name="${item.name}">Remove</button>
              </div>
          `;
      });

      document.getElementById('totalPrice').innerText = totalPrice;
  }

  // Event listener for Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
          const name = button.getAttribute('data-name');
          const price = parseFloat(button.getAttribute('data-price'));

          const existingItem = cart.find(item => item.name === name);
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cart.push({ name, price, quantity: 1 });
          }
          updateCart();
      });
  });

  // Event listeners for increase, decrease, and remove buttons
  document.querySelector('.cart').addEventListener('click', (event) => {
      const { target } = event;
      const name = target.getAttribute('data-name');

      if (target.classList.contains('increase')) {
          const item = cart.find(item => item.name === name);
          if (item) {
              item.quantity += 1;
              updateCart();
          }
      } else if (target.classList.contains('decrease')) {
          const item = cart.find(item => item.name === name);
          if (item && item.quantity > 1) {
              item.quantity -= 1;
              updateCart();
          }
      } else if (target.classList.contains('remove')) {
          cart = cart.filter(item => item.name !== name);
          updateCart();
      }
  });

  // Event listener for Place Order button
  document.getElementById('placeOrder').addEventListener('click', () => {
      if (cart.length > 0) {
          Swal.fire({
              title: 'Thank you for your order!',
              text: 'Your order has been placed successfully.',
              icon: 'success',
              confirmButtonText: 'Okay'
          });
          cart = []; // Clear the cart
          updateCart(); // Update cart display
      } else {
          Swal.fire({
              title: 'Cart is empty!',
              text: 'Please add items to your cart before placing an order.',
              icon: 'warning',
              confirmButtonText: 'Okay'
          });
      }
  });

  // Event listener for View Order Summary button
  document.getElementById('viewOrderSummary').addEventListener('click', () => {
      if (cart.length > 0) {
          let summary = 'Order Summary:\n';
          let totalItems = 0;

          cart.forEach(item => {
              summary += `${item.name} - Quantity: ${item.quantity} - Price: ${item.price * item.quantity} Rs/-\n`;
              totalItems += item.quantity;
          });

          summary += `Total Items: ${totalItems}\nTotal Price: ${document.getElementById('totalPrice').innerText} Rs/-`;
          alert(summary);
      } else {
          alert('Your cart is empty!');
      }
  });