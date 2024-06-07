import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const listingsContainer = document.querySelector(".listings-Container");

//FETCH API

async function getListings() {
  const limit = 100;
  let offset = 0;
  let totalListings = 0;
  const allListings = [];

  try {
    while(totalListings < 1600) {
      const getListingsURL =  `${API_AUCTION_URL}${action}?sort=created&sortOrder=asc&limit=${limit}&offset=${offset}`;
  
      const response = await fetch(getListingsURL);

      if(!response.ok) {
        throw new Error(`Failed to fetch listings. Status: ${response.status}`);
      }
      const fetchListings = await response.json();

      if (!Array.isArray(fetchListings)) {
        throw new Error('Invalid response format. Expected an array.');
      }
      
      if(fetchListings.length === 0) {
        break;
      }

    allListings.push(...fetchListings);
    totalListings += fetchListings.length;
    offset += limit;
  }

  return allListings;

  } catch(error) {
    console.error(error.message);
    return[];
  }
    
}


async function displayOnlyRelativeListings() {

  try {
    const allListings = await getListings();

    const onlyImportantListings = allListings.filter((listing) =>
    ['sofa', 'table', 'desk', 'lamp', 'cutlery', 'rug', 'carpet', 'armchair', 'painting', 'vase'].some(tag => listing.tags.includes(tag)));
    
    return onlyImportantListings;
  } catch (error) {
    throw new Error(error.message);
  }
}

displayOnlyRelativeListings();



//CREATE LISTING
function createListingHTML(listing) {

  const listingContainer = document.createElement("div");
  listingContainer.classList.add("card");

  listingsContainer.append(listingContainer);

  //MEDIA
  
  if(listing.media) {
    const img = document.createElement("img");
    img.classList.add("thumbnail-img");
    img.classList.add("img-fluid");
    img.classList.add("img-thumbnail");
    img.classList.add("card-img-top");

    img.src = listing.media;
    img.alt = `Image from ${listing.tile}`;
  
    listingContainer.append(img);
  }
  
  const listingBody = document.createElement("section");
  listingBody.classList.add("card-body");
  listingBody.classList.add("mt-4");
  listingContainer.append(listingBody);

  const listingBodyInfo = document.createElement("div");
  listingBodyInfo.classList.add("listing-body-info");
  listingBody.append(listingBodyInfo)

  //TITLE
  const listingTitle = document.createElement("h5");
  listingTitle.classList.add("listing-title");
  listingTitle.classList.add("card-title");

  listingTitle.innerHTML = listing.title;
  listingBodyInfo.append(listingTitle);

  //TAGS

  for(let i = 0; i < listing.tags.length; i ++) {
    const tag = listing.tags[i];
    const listingTags = document.createElement("p");
    listingTags.classList.add("listing-tags");
    listingTags.innerHTML = tag;
    listingTags.style.display = "none";
    listingBodyInfo.append(listingTags);
  }

  //BIDS

  const bidsNumber = listing._count["bids"];
  const listingBids = document.createElement("div");
  listingBids.classList.add("listing-bids");
  listingBids.innerHTML = `Bids: ${bidsNumber}`
  listingBodyInfo.append(listingBids);

  const listingBodyBTN = document.createElement("div");
  listingBodyBTN.classList.add("listing-body-BTN");
  listingBody.append(listingBodyBTN);

  const redirectDetails = document.createElement("a");
  redirectDetails.href =  `/listing/details/index.html?id=${listing.id}`;

  listingBodyBTN.append(redirectDetails);

  const makeABidBTN = document.createElement("button");
  makeABidBTN.classList.add("make-a-bid-BTN");
  makeABidBTN.classList.add("btn");
  makeABidBTN.innerHTML = "Make a Bid";
  redirectDetails.append(makeABidBTN);
}


function createListingsHTML (futureAuctions) {
  for (let i = 0; i < futureAuctions.length; i++) {
    const listing = futureAuctions[i];
    createListingHTML(listing);
  }
}

async function listingsSection () {
  const listings = await displayOnlyRelativeListings();
  createListingsHTML(listings);
}

listingsSection()



//SEARCH INPUT

const searchBox = document.querySelector(".search-input");

//listings-container

searchBox.onkeyup = function() {
  const searchInput = searchBox.value.toLowerCase();
  const listingCards = document.querySelectorAll(".card")
  const listingName = document.querySelectorAll(".card-title");

  
  
  for(let i = 0; i < listingName.length; i++) {
    let names = listingName[i].innerText.toLowerCase();
    const card = listingCards[i];

    if(searchInput.trim() === "" || names.includes(searchInput)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
   
  }
}

