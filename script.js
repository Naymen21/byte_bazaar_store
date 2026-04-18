const storeInventory = [
  {
    name: 'HyperX Alloy Origins 60',
    colors: ['Black', 'RGB'],
    materials: ['metal','plastic'],
    price: 69.99,
    description: 'Mechanical Gaming Keyboard',
    image: 'https://i.pinimg.com/1200x/72/0f/cb/720fcb457cfea06b95fca4c153f1b3d4.jpg'
  },
  {
    name: 'Logitech G203 Gaming Mouse',
    colors: ['black', 'RGB', 'white'],
    materials: ['LED','plastic'],
    price: 49.00,
    description: 'LIGHTSYNC Wired 8000dpi',
    image: 'https://i.pinimg.com/1200x/72/4e/9b/724e9b910b2b6b36a97d2bf71a753d10.jpg'
  },
  {
    name: 'Beats Studio Buds',
    colors: ['black', 'grey', 'white'],
    materials: ['sillicone','plastic'],
    price: 99.99,
    description: 'Wireless Noise Cancelling Earbuds',
    image: 'https://i.pinimg.com/1200x/0d/3d/41/0d3d4140a9ce4566ba36f57694928add.jpg'
  },
  {
    name: 'Wireless 3 in 1 Charger',
    colors: ['grey','white','black'],
    materials:['metal', 'plastic'],
    price: 49.99,
    description: 'Premium 3 in 1 multiple charger stand',
    image: 'https://target.scene7.com/is/image/Target/GUEST_97e92039-8fb6-45cb-b376-2b0fd47da4b3?wid=1200&hei=1200&qlt=80'
  },
  {
    name: 'Smart Light Bars',
    colors: ['RGB'],
    materials: ['plastic'],
    price: 65.00,
    description:'Smart RBG multi use Light bars',
    image: 'https://i.pinimg.com/736x/8e/dc/e7/8edce7a3902c23ebad64fca881a27343.jpg'
  },
  {
    name: 'USB C Hub',
    colors: ['grey'],
    materials: ['plastic'],
    price: 45.00,
    description:'Multi Usage UCB C Hub',
    image: 'https://i.pinimg.com/736x/bc/69/8e/bc698e1d63908eacf716771aafa70aa7.jpg'
  },
  {
    name: 'Digital Writing Tablet',
    colors: ['black'],
    materials: ['plastic'],
    price: 95.00,
    description:'Smooth touch drawing tablet',
    image: 'https://i.pinimg.com/736x/e0/c6/86/e0c6861642146e0e6cb862335c9c836d.jpg'
  },
  {
    name:'Mouse Pad',
    colors: ['white', 'black'],
    materials: ['leather'],
    price:35.00,
    description:'High Quality no traction mouse pad',
    image: 'https://i.pinimg.com/736x/ca/ce/87/cace87f6782793a2c6b338f26aafdf3c.jpg'
  },
  {
    name: 'Laptop Stand',
    colors:['white','silver','gray'],
    materials: ['metal','plastic'],
    price:100.00,
    description: 'High Quality Metal Stand',
    image: 'https://i.pinimg.com/736x/25/3b/fa/253bfadfb3008ea04e8148202d33b132.jpg'
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
