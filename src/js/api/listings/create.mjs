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


      //DISPLAY THE NEWLY CREATED LISTING IN THE DOM

      createNewListing(createdListing);
        
      } catch (error) {
        console.error("Error creating new listing:", error);
      }
    });
  }
}

createListingForm();

function createNewListing(newListing) {
  const newListingContainer = document.querySelector(".new-listing-container");

  const newListingTitle = document.createElement("h2");
  newListingTitle.classList.add("new-listing-title");
  newListingTitle.innerHTML = newListing.title;

  newListingContainer.append(newListingTitle);

  const newListingMedia = document.createElement("img");
  newListingMedia.src = newListing.media;
  newListingMedia.alt = newListing.title;
  newListingMedia.classList.add("new-listing-media");
  newListingMedia.classList.add("thumbnail-img");
  newListingMedia.classList.add("img-fluid");
  newListingMedia.classList.add("img-thumbnail");

  newListingContainer.append(newListingMedia);

  const newListingDescription = document.createElement("p");
  newListingDescription.classList.add("new-listing-description");
  newListingDescription.classList.add("mt-2");
  newListingDescription.innerHTML = newListing.description;

  newListingContainer.append(newListingDescription);

  const newListingEndsAt = document.createElement("div");
  newListingEndsAt.classList.add("new-listing-ends-at");
  newListingEndsAt.innerHTML = `Action ends at ${newListing.endsAt}`;

  newListingContainer.append(newListingEndsAt);

}


//REDIRECT TO PROFILE PAGE LINK

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
    console.error("Get requires a name");
  }
}

getUserProfile()
