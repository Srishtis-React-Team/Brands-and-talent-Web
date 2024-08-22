import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAllowAllCookies = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 });
    setIsVisible(false);
    // Implement additional actions if needed
  };

  const handleDecline = () => {
    Cookies.set('cookieConsent', 'rejected', { expires: 365 });
    setIsVisible(false);
    // Implement additional actions if needed
  };

  if (!isVisible) return null;

  return (
    <div style={styles.popup}>
      <p style={styles.text}>
      We use cookies to give you the best experience. We respect and protect your privacy.
      </p>
      <div style={styles.buttonsContainer}>
        <button onClick={handleAllowAllCookies} style={styles.buttonAllow}>Accept</button>
        <button onClick={handleDecline} style={styles.buttonDecline}>Decline</button>
      </div>
    </div>
  );
};

const styles = {
  popup: {
    position: 'fixed',
    bottom: '45px',
    left: '50%',
    // right: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    boxShadow: 'rgb(0 0 0 / 50%) 0px 2px 8px',
    zIndex: '10000',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '420px',
    maxWidth: '92%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  text: {
    marginBottom: '15px',
    fontSize: '14px',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '10px',
  },
  buttonAllow: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  buttonDecline: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#d9534f',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CookieConsent;
