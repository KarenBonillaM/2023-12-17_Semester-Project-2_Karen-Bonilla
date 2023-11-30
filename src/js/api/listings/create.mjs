import { API_AUCTION_URL } from "../constans.mjs";

const action = "/listings";
const method = "post";

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

async function createListing(listingData) {
  const createListingURL = API_AUCTION_URL + action;

  const response = await authFetch(createListingURL, {
    method,
    body: JSON.stringify(listingData)
  });

  return await response.json()
}

function createListingForm() {
  const form = document.getElementById("sell-new-item-form");

  if(form) {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      //Fetch form values
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const endsAt = document.getElementById("endsAt").value;
      const tags = document.getElementById("tag-input").value.split(',').map(tag => tag.trim());
      const media = document.getElementById("media").value.split(',').map(photo => photo.trim());

      if(!title || !endsAt || !description) {
        alert("Please fill in all required fields.");
        return;
      }

      const formData = {
        title,
        description,
        endsAt,
        tags,
        media
      };

      try {
        const createdListing = await createListing(formData);

        form.reset();

        
      } catch (error) {
        console.error("Error creating new listing:", error);
      }
    });
  }
}

createListingForm();

function createNewListing(newListing) {
  const listing = createListingForm()

  const newListingContainer = document.querySelector(".new-listing-container");

  const newListingTitle = document.createElement("h2");
  newListingTitle.classList.add("new-listing-title");
  newListingTitle.innerHTML = listing.title.value;

  newListingContainer.append(newListingTitle);
}

