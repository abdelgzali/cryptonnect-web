import React, { useState, useEffect } from 'react';

import CoinsList from '../components/CoinsList';

const apiKey = '60c07af6-d8b2-4646-836d-bfb0e70328eb',
  testKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c';


function Dashboard() {
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

  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <section id="dashboard">
      <header>
        <h1>Welcome</h1>
        <h4>Find your friends; share digital wallets addresses</h4>
      </header>

      <CoinsList coins={coins}></CoinsList>

    </section>
  )
}

export default Dashboard;