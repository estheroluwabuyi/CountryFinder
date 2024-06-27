"use script";

// ELEMENTS
const countryContainer = document.querySelector(".country");
const btn = document.querySelector(".country-btn");
const input = document.querySelector("#input");
const countryInfo = document.querySelector(".country-info");

//RENDER CODE
function renderCountry(data) {
  const html = ` 
    
    <div class="flag">
       <img src="${data[0].flags.svg}" alt="${
    data[0].flags.alt
  }" width="100" height="50"/>
    </div>

  <div class="country-name"><span>Name:</span>${data[0].name.common}</div>

  <div class="region"><span>Continent:</span>${data[0].region}</div>


  <div class="capital"><span>Capital:</span>${data[0].capital[0]}</div>

<div class="population">
<span>Population:</span>
${
  +data[0].population >= 1000000000
    ? (data[0].population / 1000000000).toFixed(2) + " Billion"
    : (data[0].population / 1000000).toFixed(2) + " Million"
}
</div>

  <div class="area"><span>Area:</span>${(+data[0].area * 0.386102).toFixed(
    2
  )} square miles</div>

  <div class="language"><span>Official Language:</span>${
    Object.values(data[0].languages)[0]
  }</div>

  <div class="currency"><span>Currency:</span>${
    Object.values(data[0].currencies)[0].name
  }</div>


`;

countryInfo.innerHTML = "";
  countryInfo.insertAdjacentHTML("afterbegin", html);
}

//Error Message Function
function errMessage() {
  alert("Country Not Found");
}

// Function to get country data and render it
const getCountryData = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    if (!res.ok) {
      errMessage();
      throw new Error(`Problem getting country data from ${country}`);
    }

    renderCountry(data);
  } catch (err) {
    console.error(`Error fetching country data for ${country}:`, err);
  }
};

// Function to hide country info on input focus
// const hideCountryInfo = () => {
//     countryInfo.innerHTML = "";

//   input.addEventListener("focus", () => {
//     countryInfo.innerHTML = "";
//   });
// };
// hideCountryInfo();

function handleCountrySearch() {
  const inputValue = input.value.trim().toLowerCase();

  if (!inputValue) {
    countryInfo.innerHTML = "";
    return;
  }

  countryInfo.classList.remove("hide");
  getCountryData(inputValue);
  input.value = "";
}

// Button click event listener
btn.addEventListener("click", function (e) {
  e.preventDefault();
  handleCountrySearch();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log(e);
    handleCountrySearch();
  }
});

/*Next
1. Add previously inputted values at the bottom, so users can click on previous countries to get same data (create new element below btn, use append or prepend to add created element).
2. LocalStorage API to save created element
3. Create a new button to clear previously created element
*/