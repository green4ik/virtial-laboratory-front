import React, { useState } from 'react';
import graphImg from "./images/graph.jpg";
import './UserAccount.css';
import { FaUser, FaChartBar, FaEdit, FaLock, FaBell, FaLink, FaGift, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';

function UserAccount() {
  const [activeTab, setActiveTab] = useState('General Info'); // Default to General Info
  const user = JSON.parse(localStorage.getItem("user"));

  const renderContent = () => {
    switch (activeTab) {
      case 'General Info':
        return (
          <div className="content-section ">
            <h1>General Information</h1>
            <p className='field-card'><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p className='field-card'><strong>Email:</strong> {user.email} </p>
            <p className='field-card'><strong>Role:</strong> {user.role} </p>
            <p className='field-card'><strong>Member Since:</strong> January 2023</p>
          </div>
        );
      case 'Statistics':
        return (
          <div className="content-section">
            <h1>Your Progress</h1>
            <img src={graphImg} alt="Statistics Graph" className="graph-image" />
            <p>Total Tasks Completed: <strong>42</strong></p>
            <p>Tasks Pending: <strong>8</strong></p>
          </div>
        );
      case 'Edit Profile':
        return (
          <div className="content-section">
            <h1>Edit Profile</h1>
            <form>
              <p className='field-card'>First Name: <input type="text" defaultValue={user.firstName}  style={{width: 60 + '%', fontSize: 20 + 'px'}}/> </p>

              <p className='field-card'>Last Name: <input type="text" defaultValue={user.lastName}  style={{width: 60 + '%', fontSize: 20 + 'px'}}/></p>

              <p className='field-card'>Email: <input type="email" defaultValue={user.email}  style={{width: 60 + '%', fontSize: 20 + 'px'}}/></p>

              <button type="submit" className='user-account-button'>Save Changes</button>
            </form>
          </div>
        );
      case 'Privacy and Security':
        return (
          <div className="content-section">
            <h1>Privacy and Security</h1>
            <p className='field-card'>Update your password or enable 2FA for security.</p>
            <form>
              <p className='field-card'>New Password: <input type="password" /></p>
              <p className='field-card'>Confirm Password: <input type="password" /></p>
              <button type="submit" className='user-account-button'>Update Password</button>
            </form>
          </div>
        );
      case 'Notification Preferences':
        return (
          <div className="content-section">
            <h1>Notification Preferences</h1>
            <p className='field-card'><input type="checkbox" defaultChecked /> Email Notifications</p>
            <p className='field-card'><input type="checkbox" /> SMS Notifications</p>
            <p className='field-card'><input type="checkbox" defaultChecked /> App Push Notifications</p>
          </div>
        );
      case 'Linked Accounts':
        return (
          <div className="content-section">
            <h1>Linked Accounts</h1>
            <p className='field-card'>Connect your favorite services:</p>
            <p className='field-card'>No linked accounts.</p>
            <button className='user-account-button'>Connect Account</button>
          </div>
        );
      case 'Referral Program':
        return (
          <div className="content-section">
            <h1>Referral Program</h1>
            <p className='field-card'>Invite friends to earn rewards.</p>
            <button className='user-account-button'>Get Referral Link</button>
          </div>
        );
      case 'Help':
        return (
          <div className="content-section">
            <h1>Help Center</h1>
            <a href="#"  className='field-card'  >Browse FAQs</a>
          </div>
        );
      case 'Contact Tech Support':
        return (
          <div className="content-section">
            <h1>Contact Tech Support</h1>
            <form  className='field-card'>
              <p>Issue:</p>
              <textarea placeholder="Describe your issue" style={{width: 60 + '%'}}></textarea>
              <button type="submit" className='user-account-button'>Submit</button>
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
