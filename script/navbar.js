
// Stciky navigation bar implementation for landing page

window.onscroll = function () { navbar_scroll() };


// save the navigation bar to a variable and find its position
var navbar = document.getElementById("navbar");
var navbarOffset = navbar.offsetTop;


function navbar_scroll() {

    // check the scroll position
    if (window.pageYOffset >= navbarOffset) {

        // if the user has scrolled past the navbar, stick it to the top
        navbar.classList.add("navigation")

    } else {

        // if the user has not scrolled past the navbar, remove the CSS rules, leave it in position
        navbar.classList.remove("navigation");

    }
}



