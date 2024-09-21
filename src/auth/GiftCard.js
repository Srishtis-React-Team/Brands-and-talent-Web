// GiftCard.js
import React from 'react';
import '../assets/css/GiftCard.css'; // Import the CSS file

export const GiftCard = ({ gift }) => {
  return (
    <div className="gift-card">
      <h3 style={{ color:'#000'}}>{gift.planName}</h3>
      {/* <p><strong>Message:</strong> {gift.message}</p> */}
      <p style={{ color:'#000', fontSize:'14px'}}><strong style={{ color:'#000', fontSize:'14px'}}>Receiver:</strong> {gift.receiversFirstName} ({gift.receiverEmail})</p>
      <p style={{ color:'#000', fontSize:'14px'}}><strong style={{ color:'#000', fontSize:'14px'}}>Code:</strong> {gift.code}</p>
      <p style={{ color:'#000', fontSize:'14px'}}><strong style={{ color:'#000', fontSize:'14px'}}>Payment Status:</strong> {gift.paymentStatus}</p>
      <p style={{ color:'#000', fontSize:'14px'}}><strong style={{ color:'#000', fontSize:'14px'}}>Announce Date:</strong> {new Date(gift.announceDate).toLocaleString()}</p>
      <p style={{ color:'#000', fontSize:'14px'}}><strong style={{ color:'#000', fontSize:'14px'}}>Transaction Date:</strong> {new Date(gift.transactionDate).toLocaleString()}</p>
    </div>
  );
};

export default GiftCard;

// color: #000;
// font-size: 14px;
// font-style: normal;
// font-weight: 600;