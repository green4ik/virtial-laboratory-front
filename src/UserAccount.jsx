import React from 'react';
import './UserAccount.css';

function UserAccount() {
  return (
    <div className="user-account-container">
      <div className="user-account">
        <h2>Welcome to Your Account</h2>
        <div className="user-account-buttons">
          <button className="account-button">General Info</button>
          <button className="account-button">Statistics</button>
          <button className="account-button">Settings</button>
          <button className="account-button">Preferences</button>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
