const storeInventory = [
  {
    name: 'HyperX Alloy Origins 60',
    colors: ['Black', 'RGB'],
    materials: ['metal','plastic'],
    price: 69.99,
    description: 'Mechanical Gaming Keyboard',
    image: 'images/hyperkeyboard.jpg'
  },
  {
    name: 'Logitech G203 Gaming Mouse',
    colors: ['black', 'RGB', 'white'],
    materials: ['LED','plastic'],
    price: 49.00,
    description: 'LIGHTSYNC Wired 8000dpi',
    image: 'images/logitechmouse.jpg'
  },
  {
    name: 'Beats Studio Buds',
    colors: ['black', 'grey', 'white'],
    materials: ['sillicone','plastic'],
    price: 99.99,
    description: 'Wireless Noise Cancelling Earbuds',
    image: 'images/beatsheadphone.jpg'
  },
  {
    name: 'Wireless 3 in 1 Charger',
    colors: ['grey','white','black'],
    materials:['metal', 'plastic'],
    price: 49.99,
    description: 'Premium 3 in 1 multiple charger stand',
    image: 'images/wirelesscharger.png'
  },
  {
    name: 'Smart Light Bars',
    colors: ['RGB'],
    materials: ['plastic'],
    price: 65.00,
    description:'Smart RBG multi use Light bars',
    image: 'images/smartlightbar.jgp'
  },
  {
    name: 'USB C Hub',
    colors: ['grey'],
    materials: ['plastic'],
    price: 45.00,
    description:'Multi Usage UCB C Hub',
    image: 'images/usbchub.jpg'
  },
  {
    name: 'Digital Writing Tablet',
    colors: ['black'],
    materials: ['plastic'],
    price: 95.00,
    description:'Smooth touch drawing tablet',
    image: 'images/writingtablet.jpg'
  },
  {
    name:'Mouse Pad',
    colors: ['white', 'black'],
    materials: ['leather'],
    price:35.00,
    description:'High Quality no traction mouse pad',
    image: 'images/mousepad.jpg'
  },
  {
    name: 'Laptop Stand',
    colors:['white','silver','gray'],
    materials: ['metal','plastic'],
    price:100.00,
    description: 'High Quality Metal Stand',
    image: 'images/laptopstand.jpg'
  }
];

const productDiv = document.getElementById("product");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = {};

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  for (let itemName in cart) {
    const item = cart[itemName];
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <strong>${item.name}</strong><br>
        $${item.price.toFixed(2)} x ${item.quantity}
      </div>
      <div class="quantity-controls">
        <button onclick="decreaseItem('${itemName}')">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseItem('${itemName}')">+</button>
      </div>
      <button onclick="removeItem('${itemName}')">X</button>
    `;

    cartItems.appendChild(div);
  }

  cartTotal.innerText = `Total: $${total.toFixed(2)}`;
}

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

function increaseItem(itemName) {
  cart[itemName].quantity += 1;
  updateCart();
}

function decreaseItem(itemName) {
  cart[itemName].quantity -= 1;
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
      <br>
      ${item.name}<br>
      $${item.price.toFixed(2)}<br>
      <button class="rounded-button" onclick="addToCart(${index})">add to cart</button>
    </div>
  `;
});
