import React, { useState, useEffect } from 'react';

function Wallet({ coin }) {
  const coinPrice = coin.quote.USD.price.toFixed(2);
  return (
    <div className="wallet card">
      <h4>{coin.name}</h4>
      <div className="coin-stats">
        <p className="coin-price">{coinPrice}</p>
      </div>
    </div>
  );
}
export default Wallet;
