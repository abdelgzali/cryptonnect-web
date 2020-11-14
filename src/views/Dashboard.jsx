import React, { useState, useEffect } from 'react';
import ls from 'local-storage';

import CoinsList from '../components/CoinsList';
import FriendsList from '../components/FriendsList';

// sample user data
const userData = {
  friends: [
    {
      name: 'Ryan Howard',
      userHandle: 'therealryanhoward',
      photoURL:
        'https://media2.s-nbcnews.com/j/streams/2012/June/120627/434210-120627-ent-bjnovak-vmed.fit-760w.jpg',
    },
    {
      name: 'Jim Halpert',
      userHandle: 'bigtuna',
      photoURL:
        'https://pbs.twimg.com/profile_images/3171824697/ef75d90df2e65ce326acf30262df5918.jpeg',
    },
    {
      name: 'Todd Packer',
      userHandle: 'willhung',
      photoURL:
        'https://upload.wikimedia.org/wikipedia/en/6/61/Todd_Packer.jpg',
    },
    {
      name: 'Pam Halpert',
      userHandle: 'mrspamhalpert',
      photoURL:
        'https://cdn.costumewall.com/wp-content/uploads/2018/09/pam-beesly.jpg',
    },
    {
      name: 'Dwight Howard',
      userHandle: 'beetsbearsbattlestar',
      photoURL:
        'https://theofficeanalytics.files.wordpress.com/2017/11/dwight.jpeg',
    },
  ],
};
const apiKey = '60c07af6-d8b2-4646-836d-bfb0e70328eb',
  testKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
  corsProxy = 'https://cors-anywhere.herokuapp.com/'; //same-origin error bypass; DISABLE FOR PROD

function Dashboard() {
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
