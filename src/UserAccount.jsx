import React, { useState } from 'react';
import graphImg from "./images/graph.jpg";
import './UserAccount.css';
import { FaUser, FaChartBar, FaEdit, FaLock, FaBell, FaLink, FaGift, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';

function UserAccount() {
  const [activeTab, setActiveTab] = useState('General Info'); // Default to General Info

  const renderContent = () => {
    switch (activeTab) {
      case 'General Info':
        return (
          <div className="content-section">
            <h3>General Information</h3>
            <p><strong>Name:</strong> Nastia Blin</p>
            <p><strong>Email:</strong> iLoveDiagrams@example.com</p>
            <p><strong>Role:</strong> Student</p>
            <p><strong>Member Since:</strong> January 2023</p>
          </div>
        );
      case 'Statistics':
        return (
          <div className="content-section">
            <h3>Your Progress</h3>
            <img src={graphImg} alt="Statistics Graph" className="graph-image" />
            <p>Total Tasks Completed: <strong>42</strong></p>
            <p>Tasks Pending: <strong>8</strong></p>
          </div>
        );
      case 'Edit Profile':
        return (
          <div className="content-section">
            <h3>Edit Profile</h3>
            <form>
              <p>First Name: <input type="text" defaultValue="Nastia" /></p>

              <p>Last Name: <input type="text" defaultValue="Blin" /></p>

              <p>Email: <input type="email" defaultValue="iLoveDiagrams@example.com" /></p>

              <button type="submit">Save Changes</button>
            </form>
          </div>
        );
      case 'Privacy and Security':
        return (
          <div className="content-section">
            <h3>Privacy and Security</h3>
            <p>Update your password or enable 2FA for security.</p>
            <form>
              <p>New Password: <input type="password" /></p>
              <p>Confirm Password: <input type="password" /></p>
              <button type="submit">Update Password</button>
            </form>
          </div>
        );
      case 'Notification Preferences':
        return (
          <div className="content-section">
            <h3>Notification Preferences</h3>
            <p><input type="checkbox" defaultChecked /> Email Notifications</p>
            <p><input type="checkbox" /> SMS Notifications</p>
            <p><input type="checkbox" defaultChecked /> App Push Notifications</p>
          </div>
        );
      case 'Linked Accounts':
        return (
          <div className="content-section">
            <h3>Linked Accounts</h3>
            <p>Connect your favorite services:</p>
            <p>No linked accounts.</p>
            <button>Connect Account</button>
          </div>
        );
      case 'Referral Program':
        return (
          <div className="content-section">
            <h3>Referral Program</h3>
            <p>Invite friends to earn rewards.</p>
            <button>Get Referral Link</button>
          </div>
        );
      case 'Help':
        return (
          <div className="content-section">
            <h3>Help Center</h3>
            <a href="#">Browse FAQs</a>
          </div>
        );
      case 'Contact Tech Support':
        return (
          <div className="content-section">
            <h3>Contact Tech Support</h3>
            <form>
              <p>Issue: <textarea placeholder="Describe your issue"></textarea></p>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div className="user-account-container">
      
      <div className="user-account">
        <div className="user-account-sidebar">
          {[
            { label: 'General Info', icon: <FaUser /> },
            { label: 'Statistics', icon: <FaChartBar /> },
            { label: 'Edit Profile', icon: <FaEdit /> },
            { label: 'Privacy and Security', icon: <FaLock /> },
            { label: 'Notification Preferences', icon: <FaBell /> },
            { label: 'Linked Accounts', icon: <FaLink /> },
            { label: 'Referral Program', icon: <FaGift /> },
            { label: 'Help', icon: <FaQuestionCircle /> },
            { label: 'Contact Tech Support', icon: <FaEnvelope /> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className={`sidebar-button ${activeTab === label ? 'active' : ''}`}
              onClick={() => setActiveTab(label)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
        <div className="user-account-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
