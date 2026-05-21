// let myDiv = document.querySelector("#info");
// let myList = document.querySelector("#list")
// fetch("https://api.coinlore.net/api/tickers/?start=0&limit=100")
//   .then(r => r.json())
//   .then(res => res.data.forEach(c =>
//   {
//     let newItem = document.createElement('li')
//     newItem.innerText = `${c.symbol} -- $${c.price_usd} USD`
//     myList.appendChild(newItem);
//   }
// ));

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
            <td>$${coin.price_usd}</td>
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