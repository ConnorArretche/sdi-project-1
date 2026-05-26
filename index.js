let coinMap = [];
let watchlistSymbols = ["BTC", "ETH", "XRP"];

// Profile Analytics
function getAllCoins(){
    fetch('https://api.coinlore.net/api/assets/')
    .then(response => response.json())
    .then(data => {
        coinMap = data.data || data;
        loadWatchlist();
    })
}

// Global Market Metrics
fetch("https://api.coinlore.net/api/global/")
  .then(response => response.json())
  .then((data) => {
    let coinData = data[0];
    document.querySelector("#market-cap").innerText = `$${Number(coinData.total_mcap).toLocaleString()}`
    document.querySelector("#global-volume").innerText = `$${Number(coinData.total_volume).toLocaleString()}`
    document.querySelector("#btc-dom").innerText = `${coinData.btc_d}%`
    document.querySelector("#eth-dom").innerText = `${coinData.eth_d}%`
    document.querySelector("#mcp-change").innerText = `${coinData.mcap_change}%`
    document.querySelector("#volume-change").innerText = `${coinData.volume_change}%`
    document.querySelector("#avg-change").innerText = `${coinData.avg_change_percent}%`
    document.querySelector("#active-coins").innerText = `${Number(coinData.coins_count).toLocaleString()}`
    document.querySelector("#active-markets").innerText = `${Number(coinData.active_markets).toLocaleString()}`
    document.querySelector("#mcap-ath").innerText = `$${Number(coinData.mcap_ath).toLocaleString()}`
    document.querySelector("#volume-ath").innerText = `${Number(coinData.volume_ath).toLocaleString()}`
  });

  //Asset Profile Analytics
function searchCoins(enteredSymbol){
    let symbolSearch = enteredSymbol.toUpperCase().trim();
    let foundAsset = coinMap.find(coin => coin.symbol === symbolSearch);
    if (!foundAsset) {
        alert('Coin not found! Check your spelling!')
        return;
    }
    else {
        fetch(`https://api.coinlore.net/api/ticker/?id=${foundAsset.id}`)
        .then(response => response.json())
        .then(data => {
            let coinInfo = data[0];
            document.querySelector("#inspect-name").innerText = `${coinInfo.name} ${coinInfo.symbol}`
            document.querySelector("#inspect-price").innerText = `$${Number(coinInfo.price_usd).toLocaleString()}`
            document.querySelector("#inspect-rank").innerText = `#${coinInfo.rank}`
            document.querySelector("#inspect-mrkt-cap").innerText = `$${Number(coinInfo.market_cap_usd).toLocaleString()}`
            document.querySelector("#inspect-supply").innerText = `${Number(coinInfo.csupply).toLocaleString()}`
            document.querySelector("#inspect-change").innerText = `${coinInfo.percent_change_24h}%`
        })
    }
}
document.querySelector("#search-btn").addEventListener("click", () => {
    let userInput = document.querySelector("#ticker-search-inp").value;
    if(userInput){
        searchCoins(userInput);
    }
});

// Market Movers Top 20, Bottom 20
fetch('https://api.coinlore.net/api/movers/')
.then(response => response.json())
.then(res => {
        let winnersTable = document.querySelector('#gainers-body');
        let winnerData = ''
        let gainerText = 'gainer-text';
        res.data.winners.forEach(coin => {
            winnerData += `
            <tr>
            <td>${coin.name}</td>
            <td>${coin.price_usd}</td>
            <td>${coin.volume24}</td>
            <td class="${gainerText}">${coin.percent_change_24h}%</td>

            </tr>`;
        });
        winnersTable.innerHTML = winnerData;

        let losersTable = document.querySelector('#losers-body');
        let loserData = '';
        let loserText = 'loser-text';
        res.data.losers.forEach(coin => {
            loserData += `
            <tr>
            <td>${coin.name}</td>
            <td>$${coin.price_usd}</td>
            <td>${coin.volume24}</td>
            <td class="${loserText}">${coin.percent_change_24h}%</td>

            </tr>`;
        });
        losersTable.innerHTML = loserData;
        })


//Watchlist
function loadWatchlist(){
    let watchlistBody = document.querySelector("#watchlist-body");
    watchlistBody.innerHTML = "";
    watchlistSymbols.forEach(symbol => {
        let foundAsset = coinMap.find(coin => coin.symbol === symbol);
        if(foundAsset){
            fetch(`https://api.coinlore.net/api/ticker/?id=${foundAsset.id}`)
            .then(response => response.json())
            .then(data => {
                let coinInfo = data[0];
                let row = document.createElement("tr");
                row.innerHTML = `
                <td>${coinInfo.symbol}</td>
                <td>$${Number(coinInfo.price_usd).toLocaleString()}</td>
                <td>${Number(coinInfo.volume24).toLocaleString()}</td>
                <td>${coinInfo.percent_change_24h}%</td>
                `;

                row.addEventListener("click", () => {
                    watchlistSymbols = watchlistSymbols.filter(item => item !== symbol);
                    loadWatchlist();
                });
                watchlistBody.appendChild(row);
            })
        }
    })
}
document.querySelector("#add-btn").addEventListener("click", () => {
    let input = document.querySelector("#watchlist-input");
    let userInput = input.value.toUpperCase().trim();

    if(!userInput){
        return;
    }

    let coinCheck = coinMap.find(coin => coin.symbol === userInput);

    if (coinCheck) {
        if(!watchlistSymbols.includes(userInput)){
            watchlistSymbols.push(userInput);
            loadWatchlist();
            input.value = "";
        }else {
            alert("Ticker already in watchlist!");
        }
        }
        else{
            alert("Ticker not found!")
        }
    });
getAllCoins();




