function getUserName() {
  const user =  localStorage.getItem("profile"); 

  if (user) {
    const userNameJSON = JSON.parse(user);
    const userName = userNameJSON.name;

    return userName;
  } else {
    console.error("User profile not found in local storage.");
    return null;
  }

}

function getUserProfile() {
  const userName = getUserName();

  if(userName) {
    const navOptionsProfileContainer = document.querySelector(".nav-options");

    const linkToProfile = document.createElement("a");
    linkToProfile.href = `/profile/index.html?name=${userName}`;
    linkToProfile.innerText = "Profile";
  
    navOptionsProfileContainer.append(linkToProfile)
   
  } else {
    const navOptionsProfileContainer = document.querySelector(".nav-options");

    const linkToProfileRegister = document.createElement("a");
    linkToProfileRegister.href = `/profile/register`;
    linkToProfileRegister.innerText = "Register";
  
    navOptionsProfileContainer.append(linkToProfileRegister);

    const linkToLogin = document.createElement("a");
    linkToLogin.href = `/profile/login`;
    linkToLogin.innerText = "Login";

    navOptionsProfileContainer.append(linkToLogin);
  }
}

getUserProfile()



function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");

  alert("You have logged out successfully")
  
}

function setLogoutBTN() {
  const userName = getUserName();

  if(userName) {

    const navOptionsProfileContainer = document.querySelector(".nav-options");

    const logoutBTN = document.createElement("button");
    logoutBTN.textContent = "Logout";
    logoutBTN.classList.add("btn-logout")
  
    navOptionsProfileContainer.append(logoutBTN)


    logoutBTN.addEventListener("click", (event) => {
      event.preventDefault();

      logout()
    })
  }
}

setLogoutBTN()


