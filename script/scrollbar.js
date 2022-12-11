window.onscroll = function () { sticky_scroll() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


function sticky_scroll() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        loginbar.classList.add("sticky2")
    } else {
        navbar.classList.remove("sticky");
        loginbar.classList.remove("sticky2");
    }
}
