//NAV FUNCTIONALITY

const menuIcon = document.querySelector(".navbar-toggler-icon");

function displayMenu() {

  menuIcon.addEventListener("click", (event) => {
    const navOptions = document.querySelector(".nav-options");

    navOptions.style.display = (navOptions.style.display === 'flex') ? 'none' : 'flex';
  })
}

displayMenu()