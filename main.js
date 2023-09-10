document.addEventListener("DOMContentLoaded", () => {

    const from_in = document.createElement("select");
    var myHeaders = new Headers();
    myHeaders.append("apikey", "KoF7nwSRwep8hoPxrFVz6q0gcxVgk5XT");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
        .then(response => response.json())
        .then(result => {
            let { symbols } = result;
            console.log(symbols);
            let ar = Object.entries(symbols);
            console.log(ar)
            let from_list = document.getElementById('from-list')
            let to_list = document.getElementById('to-list')
            ar.forEach(function (item) {
                let option = document.createElement('option')
                option.value = item[0];
                option.label = item[1];
                from_list.appendChild(option)

            })
            ar.forEach(function (item) {
                let option = document.createElement('option')
                option.value = item[0];
                option.label = item[1];
                to_list.appendChild(option)
            })



        })
        .catch(error => console.log('error', error));

    document.querySelector("#currency-converter").addEventListener("submit", (event) => {

        event.preventDefault();
        const { target: { from, to, amount } } = event;

        let myHeaders = new Headers();
        myHeaders.append("apikey", "KoF7nwSRwep8hoPxrFVz6q0gcxVgk5XT");

        var requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to.value}&from=${from.value}&amount=${amount.valueAsNumber}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                let { info, date, query: { to }, result } = data;
                document.querySelector(".result").textContent = `As per the exchange rate :${info.rate.toFixed(2)} for ${date} => converted value in ${to} is ${result.toFixed(2)}`;
            })
            .catch(error => console.log(error));

    })
})