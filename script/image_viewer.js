window.openModal = function (item) {
    if (!item.classList.contains("imgcontainerimg")) {
        modalFrame.style.width = "100%";
        modalFrame.style.height = "90%";
        modalFrame.style.border = "0px";
        modalFrame.src = item.src;
        modalImg.style.display = "none";
    } else {
        modalImg.style.display = "block";
        modalImg.src = item.src;
        modalFrame.style.width = "0%";
        modalFrame.style.height = "0px";
        modalFrame.style.border = "0px";
    }
    modal.style.display = "block";
    if (item.alt == undefined) {
        captionText.innerHTML = "";
    }
    else { captionText.innerHTML = item.alt; }
}

function close_modal() {
    modal.style.display = "none";
}



var cert = document.getElementById("certificate")

if (typeof (cert) != 'undefined' && cert != null) {
    document.getElementById("btn").onclick = function () { openModal(cert) };
}

var cert2 = document.getElementById("certificate2")

if (typeof (cert2) != 'undefined' && cert2 != null) {
    document.getElementById("btn2").onclick = function () { openModal(cert2) };
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementById("myImg");
var modalFrame = document.getElementById("frame01")
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () { close_modal() }