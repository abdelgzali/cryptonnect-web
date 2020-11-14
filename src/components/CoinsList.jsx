import React from 'react';

import Coin from './Coin';

function CoinsList({ coins, showLoading }) {
  let loadSpinner = showLoading ? 'show-loading loading' : 'loading';
  return (
    <div className="coins-list">
      <h3>Coins</h3>
      <span className={loadSpinner}></span>
      <div id="coins-container" className="x-scroll">
        <span id="list-start"></span>
        {!showLoading &&
          coins.length &&
          coins.map((coin) => <Coin key={coin.name} coin={coin} />)}
        {!showLoading && (
          <a href="#list-start" className="list-end">
            <span className="material-icons">keyboard_backspace</span>
          </a>
        )}
      </div>

      <span className="fade-spacer"></span>
    </div>
  );
}

export default CoinsList;
