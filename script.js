function yesClicked() {
    document.getElementById("catGif").style.display = "none";
    document.getElementById("yesButton").style.display = "none";
    document.getElementById("noButton").style.display = "none";
    document.getElementById("menuSection").classList.remove("hidden");
}

function noClicked() {
    // Move the "No" button to a random spot
    var noButton = document.getElementById("noButton");
    var randomX = Math.floor(Math.random() * window.innerWidth);
    var randomY = Math.floor(Math.random() * window.innerHeight);
    
    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
    
    // Grow the "Yes" button
    var yesButton = document.getElementById("yesButton");
    yesButton.style.transform = "scale(1.2)";
}