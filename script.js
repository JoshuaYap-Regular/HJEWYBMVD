let totalPoints = 0; 
let heartInterval;
let menuImages = [];
let currentImageIndex = 0;
let size = 20; 

function showMainPage() {
    document.getElementById("introSection").classList.add("hidden");
    document.getElementById("mainContainer").classList.remove("hidden");
}

function yesClicked() {
    document.getElementById("mainContainer").classList.add("hidden");
    document.getElementById("menuSection").classList.remove("hidden");
    startHearts(); 
}

// Truly Random Pastel Background Color
function changeBackgroundColor() {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function startHearts() {
    if (heartInterval) return;
    heartInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart-particle";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 90 + "vw";
        heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
        
        heart.onclick = function() {
            totalPoints++;
            document.getElementById("score").textContent = totalPoints;
            changeBackgroundColor(); // Change background randomly on each click
            this.innerHTML = "✨";
            setTimeout(() => this.remove(), 100);
        };
        document.body.appendChild(heart);
        setTimeout(() => { if(heart.parentNode) heart.remove(); }, 5000);
    }, 400);
}

// Mouse Evasion Logic
document.addEventListener("mousemove", function(event) {
    const mainContainer = document.getElementById("mainContainer");
    const noBtn = document.getElementById("noButton");
    const yesBtn = document.getElementById("yesButton");
    if (!mainContainer || mainContainer.classList.contains("hidden") || !noBtn) return;

    let rect = noBtn.getBoundingClientRect();
    let distance = Math.sqrt(
        Math.pow(event.clientX - (rect.left + rect.width / 2), 2) + 
        Math.pow(event.clientY - (rect.top + rect.height / 2), 2)
    );

    if (distance < 130) { 
        let x = Math.random() * (window.innerWidth - rect.width);
        let y = Math.random() * (window.innerHeight - rect.height);
        noBtn.style.position = "fixed"; 
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
        noBtn.style.transform = "none"; 
        noBtn.style.zIndex = "1000"; 

        size += 15;
        yesBtn.style.position = "fixed";
        yesBtn.style.left = "50%";
        yesBtn.style.top = "50%";
        yesBtn.style.transform = "translate(-50%, -50%)";
        yesBtn.style.fontSize = size + "px";
        yesBtn.style.padding = (size / 2) + "px " + size + "px";
        yesBtn.style.zIndex = "500";
    }
});

function noClicked() { size += 100; yesClicked(); }

function showRejected() {
    document.getElementById("restaurantGridSection").classList.add("hidden");
    document.getElementById("rejectionDetail").classList.remove("hidden");
}

function backFromRejection() {
    document.getElementById("rejectionDetail").classList.add("hidden");
    document.getElementById("restaurantGridSection").classList.remove("hidden");
}

function selectRest(name, menuUrls, images) {
    document.getElementById("restaurantGridSection").classList.add("hidden");
    document.getElementById("selectionDetail").classList.remove("hidden");
    document.getElementById("chosenName").innerText = name + " ❤️";
    const linksContainer = document.getElementById("menuLinksContainer");
    linksContainer.innerHTML = "";
    
    menuUrls.forEach((url) => {
        const a = document.createElement("a");
        a.href = url; a.target = "_blank"; a.className = "main-link";
        
        if (url.startsWith("http")) {
            a.innerText = "Visit Official Website";
        } else if (url.toLowerCase().includes("beverage") || url.includes("Menu 2")) {
            a.innerText = "Drinks Menu";
        } else if (url.endsWith(".pdf")) {
            a.innerText = "Food Menu";
        } else { a.innerText = "View Details"; }
        linksContainer.appendChild(a);
    });

    menuImages = images;
    const prev = document.getElementById("previewContainer");
    prev.innerHTML = "";
    images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src; img.className = "mini-menu";
        img.onclick = () => openModal(i);
        prev.appendChild(img);
    });
}

function openModal(i) {
    currentImageIndex = i;
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("fullImage").src = menuImages[i];
}
function closeModal() { document.getElementById("imageModal").style.display = "none"; }
function changeImage(step) {
    currentImageIndex = (currentImageIndex + step + menuImages.length) % menuImages.length;
    document.getElementById("fullImage").src = menuImages[currentImageIndex];
}
function backToGrid() {
    document.getElementById("selectionDetail").classList.add("hidden");
    document.getElementById("restaurantGridSection").classList.remove("hidden");
}
function goBack() { window.location.reload(); }