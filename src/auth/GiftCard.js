// GiftCard.js
import React from 'react';
import '../assets/css/GiftCard.css'; // Import the CSS file

export const GiftCard = ({ gift }) => {
  return (
    <div className="gift-card">
      <h3>{gift.planName}</h3>
      {/* <p><strong>Message:</strong> {gift.message}</p> */}
      <p><strong>Receiver:</strong> {gift.receiversFirstName} ({gift.receiverEmail})</p>
      <p><strong>Code:</strong> {gift.code}</p>
      <p><strong>Transaction ID:</strong> {gift.transId}</p>
      <p><strong>Payment Status:</strong> {gift.paymentStatus}</p>
      <p><strong>Announce Date:</strong> {new Date(gift.announceDate).toLocaleString()}</p>
      <p><strong>Transaction Date:</strong> {new Date(gift.transactionDate).toLocaleString()}</p>
    </div>
  );
};

export default GiftCard;