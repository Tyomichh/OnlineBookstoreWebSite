/*Navigation burger*/
$('.menu-burger').on('click', e => {
  $('.menu-wrapper').toggleClass('active-wrap');
});

$(document).on('click', e => {
  const click = e.originalEvent.composedPath().includes($('.menu-burger').get(0));
  const clickedEl = e.target;
  const isMenLnk = Array.from($('.menu-list-link')).some(link => link.contains(clickedEl));

  if (clickedEl === $('.menu-list').get(0) || clickedEl === $('.menu-input').get(0) || isMenLnk) {
    return;
  } else if (!click) {
    $('.menu-wrapper').removeClass('active-wrap');
  }
});







const shopping = document.querySelector('.shopping-cart'),//SHOPPING = SHOPPING
  shplist = document.querySelector('.shopping-list'),// CARD = shplist
  cls = document.querySelector('.clsShopping');// Closehopping = cls

shopping.addEventListener('click', () => {
  shplist.classList.add('active-shopping');
})
cls.addEventListener('click', () => {
  shplist.classList.remove('active-shopping');
})


// // Оновлюємо кількість товарів у корзині
// const currentQuantity = parseInt(shoppingQuantity.textContent);
// shoppingQuantity.textContent = currentQuantity + 1;

const productContainers = Array.from(document.querySelectorAll('.product-container-ctlg'));
let products = [];
let encounteredNames = {};
let quantyty = document.querySelector('.shopping-quantyty');// QUANTYTY = QUANTYTY
let listCard = document.querySelector('.shopping-listCard');//LISTCARD = LISTCARD
let total = document.querySelector('.total');//TOTAL = TOTAL
//LIST = product-container-ctlg

productContainers.forEach((container, index) => {
  const name = container.querySelector('.book_name').textContent;

  // Перевірка на унікальність назви
  if (encounteredNames[name]) {
    return; // Якщо назва вже зустрічалася, пропускаємо поточний елемент
  }

  encounteredNames[name] = true;

  const image = container.querySelector('img').getAttribute('src');
  const price = parseFloat(container.querySelector('.montserat-SemiBold_green').textContent);

  const product = {
    numbr: index + 1,
    name: name,
    image: image,
    price: price,
  };

  container.setAttribute('data-key', index);

  products.push(product);
});
let listCards = [];

console.log(products);

function AddToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = products[key];
    listCards[key].quantyty = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantyty;

    if (value != null) {
      let newDiv = document.createElement('li');

      newDiv.innerHTML = `
    <img class="cart_list-img" src="${value.image}">
    <div class="cart_list-text_block montserat-cardLi">
      <div class="cart_list-book_name">${value.name}</div>
      <div>${value.price.toLocaleString()}$</div>
    </div>
    <div class="cart_list-MrLss_block montserat-cardLi">
      <button class="cart_list-MrLss_block_style" onclick="changeQuantity(${key},${value.quantyty - 1})">-</button>
      <div class="cart_list-count">${value.quantyty}</div>
      <button class="cart_list-MrLss_block_style" onclick="changeQuantity(${key},${value.quantyty + 1})">+</button>
     </div>`

      listCard.appendChild(newDiv);
    }
  })

  total.innerText = totalPrice.toLocaleString();
  quantyty.innerText = count;
}

function changeQuantity(key, quantyty) {
  if (quantyty == 0){
    delete listCards[key];
  }
  else {
    listCards[key].quantyty = quantyty;
    listCards[key].price = quantyty * products[key].price;



    //щоб можна було додавати товари повторно натискаючи на корзину
    //щоб правильно рахувало
    //щоб можна було додавати товари не тільки з product-container-ctlg
    // коли більше 11 лішок блоку чекаут видається position: sticky



    
  }
  reloadCard();
}

const addToCartButtons = document.querySelectorAll('.btn-add_to_cart');
addToCartButtons.forEach((button) => {
  button.setAttribute('onclick', `AddToCart(this.closest('.product-container-ctlg').getAttribute('data-key'))`);
})




/*Smooth scroll*/
$('[data-scroll]').on('click', function (event) {
  event.preventDefault();

  var blockID = $(this).data('scroll'),
    blockOffset = $(blockID).offset().top;

  $('.menu-list-link').removeClass('active-list');
  $(this).addClass('active-list');

  $('html, body').animate({
    scrollTop: blockOffset
  }, 500);

});





/*CATALOG PRODUCT FILTER*/
const list = $('.catalog-nav');
const items = $('.product-container-ctlg');
const listItems = $('.catalog-nav-list');
const swMr = $('.showMrScroll');

function filter() {
  list.on('click', function (ev) {
    const targetId = $(ev.target).data('id');
    const target = ev.target;

    console.log(targetId);
    if ($(target).hasClass('catalog-nav-list')) {
      listItems.removeClass('catalog-nav-active');
      $(target).addClass('catalog-nav-active');
    }

    switch (targetId) {
      case 'all':
        // getItems('product-container-ctlg');
        swMr.css('opacity', '1');
        swMr.css('pointer-events', 'auto');
        $('.product-container-ctlg').addClass('d_none');
        $('.product-container-ctlg:lt(' + 6 + ')').removeClass('d_none');
        break;

      case 'psychology_tag':
      case 'fiction_tag':
      case 'non-fiction_tag':
      case 'business&finance_tag':
      case 'history_tag':
      case 'philosophy_tag':
        getItems(targetId);
        swMr.css('opacity', '0.5');
        swMr.css('pointer-events', 'none');
        $('.showMrScroll').removeClass('btn-show_less');
        $('.showMrScroll').addClass('btn-show_more');
        break;
    }
  });
}

filter();

function getItems(IDName) {
  items.each(function () {
    if (this.id === IDName) {
      $(this).removeClass('d_none');
    } else {
      $(this).addClass('d_none');
    }
  });
}





/*Show more show less btn with smooth scroll*/
let contProductCntnrs = $('.product-container-ctlg').length,
  start = 6,
  show = 3,
  fullend = $('.product-container-ctlg').length;


$('.product-container-ctlg').addClass('d_none');
$('.product-container-ctlg:lt(' + start + ')').removeClass('d_none');


$(document).on('click', '.btn-show_more', function () {

  $('html,body').animate({
    scrollTop: $('.showMrScroll').offset().top
  }, 800);

  start = (start + show <= contProductCntnrs) ? start + show : contProductCntnrs;

  $('.product-container-ctlg:lt(' + start + ')').removeClass('d_none');

  if ($('.product-container-ctlg:not(.d_none)').length === contProductCntnrs) {
    $('.showMrScroll').removeClass('btn-show_more');
    $('.showMrScroll').addClass('btn-show_less');
  }

});


$(document).on('click', '.btn-show_less', function () {

  start = 6;

  fullend = (fullend <= 6) ? $('.product-container-ctlg').length : fullend;
  fullend = (fullend >= start) ? fullend - show : start;

  $('.product-container-ctlg:gt(' + (fullend - 1) + ')').addClass('d_none');

  if ($('.d_none').length === (start + 3)) {
    $('.showMrScroll').removeClass('btn-show_less');
    $('.showMrScroll').addClass('btn-show_more');
  }

  $('html,body').animate({
    scrollTop: $('.showLsScroll:not(.d_none)').last().offset().top
  }, 800);

});





$('.block_slider').slick({
  slidesToShow: 3,
  speed: 500,
  eassng: 'linear',
  draggble: false,
  centerMode: true,
  variableWidth: true,
  adaptiveHeight: false,
  initialSlide: 1
});

