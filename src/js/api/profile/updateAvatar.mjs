import { API_AUCTION_URL } from "../constans.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const name = params.get("name")

const ApiEndPointProfiles = "/profiles/";

const profile = localStorage.getItem("profile");

const parsedAvatar = JSON.parse(profile);

const updateAvatarContainer = document.querySelector("#update-avatar-container");



function displayAvatarContainer() {
  const BtnUpdateAvatar = document.querySelector(".btn-update-avatar");

  BtnUpdateAvatar.addEventListener("click", (event) => {
    event.preventDefault();
  
  updateAvatarContainer.style.display = "flex";
  })
}

displayAvatarContainer()

function noDisplayAvatarContainer() {
  const btnNoDisplayContainer = document.querySelector(".delete-icon");

  btnNoDisplayContainer.addEventListener("click", (event) => {
    event.preventDefault();

    updateAvatarContainer.style.display = "none";
  })
}

noDisplayAvatarContainer()



function load(key) {
  try{
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null
  }
}

function headers() {
  const token = load("token");

  return{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers()
  })
}



function popupIMGAvatar(avatarSrc) {
  const popupAvatarContainer = document.querySelector(".popup-avatar");

  popupAvatarContainer.innerHTML = "";

  const updateAvatar = document.createElement("img");
  updateAvatar.classList.add("popup-image-avatar");
  updateAvatar.src = avatarSrc;
  

  popupAvatarContainer.append(updateAvatar)

}
  
popupIMGAvatar(parsedAvatar.avatar)

async function updateAvatar(profileData, name) {

  const actionUpdateAvatar = "/media"
  const updateAvatarURL = `${API_AUCTION_URL}${ApiEndPointProfiles}${name}${actionUpdateAvatar}`;
  const methodUpdateAvatar = "PUT";

  try {
    const response = await authFetch(updateAvatarURL, {
    method: methodUpdateAvatar,
    body: JSON.stringify(profileData)
  })
  return await response.json()
} catch (error) {
  console.error("Error updating avatar:", error);
}
  }

  

async function setUpdateAvatar() {
  const form = document.querySelector(".form-update-avatar");

  if (parsedAvatar) {
    form.avatar.value = parsedAvatar.avatar;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(form);
    const newAvatarValue = formData.get("avatar");

    await updateAvatar({avatar: newAvatarValue}, name);

    popupIMGAvatar(newAvatarValue);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("avatar", newAvatarValue);

    //Update the URL without triggering a page reload

    history.pushState(null, "", `?name=${name}&avatar=${newAvatarValue}`);

  })
}

setUpdateAvatar()

