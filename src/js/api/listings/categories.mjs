
//CATEGORIES FILTER

const sofas = document.querySelector("#sofas");
  const tables = document.querySelector("#tables");
  const chairs = document.querySelector("#chairs");
  const rugs = document.querySelector("#rugs");
  const cutlery = document.querySelector("#cutlery");
  const lamps = document.querySelector("#lamps");
  const paintings = document.querySelector("#paintings");
  const vases = document.querySelector("#vases");

  function filterByCategories(category) {
    const listingCards = document.querySelectorAll(".card");
    const listingName = document.querySelectorAll(".card-title");
  
    for (let i = 0; i < listingName.length; i++) {
      let names = listingName[i].innerText.toLowerCase();
      const card = listingCards[i];
  
      if (names.includes(category)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  }

  tables.onclick = function () {
    filterByCategories("table")
  }

  sofas.onclick = function () {
    filterByCategories("sofa")
  }

  chairs.onclick = function () {
    filterByCategories("chair")
  }

  rugs.onclick = function () {
    filterByCategories("carpet")
  }

  cutlery.onclick = function () {
    filterByCategories("cutlery")
  }

  lamps.onclick = function () {
    filterByCategories("lamp")
  }

  paintings.onclick = function () {
    filterByCategories("painting")
  }

  vases.onclick = function () {
    filterByCategories("vases")
  }
  

