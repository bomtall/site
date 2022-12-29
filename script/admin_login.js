
// function to make the login bar appear
$(document).ready(function () {

    $("#admin").click(function () {

        if ($("#loginbar").is(":visible")) {

            $("#loginbar").toggle();

        } else if (confirm("This login is only for administrators of the site") == true) { $("#loginbar").toggle(); }

    });
});


// function to validate admin login
function validateLogin() {
    let x = document.forms["loginForm"]["adminpassword"].value;
    if (x != "CorrectPassword") {
        window.alert("Incorrect Password");
    }
};

// function to make gcse's appear
// $(document).ready(function () {
//     $("#gcses").click(function () {
//         $("#gcses_list").toggle();
//     });

// });




