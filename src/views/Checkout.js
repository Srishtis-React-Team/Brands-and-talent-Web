import React, { useEffect } from 'react';
import $ from 'jquery';

const Checkout = () => {
  useEffect(() => {
    // Load the Payway checkout script
    const script = document.createElement('script');
    script.src = 'https://checkout.payway.com.kh/plugins/checkout2-0.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = () => {
    // Append the checked payment options to the form
    $('#aba_merchant_request').append($(".payment_option:checked"));
    // Call the Payway checkout function
    window.AbaPayway.checkout();
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div id="aba_merchant_request">
        {/* Add your payment options here, e.g., radio buttons */}
        <label>
          <input type="radio" className="payment_option" name="payment" value="option1" /> Option 1
        </label>
        <label>
          <input type="radio" className="payment_option" name="payment" value="option2" /> Option 2
        </label>
        {/* Add other payment options as needed */}
      </div>
      <button id="checkout_button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
