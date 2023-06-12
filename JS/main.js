$(function () {
    /*Mneu nav toggle*/
    $('.menu-btn').on("click", function (event) {
        event.preventDefault();

        $('.arrow').toggleClass("active");
        $('.menu').toggleClass("active");

    });
});