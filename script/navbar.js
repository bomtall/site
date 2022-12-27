window.onscroll = function () { navbar_scroll() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


function navbar_scroll() {

    if (window.pageYOffset >= sticky) {
        navbar.classList.add("navigation")

    } else {
        navbar.classList.remove("navigation");

    }
}

