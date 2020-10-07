import React, { useState, useEffect } from 'react';

import Wallet from '../components/Wallet';

const apiKey = '60c07af6-d8b2-4646-836d-bfb0e70328eb',
  testKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c';

function WalletsList() {
  const [coins, updateCoins] = useState([]);
  const getCoinData = async () => {
    try {
      let url =
          'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qString = '?CMC_PRO_API_KEY=' + apiKey + '&start=1&limit=5&convert=USD';

      const response = await fetch(url + qString);
      const jsonData = await response.json();
      const coinData = await jsonData.data;
      console.log(coinData);
      updateCoins(coinData);
    } catch (err) {
      console.log(err);
    }
  };

  const resetScroll = () => {

  }

  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <div className="wallets-list">
      <h3>Wallets</h3>
      <div id="wallets-container">
        <span id="list-start"></span>
        {coins.length &&
          coins.map((coin) => <Wallet key={coin.name} coin={coin} />)}
        <a href="#list-start" className="list-end" onClick={() => {resetScroll()}}>
          <span class="material-icons">keyboard_backspace</span>
        </a>
      </div>

      <span className="wallets-scroll-btn"></span>
    </div>
  );
}

export default WalletsList;
