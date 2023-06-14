const menuBTN = $('.menu-burger'),
      menWrp = $('.menu-wrapper'),
      menLst = $('.menu-list'),
      menLnk = $('.menu-list-link'),
      menInp = $('.menu-input');
// let elements = $('[id]');
// const idArray = [];

// /*Adding id tags for navigatiton to the arr*/ 
// elements.each(function() {
//     if (this.id.endsWith("_tag")) {
//       idArray.push(this.id);
//     }
//   });
  
// console.log(idArray);

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
 