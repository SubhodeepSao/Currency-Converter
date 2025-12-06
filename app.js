const BASE_URL = "https://api.frankfurter.app/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let curr in countryList) {
    let option = document.createElement("option");
    option.value = curr;
    option.textContent = curr;

    if (select.name === "from" && curr === "USD") option.selected = true;
    if (select.name === "to" && curr === "INR") option.selected = true;

    select.append(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

// update flag
function updateFlag(element) {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// fetch rate
async function updateExchangeRate() {
  let amount = document.querySelector(".amount input");
  let amtVal = Number(amount.value);

  if (!amtVal || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // API expects ?from=USD&to=INR
  const url = `${BASE_URL}?from=${fromCurr.value}&to=${toCurr.value}`;

  let res = await fetch(url);
  let data = await res.json();

  let rate = data.rates[toCurr.value];
  let finalAmount = rate * amtVal;

  msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(4)} ${
    toCurr.value
  }`;
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});

// Load default conversion
window.addEventListener("load", updateExchangeRate);
