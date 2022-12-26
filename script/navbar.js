window.onscroll = function () { navbar_scroll() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


function navbar_scroll() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        loginbar.classList.add("sticky2")
    } else {
        navbar.classList.remove("sticky");
        loginbar.classList.remove("sticky2");
    }
}

$(document).ready(function () {
    $("#admin").click(function () {

        if ($("#loginbar").is(":visible")) {
            $("#loginbar").toggle();
        } else if (confirm("This login is only for administrators of the site") == true) { $("#loginbar").toggle(); }


    });
});
$(document).ready(function () {
    $("#gcses").click(function () {
        $("#gcses_list").toggle();
    });

});