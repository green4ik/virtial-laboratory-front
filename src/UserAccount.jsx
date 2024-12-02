import React from 'react';
import './UserAccount.css';

function UserAccount() {
  return (
  <div className="user-account-container">
    <div className="user-account">
      <div className="account-content">
        <h2 className="account-header">Welcome to Your Account</h2>
        <div className="user-account-buttons">
          <button className="account-button">General Info</button>
          <button className="account-button">Statistics</button>
          <button className="account-button">Edit Profile</button>
          <button className="account-button">Privacy and Security</button>
          <button className="account-button">Notification Preferences</button>
          <button className="account-button">Linked Accounts</button>
          <button className="account-button">Referral Program</button>
          <button className="account-button">Help</button>
          <button className="account-button">Contact Tech Support</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default UserAccount;
