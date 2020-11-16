import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';

import userData from '../user-data.json';

const coinPrefix = {
  bitcoin: 'bitcoin:',
  ethereum: 'ethereum:',
  bitcoinCash: '',
};

export default function Profiles() {
  const {userHandle} = useParams();

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

  // only temporary
  // matches userhandle from param to user data from friendslist, found in sample user data
  const findUserData = (handle) => {
    const [friendUserData] = userData.friends.filter((friend) => {
      if (handle === friend.userHandle) return friend;
    });
    return friendUserData;
  };
  const user = userHandle === userData.userHandle ? userData : findUserData(userHandle);

  return (
    <section id="profile">
      <header className="profile-header">
        <figure>
          <img src={user.avatarURL} alt="avatar" />
          <figcaption>
            <h2>{user.name}</h2>
            <p>{`@${user.userHandle}`}</p>
            <button>FOLLOW</button>
          </figcaption>
        </figure>
      </header>

      <section>
        <h3>Wallets</h3>
        <ul>
          {user.wallets.map((wallet, index) => {
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
