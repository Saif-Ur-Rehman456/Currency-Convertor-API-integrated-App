let converterSelect = document.querySelectorAll(".converter select");
let btn = document.querySelector("button");
let amountInput = document.querySelector("#amount");
let resultDiv = document.querySelector("#result");

// Dropdown currencies bharna
for (let select of converterSelect) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    select.appendChild(newOption);
  }

  if (select.id == "from") {
    select.value = "USD";
  } else if (select.id == "to") {
    select.value = "PKR";
  }
}

// Convert button ka event
btn.addEventListener("click", async (evt) => {
  let amountVal = parseFloat(amountInput.value);
  let from = document.querySelector("#from").value;
  let to = document.querySelector("#to").value;

  if (isNaN(amountVal) || amountVal <= 0) {
    amountVal = 1;
    amountInput.value = 1;
  }

  const URL = `https://open.er-api.com/v6/latest/${from}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    
    let exchangeRate = data.rates[to];
    let convertedAmount = amountVal * exchangeRate;

    displayVal(convertedAmount, to);
  } catch (error) {
    resultDiv.innerText = "Error in conversion";
  }
});

function displayVal(val, toCurrency) {
  resultDiv.innerText = `${val.toFixed(2)} ${toCurrency}`;
}
