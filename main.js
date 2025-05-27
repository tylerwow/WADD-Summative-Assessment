let isNavOpen = false;

const navContainerOpen = document.getElementById("nav-container-mobile-open");

function manageNavMobile() {
    isNavOpen = !isNavOpen;
    
    if (isNavOpen) {
        navContainerOpen.style.display = "inline-block";
    }
    else {
        navContainerOpen.style.display = "none";
    }
}

document.getElementById("menu-button").addEventListener("click", manageNavMobile)