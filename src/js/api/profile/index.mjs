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

  const response = await authFetch(getListingUserURL);

  const userListings = await response.json();

  return userListings;
}

function createUserListingHTML(userListing) {

  const userListingsContainer = document.querySelector(".listing-profile-container");

  const listingContainer = document.createElement("div");
  listingContainer.classList.add("card");

  userListingsContainer.append(listingContainer);


  //MEDIA
  
  if(userListing.media) {
    const img = document.createElement("img");
    img.classList.add("thumbnail-img");
    img.classList.add("img-fluid");
    img.classList.add("img-thumbnail");
    img.classList.add("card-img-top");

    img.src = userListing.media;
    img.alt = `Image from ${userListing.tile}`;
  
    listingContainer.append(img);
  }

  // const mediaValue = listing.media[0];

  // if(!listing.media.includes(mediaValue)) {
  //   listingContainer.style.display = "none";
  // }
  
  const listingBody = document.createElement("section");
  listingBody.classList.add("card-body");
  listingContainer.append(listingBody);

  const listingBodyInfo = document.createElement("div");
  listingBodyInfo.classList.add("listing-body-info");
  listingBody.append(listingBodyInfo)

  //TITLE
  const listingTitle = document.createElement("h5");
  listingTitle.classList.add("listing-title");
  listingTitle.classList.add("card-title");

  listingTitle.innerHTML = userListing.title;
  listingBodyInfo.append(listingTitle);

  //TAGS

  // for(let i = 0; i < userListing.tags.length; i ++) {
  //   const tag = userListing.tags[i];
  //   const listingTags = document.createElement("p");
  //   listingTags.classList.add("listing-tags");
  //   listingTags.innerHTML = tag;
  //   listingBodyInfo.append(listingTags);
  // }

  //BIDS

  const bidsNumber = userListing._count["bids"];
  const listingBids = document.createElement("div");
  listingBids.classList.add("listing-bids");
  listingBids.innerHTML = `Bids: ${bidsNumber}`
  listingBodyInfo.append(listingBids);

  const listingBodyBTN = document.createElement("div");
  listingBodyBTN.classList.add("listing-body-BTN");
  listingBody.append(listingBodyBTN)

  const makeABidBTN = document.createElement("button");
  makeABidBTN.classList.add("make-a-bid-BTN");
  makeABidBTN.innerHTML = "Make a Bid";
  listingBodyBTN.append(makeABidBTN);
}


function createListingsHTML (userListings) {
  for (let i = 0; i < userListings.length; i++) {
    const listing = userListings[i];
    createUserListingHTML(listing);
  }
}

async function listingsSection () {
  const listings = await getUserListings();
  createListingsHTML(listings);
}

listingsSection()
