document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.querySelectorAll('.cart-btn');
  const cartCircle = document.querySelector('.circle');
  const cartModal = document.getElementById('mymod-cart');
  const cartContent = cartModal.querySelector('.row-cart1');
  const totalPriceElement = cartModal.querySelector('.price-total h3');
  const orderSection = cartModal.querySelector('.order');
  const orderItemsContainer = orderSection.querySelector('.order-cart p');
  const totalButton = cartModal.querySelector('.btn-total input');
  const modalContentCart = cartModal.querySelector('.modal-cont-cart');
  const orderItemCount = cartModal.querySelector('#order-item-count');
  const orderTotalPrice = cartModal.querySelector('#order-total-price');

  let cartItems = [];
  let totalPrice = 0;

  document.querySelectorAll('.sneaker .hov-btn img[src="content/add-to-cart.svg"], .sneaker .seventh-btn input[type="button"]').forEach(btn => {
    btn.addEventListener('click', addToCart);
  });  

  function addToCart(event) {
    const sneakerElement = event.target.closest('.sneaker');
    const name = sneakerElement.querySelector('.name').textContent;
    const price = parseInt(sneakerElement.querySelector('.price').textContent.replace(/\D/g, ''), 10);
    const imgSrc = sneakerElement.querySelector('img').src;

    const product = { name, price, imgSrc };
    cartItems.push(product);
    totalPrice += price;

    updateCartUI();
  }

  function updateCartUI() {
    if (cartCircle) {
      cartCircle.textContent = cartItems.length > 0 ? cartItems.length.toString() : '';
      cartCircle.style.display = cartItems.length > 0 ? 'block' : 'none';
    }

    if (cartItems.length === 0) {
      cartContent.innerHTML = '<p>Пополните корзину!</p>';
    } else {
      cartContent.innerHTML = '';
      cartItems.forEach((item, index) => {
        const productHTML = `
          <div class="product" data-index="${index}">
            <div class="img-product">
              <img src="${item.imgSrc}" alt="" srcset="">
            </div>
            <div class="product-name">
              <p>${item.name}</p>
              <h3>${item.price.toLocaleString()} ₽</h3>
            </div>
            <div class="product-trash">
              <img src="content/trash 1.svg" width="20px" height="20px" alt="" srcset="">
            </div>
          </div>
        `;
        cartContent.insertAdjacentHTML('beforeend', productHTML);
      });

      cartContent.querySelectorAll('.product-trash img').forEach(trashIcon => {
        trashIcon.addEventListener('click', removeFromCart);
      });
    }

    if (totalPriceElement) {
      totalPriceElement.textContent = `${totalPrice.toLocaleString()} ₽`;
    }
  }

  function removeFromCart(event) {
    const productElement = event.target.closest('.product');
    const index = parseInt(productElement.dataset.index, 10);
    totalPrice -= cartItems[index].price;
    cartItems.splice(index, 1);

    updateCartUI();
  }

  function updateOrderUI() {
    orderItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
      const orderItemHTML = `
        <div class="product" data-index="${index}">
          <div class="img-product">
            <img src="${item.imgSrc}" alt="" srcset="">
          </div>
          <div class="product-name">
            <p>${item.name}</p>
            <h3>${item.price.toLocaleString()} ₽</h3>
          </div>
          <div class="product-trash">
            <img src="content/trash 1.svg" width="20px" height="20px" alt="" srcset="">
          </div>
        </div>
      `;
      orderItemsContainer.insertAdjacentHTML('beforeend', orderItemHTML);
    });

    orderItemsContainer.querySelectorAll('.product-trash img').forEach(trashIcon => {
      trashIcon.addEventListener('click', removeFromOrder);
    });

    cartModal.querySelector('.order-items span').textContent = cartItems.length;
    cartModal.querySelector('.order-price span').textContent = `${totalPrice.toLocaleString()} ₽`;
  }

  function removeFromOrder(event) {
    const productElement = event.target.closest('.product');
    const index = parseInt(productElement.dataset.index, 10);
    totalPrice -= cartItems[index].price;
    cartItems.splice(index, 1);

    updateCartUI();
    updateOrderUI();
  }

  totalButton.addEventListener('click', () => {
    if (cartItems.length === 0) {
      return;
    }

    modalContentCart.style.display = 'none';
    orderSection.style.display = 'flex';

    updateOrderUI();
  });

  window.onclick = function(event) {
    modals.forEach(modal => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
    if (event.target == cartModal) {
      cartModal.style.display = "none";
      modalContentCart.style.display = 'block';
      orderSection.style.display = 'none';
    }
  };
});

const mymodCart = document.getElementById('mymod-cart');
const cartBtn = document.querySelectorAll('.cart-btn');
const modals = document.querySelectorAll('.mymod');
const btns = document.querySelectorAll('.mybtn');

cartBtn.forEach(btn => {
  btn.onclick = function() {
    mymodCart.style.display = "block";
  }
});

btns.forEach((btn, index) => {
  btn.onclick = function() {
    modals[index].style.display = "block";
  }
});
