import React, { useState, useEffect } from 'react';

function Coin({ coin }) {
  const coinPrice = coin.quote.USD.price.toFixed(2),
    coinTrend = coin.quote.USD.percent_change_1h;

  useEffect(() => {
    if (coinTrend) console.log(coinTrend);
  }, [coin]);
  return (
    <div className="coin tile">
      <h4>{coin.name}</h4>
      <div className="coin-stats">
  <p className="coin-price">{`$${coinPrice}`}</p>
        <span
          className={
            coinTrend > 0
              ? 'material-icons trend-arrow trend-up'
              : 'material-icons trend-arrow'
          }
        >
          transit_enterexit
        </span>
      </div>
    </div>
  );
}
export default Coin;
