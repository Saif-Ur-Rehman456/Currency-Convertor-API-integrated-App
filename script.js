let converterSelect = document.querySelectorAll(".converter select");
let btn = document.querySelector("button");
let converter = document.querySelector(".converter");
// console.log(amount.value);

// console.log(converterSelect);
for (select of converterSelect) {
    for (code in countryList) {
        // console.log(countryList[code]);
        let newOption = document.createElement("option");
        select.appendChild(newOption);
        newOption.innerText = `${code}`
        newOption.value = `${code}`
        // console.log(newOption);

    }

    if (select.id == "from") {
        //  console.log(select);
        // console.log(select.value);

        select.value = "USD"
    }
    else if (select.id == "to") {
        select.value = "PKR"
    }
}

btn.addEventListener("click", async (evt) => {
    let amount = document.querySelector("input");
    let amountVal = amount.value;
    let from = document.querySelector("#from").value;
    let to = document.querySelector("#to").value;
    console.log(amountVal, from, to);
    if (amountVal == "0" || amountVal < 1) {
        amountVal = 1;
        amount.value = 1;
    }


    const URL = `https://open.er-api.com/v6/latest/${from}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);

    let fromRate = data.rates[from];
    let toRate = data.rates[to];
    // console.log(fromRate);

    let convertedAmount = amountVal * toRate;
    console.log(convertedAmount);

displayVal(convertedAmount);

})
function displayVal(Val){
    let res  = document.querySelector("#result");
    converter.append(res);
    res.innerText = Val;
}
