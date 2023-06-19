const menuBTN = $('.menu-burger'),
  menWrp = $('.menu-wrapper'),
  menLst = $('.menu-list'),
  menLnk = $('.menu-list-link'),
  menInp = $('.menu-input');
let elements = $('[id]');
const idArray = [];


/*Adding id tags for navigatiton to the arr*/ 
elements.each(function() {
    if (this.id.endsWith("_tag")) {
      idArray.push(this.id);
    }
  });

console.log(idArray);


/*Navigation burger*/
menuBTN.on('click', (e) => {
  menWrp.toggleClass('active-wrap');
});

$(document).on('click', (e) => {
  const click = e.originalEvent.composedPath().includes(menuBTN.get(0));
  const clickedEl = e.target;
  const isMenLnk = Array.from(menLnk).some(link => link.contains(clickedEl));

  if (clickedEl === menLst.get(0) || clickedEl === menInp.get(0) || isMenLnk) {
    return;
  } else if (!click) {
    menWrp.removeClass('active-wrap');
  }
});


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
  },800);

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

  if ($('.d_none').length === start) {
    $('.showMrScroll').removeClass('btn-show_less');
    $('.showMrScroll').addClass('btn-show_more');
  }

  $('html,body').animate({
    scrollTop: $('.showLsScroll:not(.d_none)').last().offset().top
  },800);

});

$('.block_slider').slick({
  slidesToShow: 3,
  // slidesToScroll: 1,
  // adaptiveHeight: true,
  // autoplay: true,
  // autoplaySpeed: 6000,
  speed: 500,
  eassng: 'linear',
  // infinite: false,
  // initialSlide:3,
  draggble: false,
  // touchThreshold: 10,
  // touchMove: false,
  // waitForAnimate: 10,
  centerMode: true,
  variableWidth: true,
  adaptiveHeight: false,
  // rows: 2,
  // slidesPerRow: 3,
  //vertical: true, //Потрібно щоб слайдер не був флексовим
  // asNavFor: "назва пов'язаного слайдера"
  /* responsive:[{
    breakpoints: 768;
    settings {
      slidesToShow: 2;
    }
  }]*/
});
	
