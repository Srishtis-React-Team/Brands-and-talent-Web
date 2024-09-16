import React from "react";
// import "../assets/css/checkout.css";

const PopUp = ({ responseUrl, setCheckout }) => {
  console.log('props', responseUrl);

  // Close button click handler
  const handleClose = () => {
    setCheckout(false); // Assuming setCheckout is used to manage the visibility of the popup
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#ff5f5f',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
  };

  return (
    <div className="popupbackground">
      <div className="popupcontainer2" style={{ position: 'relative'}}>
        <button onClick={handleClose} style={closeButtonStyle}>X</button>
        <iframe 
          src={responseUrl} 
          title="Popup Content" 
          style={{ width: '100%', height: '100%' }} // Inline styling for iframe
        ></iframe>
      </div>
    </div>
  );
};

export default PopUp;
