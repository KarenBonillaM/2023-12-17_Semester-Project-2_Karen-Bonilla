import { API_AUCTION_URL } from "../constans.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const title = document.getElementById("listingTitle");
const id = params.get("id");


const action = "/listings/" + id;
const method = "delete";

async function fetchListing() {
  const getListingURL = `${API_AUCTION_URL}${action}`;
  const response = await fetch(getListingURL);

  const listing = await response.json();

  return listing;
}

function createListingDetailsHTML(listing) {

  const listingDetailsContainer = document.querySelector(".listing-edit-container");

  title.textContent = listing.title;

  const listingTitle = document.createElement("h1");
  listingTitle.classList.add("listing-details-title");
  listingTitle.classList.add("mb-4");
  listingTitle.innerHTML = listing.title;

  listingDetailsContainer.append(listingTitle);

  const listingMedia = document.createElement("img");
  listingMedia.classList.add("listing-details-media");
  listingMedia.classList.add("thumbnail-img");
  listingMedia.classList.add("img-fluid");
  listingMedia.classList.add("img-thumbnail");
  listingMedia.src = listing.media;
  listingMedia.alt = `Image from ${listing.title}`;

  listingDetailsContainer.append(listingMedia)


  const listingDescription = document.createElement("p");
  listingDescription.classList.add("listing-details-description");
  listingDescription.classList.add("mt-4");
  listingDescription.innerHTML = listing.description;

  listingDetailsContainer.append(listingDescription);

  const listingEndsAt = document.createElement("div");
  listingEndsAt.classList.add("listing-details-endsAt");
  listingEndsAt.textContent = listing.endsAt;

  listingDetailsContainer.append(listingEndsAt);
}

fetchListing().then(createListingDetailsHTML);





//BIDS HISTORY

async function getListingsBids() {
  const bidsURL = `${API_AUCTION_URL}${action}?_bids=true`;

  const response = await fetch(bidsURL);

  const listingBids = await response.json();
 return listingBids;

}

function createListingBidHTML(listingBid) {

  const bidsBodyHistory = document.querySelector(".body-bids");

  const bidListingContainer = document.createElement("div");
  bidListingContainer.classList.add("bid-container");

  bidsBodyHistory.append(bidListingContainer);

  const bidderNameTitle = document.createElement("h2");
  bidderNameTitle.classList.add("bid")


  //BID NAME
  const bidderListingName = document.createElement("div");
  bidderListingName.classList.add("bidder-name");
  bidderListingName.textContent = listingBid.bidderName;
  
  bidListingContainer.append(bidderListingName);

  //BID AMOUNT
  const bidAmount = document.createElement("div");
  bidAmount.classList.add("bid-amount");
  bidAmount.textContent = listingBid.amount;

  bidListingContainer.append(bidAmount);

  //BID DATE CREATED
  const bidCreated = document.createElement("div");
  bidCreated.classList.add("bid-created");
  bidCreated.textContent = listingBid.created;

  bidListingContainer.append(bidCreated);

}

function createListingBidsHTML(listingBids) {
  const bids = listingBids.bids;

  for(let i = 0; i < bids.length; i++) {
    const listingBid = bids[i];

    createListingBidHTML(listingBid);
  }
}

async function listingsBidsSection() {
  const listingsBids = await getListingsBids();
  createListingBidsHTML(listingsBids);
}

listingsBidsSection();



//DELETE LISTING

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

function deleteListing(id) {
  const deleteBTN = document.querySelector("#delete-btn")

  if(!id) {
    throw new Error ("Delete listing requires an Id")
  }

  try {
    deleteBTN.addEventListener("click", async (event) => {
      event.preventDefault();
  
      const deleteListingURL = `${API_AUCTION_URL}${action}` 
      const response = await authFetch(deleteListingURL, {
        method,
      });

      if(response.ok) {
        alert("Deleting listing was success")
      } else {
        console.error("Error deleting listing")
      }
    });
  } catch(error) {
    console.error("Error deleting listing")
  }
}

deleteListing(id)

