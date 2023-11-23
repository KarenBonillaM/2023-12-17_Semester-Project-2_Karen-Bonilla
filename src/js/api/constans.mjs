const API_HOST_URL = 'https://api.noroff.dev';
const API_BASE = '/api/v1';
const API_AUCTION_BASE = '/auction';
const API_AUCTION_URL = `${API_HOST_URL}${API_BASE}${API_AUCTION_BASE}`;

const action = "/listings";
const listingsContainer = document.querySelector(".listings-Container");

//FETCH API

async function getListings() {
  const updateListingsURL = `${API_AUCTION_URL}${action}`;
 const response = await fetch(updateListingsURL);
 const listings = await response.json()

 return listings;
}


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

  listingTitle.innerHTML = listing.title;
  listingBodyInfo.append(listingTitle);

  //TAGS

  for(let i = 0; i < listing.tags.length; i ++) {
    const tag = listing.tags[i];
    const listingTags = document.createElement("p");
    listingTags.classList.add("listing-tags");
    listingTags.innerHTML = tag;
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
  listingBody.append(listingBodyBTN)

  const makeABidBTN = document.createElement("button");
  makeABidBTN.classList.add("make-a-bid-BTN");
  makeABidBTN.innerHTML = "Make a Bid";
  listingBodyBTN.append(makeABidBTN);
}


function createListingsHTML (listings) {
  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];
    createListingHTML(listing);
  }
}

async function listingsSection () {
  const listings = await getListings();
  createListingsHTML(listings);
}

listingsSection()



//SEARCH INPUT

const searchBox = document.querySelector(".search-input");

//listings-container

searchBox.onkeyup = function() {
  const searchInput = searchBox.value.toLowerCase();
  const listingCards = document.querySelectorAll(".card")
  const listingTags = document.querySelectorAll(".listing-tags");
  
  
  for(let i = 0; i < listingTags.length; i++) {
    let tags = listingTags[i].innerText.toLowerCase();
    const card = listingCards[i];

    if(searchInput.trim() === "" || tags.includes(searchInput)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }

    console.log("searchInput:", searchInput);
console.log("tags:", tags);
   
  }
}