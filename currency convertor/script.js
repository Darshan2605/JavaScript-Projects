const APIURL = "https://api.exchangerate-api.com/v4/latest"; // Change to the new API

const dropdown = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let exchangeInfo = document.querySelector(".exchange-info");

for (let select of dropdown) {
  for (let Currencycode in countryList) {
    let options = document.createElement("option");
    options.innerText = Currencycode;
    options.value = Currencycode;

    if (select.name == "from" && Currencycode == "USD") {
      options.selected = "selected";
    } else if (select.name == "to" && Currencycode == "INR") {
      options.selected = "selected";
    }
    select.append(options);
  }
  select.addEventListener("change", function selectChanged(evt) {
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let Currencycode = element.value;
  let CountryCode = countryList[Currencycode];
  let newImg = `https://flagsapi.com/${CountryCode}/flat/64.png`;
  let countryImg = element.parentElement.querySelector("img");
  countryImg.src = newImg;
}

const exbtn = document.querySelector(".sub-btn");

exbtn.addEventListener("click", async function exchangeCurrency(evt) {
  evt.preventDefault();

  let amount = document.querySelector("form input");
  let amountValue = amount.value;
  if (amountValue == "" || amountValue < 1) {
    amountValue = 1;
    amount.value = 1;
  }

  const exchangeURL = `${APIURL}/${fromCurr.value.toLowerCase()}`; // New API URL
  console.log("Exchange URL:", exchangeURL);

  try {
    let response = await fetch(exchangeURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let readableData = await response.json();

    // Get the exchange rate for the selected currencies
    let exchangeRate = readableData.rates[toCurr.value]; // Accessing rates for the target currency

    if (exchangeRate === undefined) {
      console.error("Exchange rate not found for:", toCurr.value);
      exchangeInfo.innerText = "Invalid currency selected.";
      return;
    }

    let finalAmount = exchangeRate * amountValue;
    exchangeInfo.innerText = `${amountValue} ${
      fromCurr.value
    } = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    exchangeInfo.innerText = "Error fetching exchange rates.";
  }
});
