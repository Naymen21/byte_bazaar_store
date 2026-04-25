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

const productDiv = document.getElementById("product");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = {};

function addToCart(index) {
  const item = storeInventory[index];

  if (cart[item.name]) {
    cart[item.name].quantity += 1;
  } else {
    cart[item.name] = {
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    };
  }

  updateCart();
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
        <button onclick="decreaseItem('${itemName}')">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseItem('${itemName}')">+</button>
      </div>

      <button class="delete-button" onclick="removeItem('${itemName}')">🗑️</button>
    `;

    cartItems.appendChild(div);
  }

  cartTotal.innerText = `Total: $${total.toFixed(2)}`;
}

function increaseItem(itemName) {
  cart[itemName].quantity++;
  updateCart();
}

function decreaseItem(itemName) {
  cart[itemName].quantity--;

  if (cart[itemName].quantity <= 0) {
    delete cart[itemName];
  }

  updateCart();
}

function removeItem(itemName) {
  delete cart[itemName];
  updateCart();
}

storeInventory.forEach((item, index) => {
  productDiv.innerHTML += `
    <div class="productnode">
      <img src="${item.image}">
      
      <div class="product-popup">
        ${item.description}
      </div>

      <br><br>
      ${item.name}<br>
      $${item.price.toFixed(2)}<br>

      <button class="rounded-button" onclick="addToCart(${index})">
        Add to Cart
      </button>
    </div>
  `;
});

