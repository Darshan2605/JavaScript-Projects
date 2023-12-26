const APIURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

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
    //evt is event object
    updateFlag(evt.target); //evt.target means where change happend(on select element)
  });
}

function updateFlag(element) {
  let Currencycode = element.value;
  let CountryCode = countryList[Currencycode];
  let newImg = `https://flagsapi.com/${CountryCode}/flat/64.png`;
  let countryImg = element.parentElement.querySelector("img"); //here element is select,parent of select is select-container div
  countryImg.src = newImg;
}

const exbtn = document.querySelector(".sub-btn");

exbtn.addEventListener("click", async function exchangeCurrency(evt) {
  evt.preventDefault();
  /*
  The use of event.preventDefault() is to stop the default action of an element from happening.
  In this case, it stops the form being submitted when we click on the submit button.
  if we click on form submit button,form get submitted,page get reloaded and form goes to default state
  by using this function this tasks never get executed.*/

  let amount = document.querySelector("form input");
  let amountValue = amount.value;
  if (amountValue == "" || amountValue < 1) {
    amountValue = 1; //for js variable
    amount.value = 1; // inside form
  }

  const exchangeURL = `${APIURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  let response = await fetch(exchangeURL);
  let readableData = await response.json();
  let exchangeRate = readableData[toCurr.value.toLowerCase()]; //redable data give us exchange rate of country selected in toCurr select option
  let finalAmount = exchangeRate * amountValue;
  exchangeInfo.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
