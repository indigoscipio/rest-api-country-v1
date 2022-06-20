let searchInput = document.querySelector("#input-search");
let contentGrid = document.querySelector(".content__grid");
let contentContainer = document.querySelector("#content-container");

let fetchSearchData = async () => {
  let response = await fetch(
    `https://restcountries.com/v3.1/name/${searchInput.value}`
  );
  let data = await response.json();
  console.log(data);
};

let fetchAllData = async () => {
  let response = await fetch(
    `https://restcountries.com/v3.1/all
    `
  );
  let data = await response.json();
  console.log(data);
};

searchInput.addEventListener("change", (e) => {
  fetchSearchData();
  updateDOM();
});

async function updateDOM() {
  contentGrid.innerHTML = "";

  let response = await fetch(
    `https://restcountries.com/v3.1/name/${searchInput.value}`
  );
  let data = await response.json();

  for (const i of data) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card__image">
          <img src="${i.flags.png}" alt="" />
        </div>
        <div class="card__text">
          <div class="title">${i.name.common}</div>
          <div class="info">
            <p><b>Population:</b> ${i.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p><b>Region:</b> ${i.region}</p>
            <p><b>Capital:</b> ${i.capital}</p>
          </div>
        </div>
      `;
    contentGrid.append(card);

    //If the useres click on the card
    card.addEventListener("click", (e) => {
      contentGrid.style.display = "none";
      let currency = Object.values(i.currencies)[0].name;
      let languages = Object.values(i.languages);
      function getBorderCountries() {
        return Object.values(i.borders || "");
      }

      function borderCountriesToDOM() {
        console.log(getBorderCountries());
        if (getBorderCountries() == "") {
          return "No Border Countries";
        } else {
          return getBorderCountries()
            .map((country) => `<span class="tag"> ${country} </span>`)
            .join("");
        }
      }

      //Content Details
      let contentDetails = document.createElement("div");
      contentDetails.classList.add("content__details");
      contentDetails.innerHTML = `
      <button class="button" id="button-back" onclick=back()>
       <i class="fa-solid fa-arrow-left-long"></i>Back
      </button>
      <div class="image-container">
        <img src="${i.flags.png}" alt="" />
       </div>
      <div class="text-container">
          <p class="title">${i.name.common}</p>
          <ul class="stats">
            <li><b>Native Name:</b> ${i.name.official}</li>
            <li><b>Population:</b> ${i.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>
            <li><b>Region:</b> ${i.region}</li>
            <li><b>Sub Region:</b> ${i.subregion}</li>
            <li><b>Capital:</b> ${i.capital}</li>
            <li><b>Top Level Domain</b> ${i.tld}</li>
            <li><b>Currencies</b> ${currency}</li>
            <li><b>Languages</b> ${languages}</li>
          </ul>
          <div class="border">
            <p><b>Border Countries:</b></p>
            <div class="tag-container">
            ${borderCountriesToDOM()}
            </div>
          </div>
        </div>
      `;

      contentContainer.append(contentDetails);
    });
  }
}

function back() {
  fetchSearchData();
  updateDOM();
}

// function updateDOM(fetchData) {
//   contentGrid.innerHTML = "";
//   fetchData.forEach((data) => {
//     let card = document.createElement("div");
//     card.classList.add("card");
//     card.innerHTML = `
//     <div class="card__image">
//       <img src="${data.flags.png}" alt="" />
//     </div>
//     <div class="card__text">
//       <div class="title">${data.name.common}</div>
//       <div class="info">
//         <p><b>Population:</b> ${data.population
//           .toString()
//           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
//         <p><b>Region:</b> ${data.region}</p>
//         <p><b>Capital:</b> ${data.capital}</p>
//       </div>
//     </div>
//   `;
//     contentGrid.append(card);
//   });
// }
