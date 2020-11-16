import React, { useState, useEffect } from 'react';
import ls from 'local-storage';

import CoinsList from '../components/CoinsList';
import FriendsList from '../components/FriendsList';

const apiKey = '60c07af6-d8b2-4646-836d-bfb0e70328eb',
  testKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
  corsProxy = 'https://cors-anywhere.herokuapp.com/'; //same-origin error bypass; DISABLE FOR PROD

function Dashboard({ userData }) {
  const [coins, updateCoins] = useState(ls('coinsData') ? ls('coinsData') : []);
  const [isLoading, toggleIsLoading] = useState(false);

  const getCoinData = async () => {
    if (!coins.length) {
      toggleIsLoading(true);
      console.log('getting coin data');
      try {
        let url =
            'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          qString =
            '?CMC_PRO_API_KEY=' + apiKey + '&start=1&limit=5&convert=USD';

        const response = await fetch(corsProxy + url + qString);
        const jsonData = await response.json();
        const coinsData = await jsonData.data;
        ls('coinsData', coinsData);
        updateCoins(ls('coinsData'));
        toggleIsLoading(false);
      } catch (err) {
        console.log(err);
      }
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

      <CoinsList coins={coins} showLoading={isLoading}></CoinsList>
      <FriendsList Friends={userData.friends}></FriendsList>
    </section>
  );
}

export default Dashboard;
