

// function to display selected content in the image viewer
function openViewer(item) {

    // Determine if it is an image or an iframe
    if (!item.classList.contains("imgcontainerimg")) {

        // Settings for iframes
        imageFrame.style.width = "100%";
        imageFrame.style.height = "90%";
        imageFrame.src = item.src;
        image.style.display = "none";
        caption.innerHTML = "PDF Document";

    } else {

        // settings for images
        image.style.display = "block";
        image.src = item.src;
        imageFrame.style.width = "0%";
        imageFrame.style.height = "0px";
        caption.innerHTML = item.alt;
    }

    // display image viewer
    viewer.style.display = "block";
    imageFrame.style.border = "0px";
}

// close image viewer
function closeViewer() {
    viewer.style.display = "none";
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

// Get both certificates as variables
var cert = document.getElementById("certificate")
var cert2 = document.getElementById("certificate2")

// Add on click methods to buttons for each certificate
if (cert != null && cert != undefined) {
    document.getElementById("btn").onclick = function () { openViewer(cert) };
    document.getElementById("btn2").onclick = function () { openViewer(cert2) };
}

