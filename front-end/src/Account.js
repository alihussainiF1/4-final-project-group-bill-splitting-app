// Account.js

import React from 'react';
import './Account.css';

const Account = () => {
    return (
        <div className="account-bg h-screen p-4">
            <div className="account-header flex justify-between items-center py-4">
                <div className="menu-icon">☰</div> {/* You can replace this with an actual icon */}
                <div className="text-center font-bold text-2xl">
                    Account
                </div>
                <div className="icons">📶 🔋</div> {/* Replace with actual icons */}
            </div>
            <div className="profile-section text-center py-6">
                <div className="profile-image">
                    {/* Placeholder for the image. Replace with an <img> tag with the actual image */}
                </div>
                <div className="profile-name">Mary</div>
                <div className="profile-email">mary0917@gmail.com</div>
            </div>
            <div className="settings-section">
                <button className="setting-button">Preferences</button>
                <button className="setting-button">Passcode</button>
                <button className="setting-button">Language</button>
            </div>
            <div className="feedback-section mt-6">
                <button className="feedback-button">Feedback</button>
                <button className="feedback-button">Contact us</button>
            </div>
        </div>
    );
}

export default Account;
