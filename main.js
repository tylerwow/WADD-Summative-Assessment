let isNavOpen = false;

const navContainerOpen = document.getElementById("nav-container-mobile-open");

/**
 * Opens and closes the mobile navigation bar when the menu button is pressed
 */
function manageNavMobile() {
    isNavOpen = !isNavOpen;
    
    if (isNavOpen) {
        navContainerOpen.style.display = "inline-block";
    }
    else {
        navContainerOpen.style.display = "none";
    }
}

// Event Listeners
document.getElementById("menu-button").addEventListener("click", manageNavMobile)