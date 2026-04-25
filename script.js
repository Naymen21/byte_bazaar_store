const storeInventory = [
  {
    name: 'HyperX Alloy Origins 60',
    colors: ['Black', 'RGB'],
    materials: ['metal','plastic'],
    price: 69.99,
    description: 'Mechanical Gaming Keyboard',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/hyperkeyboard.jpg?raw=true'
  },
  {
    name: 'Logitech G203 Gaming Mouse',
    colors: ['black', 'RGB', 'white'],
    materials: ['LED','plastic'],
    price: 49.00,
    description: 'LIGHTSYNC Wired 8000dpi',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/logitechmouse.jpg?raw=true'
  },
  {
    name: 'Beats Studio Buds',
    colors: ['black', 'grey', 'white'],
    materials: ['sillicone','plastic'],
    price: 99.99,
    description: 'Wireless Noise Cancelling Earbuds',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/beatsheadphone.jpg?raw=true'
  },
  {
    name: 'Wireless 3 in 1 Charger',
    colors: ['grey','white','black'],
    materials:['metal', 'plastic'],
    price: 49.99,
    description: 'Premium 3 in 1 multiple charger stand',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/wirelesscharger.png?raw=true'
  },
  {
    name: 'Smart Light Bars',
    colors: ['RGB'],
    materials: ['plastic'],
    price: 65.00,
    description:'Smart RBG multi use Light bars',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/smartlightbar.jpg?raw=true'
  },
  {
    name: 'USB C Hub',
    colors: ['grey'],
    materials: ['plastic'],
    price: 45.00,
    description:'Multi Usage UCB C Hub',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/usbchub.jpg?raw=true'
  },
  {
    name: 'Digital Writing Tablet',
    colors: ['black'],
    materials: ['plastic'],
    price: 95.00,
    description:'Smooth touch drawing tablet',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/writingtablet.jpg?raw=true'
  },
  {
    name:'Mouse Pad',
    colors: ['white', 'black'],
    materials: ['leather'],
    price:35.00,
    description:'High Quality no traction mouse pad',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/mousepad.jpg?raw=true'
  },
  {
    name: 'Laptop Stand',
    colors:['white','silver','gray'],
    materials: ['metal','plastic'],
    price:100.00,
    description: 'High Quality Metal Stand',
    image: 'https://github.com/Naymen21/byte_bazaar_store/blob/main/images/laptopstand.jpg?raw=true'
  }
];

const checkoutOverlay = document.getElementById("checkout-overlay");
const checkoutSummary = document.getElementById("checkout-summary");
const checkoutTotal = document.getElementById("checkout-total");
const backCartBtn = document.getElementById("back-cart");
const placeOrderBtn = document.getElementById("place-order");

const productDiv = document.getElementById("product");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = {};

const toast = document.createElement("div");
toast.className = "toast";
toast.innerText = "Added to cart";
document.body.appendChild(toast);

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function addToCart(index) {
  const item = storeInventory[index];

  if (cart[item.name]) {
    cart[item.name].quantity++;
  } else {
    cart[item.name] = {
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    };
  }

  updateCart();
  showToast();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  for (let itemName in cart) {
    const item = cart[itemName];
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}">
      
      <div class="cart-item-details">
        <strong>${item.name}</strong><br>
        $${item.price.toFixed(2)}
      </div>

      <div class="quantity-controls">
        <button onclick="decreaseItem('${itemName}')">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseItem('${itemName}')">+</button>
      </div>

      <button class="delete-button" onclick="removeItem('${itemName}')">🗑️</button>
    `;

    cartItems.appendChild(div);
  }

  cartTotal.innerText = `Total: $${total.toFixed(2)}`;

  const checkoutBtn = document.createElement("button");
  checkoutBtn.className = "checkout-btn";
  checkoutBtn.innerText = "Secure Checkout";

  checkoutBtn.onclick = openCheckout;

  cartItems.appendChild(checkoutBtn);
}

function openCheckout() {
  checkoutOverlay.classList.remove("hidden");

  checkoutSummary.innerHTML = "";
  let total = 0;

  for (let itemName in cart) {
    const item = cart[itemName];
    total += item.price * item.quantity;

    checkoutSummary.innerHTML += `
      <p>${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}</p>
    `;
  }

  checkoutTotal.innerText = `Final Total: $${total.toFixed(2)}`;
}

backCartBtn.onclick = () => {
  checkoutOverlay.classList.add("hidden");
};

placeOrderBtn.onclick = () => {
  alert("Order placed successfully!");

  cart = {};
  updateCart();

  checkoutOverlay.classList.add("hidden");
};

function increaseItem(name) {
  cart[name].quantity++;
  updateCart();
}

function decreaseItem(name) {
  cart[name].quantity--;
  if (cart[name].quantity <= 0) delete cart[name];
  updateCart();
}

function removeItem(name) {
  delete cart[name];
  updateCart();
}

storeInventory.forEach((item, index) => {
  productDiv.innerHTML += `
    <div class="productnode" style="animation-delay:${index * 0.08}s">
      <img src="${item.image}">

      <div class="product-popup">
        ${item.description}
      </div>

      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>

      <button class="rounded-button" onclick="addToCart(${index})">
        Add To Cart
      </button>
    </div>
  `;
});
