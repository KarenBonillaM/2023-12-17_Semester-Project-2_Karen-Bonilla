function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");

  alert("You have logged out successfully")


  setTimeout(function() {
    window.location.href = `../index.html`
  }, 200)
  
}

function setLogoutBTN() {
  const logoutBTN = document.querySelector(".btn-logout");

  if(logoutBTN) {
    logoutBTN.addEventListener("click", (event) => {
      event.preventDefault();

      logout()
    })
  }
}

setLogoutBTN()

const token = localStorage.getItem("token");

console.log(token)