import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const coinPrefix = {
  bitcoin: 'bitcoin:',
  ethereum: 'ethereum:',
  bitcoinCash: '',
};

export default function Profiles() {
  const profileData = {
    userName: 'Michael Scott',
    userID: 100001,
    avatarURL:
      'https://www.arivalevent.com/wp-content/uploads/2018/06/michael-scott.jpg',
    wallets: [
      {
        label: 'BTC Main',
        address: 'bc1qq56tsnwm84x6ulnc0gs02na5tvd0qgnqyy6nxs',
        coinType: 'bitcoin',
      },
      {
        label: 'ETH Main',
        address: '0x2f18d95775fd0edf121c613dc89bc71180378fb1',
        coinType: 'ethereum',
      },
      {
        label: 'BCH Main',
        address: 'bitcoincash:qrt8d7zl46wlarslt2p9ha357vzg9xfn2ydfptr08v',
        coinType: 'bitcoin cash',
      },
    ],
  };

  const initialCopyState = {};
  for (const i in profileData.wallets) {
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
    <div id="profile">
      <figure>
        <img src={profileData.avatarURL} alt="avatar" />
        <figcaption>
          <h2>{profileData.userName}</h2>
        </figcaption>

        <div>
          <button>FOLLOW</button>
        </div>
      </figure>
      <section>
        <ul>
          {profileData.wallets.map((wallet, index) => {
            return (
              <li key={index}>
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
                <QRCode value={createURI(wallet)} className="qrcode"/>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
