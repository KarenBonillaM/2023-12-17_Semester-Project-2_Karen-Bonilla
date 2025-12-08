import { API_AUCTION_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

async function register(profile) {
  const registerURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body
  })

const result = await response.json()
alert("You are now registered")
return result
}

function registerFom() {
  const registerForm = document.querySelector("#register-form");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    register(profile);
  })
}

registerFom()