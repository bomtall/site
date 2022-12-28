


window.openViewer = function (item) {

    // Determine if it is an image or an iframe
    if (!item.classList.contains("imgcontainerimg")) {

        // Settings for images
        imageFrame.style.width = "100%";
        imageFrame.style.height = "90%";
        imageFrame.style.border = "0px";
        imageFrame.src = item.src;
        image.style.display = "none";

    } else {
        image.style.display = "block";
        image.src = item.src;
        imageFrame.style.width = "0%";
        imageFrame.style.height = "0px";
        imageFrame.style.border = "0px";
    }
    viewer.style.display = "block";
    if (item.alt == undefined) {
        caption.innerHTML = "PDF Document";
    }
    else { caption.innerHTML = item.alt; }
}


// close image viewer
function closeViewer() {
    viewer.style.display = "none";
}


// Add on click methods to buttons for each certificate
var cert = document.getElementById("certificate")

if (typeof (cert) != 'undefined' && cert != null) {
    document.getElementById("btn").onclick = function () { openViewer(cert) };
}

var cert2 = document.getElementById("certificate2")

if (typeof (cert2) != 'undefined' && cert2 != null) {
    document.getElementById("btn2").onclick = function () { openViewer(cert2) };
}


// Get the image viewer
var viewer = document.getElementById("imageViewer");

// Get empty elements ready for images/certificates and captions to be inserted
var imageFrame = document.getElementById("frame01")
var image = document.getElementById("img01");
var caption = document.getElementById("caption");

// Get the element to close the viewer
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the cross, close the viewer
span.onclick = function () { closeViewer() }