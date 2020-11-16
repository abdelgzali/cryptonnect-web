import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
// import Slider from 'react-slick';

const coinPrefix = {
  bitcoin: 'bitcoin:',
  ethereum: 'ethereum:',
  bitcoinCash: '',
};

export default function Profiles({ userData }) {
  const initialCopyState = {};
  for (const i in userData.wallets) {
    initialCopyState[i] = false;
  }

  const [copyState, setCopyState] = useState(initialCopyState);

  useEffect(() => {
    let hasTrueState = false;
    for (const i in copyState) {
      if (copyState[i]) hasTrueState = true;
    }
    if (hasTrueState) {
      setTimeout(() => setCopyState(initialCopyState), 3000);
    }
  }, [initialCopyState, copyState]);

  const copyToClipboard = (event, text, index) => {
    navigator.clipboard.writeText(text);
    const updatedCopyState = { ...copyState };
    updatedCopyState[index] = true;
    setCopyState(updatedCopyState);
  };

  const createURI = (wallet) => {
    const prefix = coinPrefix[wallet.coinType];
    let URI = prefix + wallet.address;
    return URI;
  };

  return (
    <section id="profile">
      <header className="profile-header">
        <figure>
          <img src={userData.avatarURL} alt="avatar" />
          <figcaption>
            <h2>{userData.name}</h2>
            <p>{`@${userData.userHandle}`}</p>
            <button>FOLLOW</button>
          </figcaption>
        </figure>
      </header>

      <section>
        <h3>Wallets</h3>
        <ul>
          {userData.wallets.map((wallet, index) => {
            return (
              <li key={index} className="tile">
                <div className="wallet-info">
                  <h3>{wallet.label}</h3>
                  <p onClick={(e) => copyToClipboard(e, wallet.address, index)}>
                    {wallet.address}
                    <span className="material-icons">content_copy</span>
                    {copyState[index] && (
                      <span className="snack-bar">copied!</span>
                    )}
                  </p>
                </div>
                <img src="../assets/images/bitcoin-logo.svg" alt="" />
                <QRCode
                  value={createURI(wallet)}
                  imageSettings={{
                    src: `/images/${wallet.coinType}-logo.svg`,
                    height: 35,
                    width: 35,
                  }}
                  className="qrcode"
                />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
