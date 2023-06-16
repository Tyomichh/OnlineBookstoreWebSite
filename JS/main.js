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


let contProductCntnrs = $('.product-container').length,
  start = 9,
  show = 3,
  fullend = $('.product-container').length;

$('.product-container').addClass('d_none');
$('.product-container:lt(' + start + ')').removeClass('d_none');

$(document).on('click', '.btn-show_more', function () {

  start = (start + show <= contProductCntnrs) ? start + show : contProductCntnrs;

  $('.product-container:lt(' + start + ')').removeClass('d_none');

  if ($('.product-container:not(.d_none)').length === contProductCntnrs) {
    $('#showFirst').attr('data-scroll', '#showSecond');
    $('#showFirst').addClass('btn-show_less');
    $('#showFirst').removeClass('btn-show_more');
  }

});

$(document).on('click', '.btn-show_less', function () {

  start = 9;

  fullend = (fullend <= 9) ? $('.product-container').length : fullend;
  fullend = (fullend >= start) ? fullend - show : start;
  $('.product-container:gt(' + (fullend - 1) + ')').addClass('d_none');


  if ($('.d_none').length === (start - 3)) {
    $('#showSecond').attr('data-scroll', '#showFirst');
    $('#showFirst').addClass('btn-show_more');
    $('#showFirst').removeClass('btn-show_less');
  }
});

