import Api from "../services/api.js";
const api = new Api();

let allProduct = [];
let cart = [];

/* =======================
   API & Render Sản phẩm
   ======================= */

// Render danh sách sản phẩm
function renderProductList(data) {
  const container = document.getElementById("productList");
  container.innerHTML = data.map(product => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card cardPhone">
        <img src="../img/${product.image}.jpg" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h3 class="cardPhone__title">${product.name}</h3>
              <p class="cardPhone__text">${product.type}</p>
            </div>
            <div>
              <h3 class="cardPhone__title">$${product.price}</h3>
            </div>
          </div>
          <p class="cardPhone__text">Mô tả: ${product.desc}</p>
          <button 
            class="btnPhone-shadow mt-2 btn-add-cart"
            data-name="${product.name}"
            data-price="${product.price}"
            data-img="${product.image}">
            <i class="fa fa-shopping-cart"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Gắn sự kiện addToCart
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const img = btn.dataset.img;
      addToCart({ name, price, img });
    });
  });
}

// Lấy danh sách sản phẩm từ API
async function getListProduct() {
  try {
    const result = await api.fetchListData();
    allProduct = result.data;
    renderProductList(allProduct);
  } catch (error) {
    console.error("Lỗi khi load sản phẩm:", error);
  }
}
getListProduct();

// Filter theo loại
document.getElementById("filterType").addEventListener("change", function () {
  let selected = this.value;
  let filtered = (selected === "all") 
    ? allProduct 
    : allProduct.filter(p => p.type === selected);
  renderProductList(filtered);
});

// Thêm sản phẩm vào giỏ
function addToCart(product) {
  let existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  renderCart();
}

// Tính tổng giỏ hàng
function calculateCart() {
  return cart.reduce((acc, item) => {
    acc.total += item.price * item.quantity;
    acc.count += item.quantity;
    return acc;
  }, { total: 0, count: 0 });
}
// Nút thanh toán
document.getElementById("thanhToan").addEventListener("click", () => {
  if (confirm("Bạn có chắc chắn muốn thanh toán không?")) {
    cart = [];
    saveCart();
    renderCart();
    alert("Thanh toán thành công!");
  }
});

// Render giỏ hàng
function renderCart() {
  let cartItems = document.getElementById("cartItems");
  let cartTotal = document.getElementById("cartTotal");
  let bagCount = document.querySelector(".bag-count");
  let countTitle = document.querySelector("#sidebar-cart h2 .count");

  const { total, count } = calculateCart();

  cartItems.innerHTML = cart.map((item, index) => `
    <li class="product">
      <span class="product-image">
        <img src="../img/${item.img}.jpg" alt="${item.name}" width="100">
      </span>
      <span class="product-details">
        <h3>${item.name}</h3>
        <span class="qty-control">
          <button class="qty-minus" data-index="${index}">-</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-plus" data-index="${index}">+</button>
        </span>
        <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
      </span>
      <a href="javascript:void(0)" class="remove-button" data-index="${index}">
        <span class="remove-icon">X</span>
      </a>
    </li>
  `).join("");

  cartTotal.innerText = `$${total.toFixed(2)}`;
  bagCount.innerText = count;
  countTitle.innerText = count;

  saveCart();

  bindCartEvents();
}

// Gắn sự kiện cho cart
function bindCartEvents() {
  // Xóa sản phẩm
  document.querySelectorAll(".remove-button").forEach(btn => {
    btn.addEventListener("click", () => {
      let index = btn.dataset.index;
      cart.splice(index, 1);
      renderCart();
    });
  });

  // Giảm số lượng
  document.querySelectorAll(".qty-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      let index = btn.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    });
  });

  // Tăng số lượng
  document.querySelectorAll(".qty-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      let index = btn.dataset.index;
      cart[index].quantity++;
      renderCart();
    });
  });

}

// LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function loadCart() {
  let storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart();
  }
}
window.onload = () => loadCart();


/* =======================
   UI Sidebar + DarkMode
   ======================= */

const toggleBtn = document.querySelector('.sidebarMini__button');
const sidebarMini = document.querySelector('.sidebarMini');
const switchBtn = document.querySelector('#checkbox');

toggleBtn.addEventListener('click', () => {
  sidebarMini.classList.toggle('is-opened');
});

switchBtn.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('darkMode');
});

// Sidebar Cart
$(document).ready(function($) {
  const $body = $("body");

  $(".cart-button, .close-button, #sidebar-cart-curtain").click(function(e) {
    e.preventDefault();
    $body.toggleClass("show-sidebar-cart");

    if ($("#sidebar-cart-curtain").is(":visible")) {
      $("#sidebar-cart-curtain").fadeOut(500);
    } else {
      $("#sidebar-cart-curtain").fadeIn(500);
    }
  });
});
