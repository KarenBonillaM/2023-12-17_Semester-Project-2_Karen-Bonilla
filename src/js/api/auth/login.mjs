import { API_AUCTION_URL } from "../constans.mjs";

const action = "/auth/login";
const method = "post";

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// function getProfile() {
//   return localStorage.getItem("profile");
// }

// const savedProfile = getProfile();

async function login(profile) {
  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body
  });
 
  if(response.ok) {
    const { accessToken, ...user} = await response.json();

    save("token", accessToken);
    save("profile", user);

    const encodedName = encodeURIComponent(user.name);
    const redirectURL = `/profile/index.html?name=${encodedName}`;

    window.location.href = redirectURL;

  } else {
    console.error("Login failed. Status:", response.status);  
  }

}

// if (savedProfile) {
//   console.log("Profile is present:", savedProfile);
// } else {
//   console.log("Profile not found in localStorage");
// }


function setLoginForm() {
  const form = document.querySelector("#login-form");

  if(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      login(profile);
    })
  }
}

setLoginForm();