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
    // Even if "No" is clicked, the "Yes" button should grow
    size += 10; // Increase the size when "No" is clicked
    yesButton.style.fontSize = size + "px";

    // Use CSS transform to scale the "Yes" button
    yesButton.style.transform = `scale(${1 + size / 100})`; // Grow by 10% per click

    // Disable the "No" button temporarily or stop it from being clicked further
    noButton.style.pointerEvents = "none"; // Disable interaction
    setTimeout(function() {
        // Re-enable the "No" button after 1 second
        noButton.style.pointerEvents = "auto";
    }, 1000); // Re-enable after 1 second (you can adjust the time)
}


function goBack() {
    // Redirect back to the main page (index.html)
    window.location.href = "/index.html";
}

// Move "No" button to a random position and grow "Yes" button when cursor is near
document.addEventListener("mousemove", function(event) {
    let noButtonRect = noButton.getBoundingClientRect();
    let distance = Math.sqrt(Math.pow(event.clientX - (noButtonRect.left + noButtonRect.width / 2), 2) + 
                             Math.pow(event.clientY - (noButtonRect.top + noButtonRect.height / 2), 2));

    // Define a distance threshold for when the cursor is "near" the "No" button
    let threshold = 100; // Adjust the threshold as needed

    if (distance < threshold) {
        // Move "No" button to a random position when the cursor is near
        let x = Math.random() * (window.innerWidth - 100); // Ensure it stays inside screen
        let y = Math.random() * (window.innerHeight - 50); // Ensure it stays inside screen
        noButton.style.position = "absolute"; // Ensure "No" button moves
        noButton.style.left = x + "px";
        noButton.style.top = y + "px";

        // Disable the "No" button when close to the cursor
        noButton.style.pointerEvents = "none"; // Disable interaction with "No" button

        // Increase the size of the "Yes" button when cursor is near the "No" button
        size += 5; // Increase by 5px each time the cursor is near
        yesButton.style.fontSize = size + "px";

        // Use CSS transform to scale the "Yes" button, which allows it to grow and overlap
        yesButton.style.transform = `scale(${1 + size / 100})`; // Grow by 5% per time

    } else {
        // Re-enable the "No" button when cursor is far enough
        noButton.style.pointerEvents = "auto"; // Re-enable interaction

        // Optional: Reset the size of "Yes" button when the cursor is far enough (if you want this behavior)
        // size = 20; // Reset to initial size
        // yesButton.style.fontSize = size + "px";
        // yesButton.style.transform = `scale(1)`; // Reset size transformation
    }
});

