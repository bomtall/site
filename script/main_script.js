
// function sticky_scroll() {
//     if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky")
//         loginbar.classList.add("sticky2")
//     } else {
//         navbar.classList.remove("sticky");
//         loginbar.classList.remove("sticky2");
//     }
// }




function close_modal() {
    modal.style.display = "none";
}

function validateLogin() {
    let x = document.forms["loginForm"]["adminpassword"].value;
    if (x != "CorrectPassword") {
        window.alert("Incorrect Password");
    }
};





