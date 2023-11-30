import { API_AUCTION_URL } from "../constans.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const name = params.get("name")

const ApiEndPointProfiles = "/profiles/";
const listingByProfile = "/listings";
const action = ApiEndPointProfiles + name + listingByProfile;


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


//FETCH USER PROFILE
async function getUserProfile(name) {
  if(!name) {
    throw new Error ("Get requires a name");
  }

  const getUserURL = `${API_AUCTION_URL}${ApiEndPointProfiles}${name}`;

  const response = await authFetch(getUserURL);
  const user = await response.json()

  return user;
}

async function createProfileHTML(){
  const user = await getUserProfile(name);
  const profileContainer = document.querySelector(".profile-header");

  const userProfileContainer = document.createElement("div");
  userProfileContainer.classList.add("user-profile-card");

  profileContainer.append(userProfileContainer);

  const userAvatar = document.createElement("img");
  userAvatar.classList.add("user-avatar");
  userAvatar.src = user.avatar;

  userProfileContainer.append(userAvatar);

  const userName = document.createElement("h2");
  userName.classList.add("user-name");
  userName.classList.add("mt-4");
  userName.innerHTML = user.name;

  userProfileContainer.append(userName);

  const userInfoContainer = document.createElement("div");
  userInfoContainer.classList.add("user-info");
  profileContainer.append(userInfoContainer);

  const userCredits = document.createElement("p");
  userCredits.classList.add("user-credits");
  userCredits.classList.add("mt-5");
  userCredits.innerHTML = `You have ${user.credits} credits`;

  userInfoContainer.append(userCredits);




}

createProfileHTML();


function load(key) {
  try{
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null
  }
}


//FETCH USER LISTINGS
async function getUserListings() {
  const getListingUserURL = `${API_AUCTION_URL}${action}`;

  const response = await authFetch(getListingUserURL)

  await response.json()
  console.log(getListingUserURL);
}

getUserListings()