import React, { useState, useEffect } from 'react';

import Coin from './Coin';

function CoinsList({ coinName, coins }) {
  return (
    <div className="coins-list">
      <h3>Coins</h3>
      <div id="coins-container" className="x-scroll">
        <span id="list-start"></span>
        {coins.length &&
          coins.map((coin) => <Coin key={coin.name} coin={coin} />)}
        <a href="#list-start" className="list-end">
          <span className="material-icons">keyboard_backspace</span>
        </a>
      </div>

      <span className="fade-spacer"></span>
    </div>
  );
}

export default CoinsList;
