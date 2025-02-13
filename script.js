let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let menuSection = document.getElementById("menuSection");
let size = 20;

function yesClicked() {
    // Hide main container and show menu section
    document.querySelector(".container").style.display = "none";
    menuSection.style.display = "block";
}

function noClicked() {
    // Move "No" button to a random position
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);
    noButton.style.left = x + "px";
    noButton.style.top = y + "px";

    // Increase "Yes" button size
    size += 10;
    yesButton.style.fontSize = size + "px";
}
function goBack() {
    // Redirect back to the main page (index.html)
    window.location.href = "index.html";
}