"use script";

// ELEMENTS
const countryContainer = document.querySelector(".country");
const btn = document.querySelector(".country-btn");
const input = document.querySelector("#input");
const countryInfo = document.querySelector('.country-info')

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

  countryInfo.insertAdjacentHTML("afterbegin", html);
}


// API
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      //   console.log(response);
      if (!response.ok) throw new Error('Country not found');
      return response.json();
    })
    .then(function (data) {
        console.log(data);
      renderCountry(data);
    })

};



function inputLoad() {
  input.addEventListener('focus', function () {
    if (countryInfo) {
     countryInfo.innerHTML = '';
      
    }
  })
};


// Button click event listener
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = input.value.trim().toLowerCase();

    console.log(inputValue);


    if (inputValue) {
      countryInfo.classList.remove('hide');

      getCountryData(inputValue);

      input.value = '';

      inputLoad()

    }
    if (!inputValue) {
     countryInfo.innerHTML = '';
    }

    
  });

