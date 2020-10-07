import React from 'react';

import WalletsList from '../components/WalletsList';

function Dashboard() {
  return (
    <section id="dashboard">
      <header>
        <h1>Welcome</h1>
        <h4>Find your friends; share digital wallets addresses</h4>
      </header>

      <WalletsList></WalletsList>

    </section>
  )
}

export default Dashboard;