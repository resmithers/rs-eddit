import React from 'react';
import Login from './Login';

function Header({ user, handleLogin, handleLogout }) {
  return (
    <div className="headerGrid">
      <h1 className="title">rs-eddit</h1>
      <h3 className="logged">
        {user && (`Logged in as: ${user}`)}
        {user && <button onClick={handleLogout} type="button">Log out</button>}
        {!user && 'Not logged in'}
        {!user && (
        <Login handleLogin={handleLogin} />
        )}

      </h3>
    </div>
  );
}
export default Header;
