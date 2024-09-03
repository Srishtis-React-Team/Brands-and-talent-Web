import axios from 'axios';
import crypto from 'crypto';

// PayWay API Endpoints
const API_BASE_URL = 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments'; // Use production URL in production
const CREATE_PAYMENT_URL = `${API_BASE_URL}/purchase`; // Assuming this is the endpoint for creating payment
const CHECK_TRANSACTION_URL = `${API_BASE_URL}/check-transaction-2`; // For checking transaction status

// Configurations
const PUBLIC_KEY = 'your_public_key_here';
const MERCHANT_ID = 'your_merchant_id_here';

// Function to create a payment
export const createPayment = async (amount, currency, type) => {
    const requestTime = getCurrentUTC();
    const tranId = generateTransactionId(); // Function to generate unique transaction ID
    const hash = generateHash(requestTime, tranId);

    const paymentData = {
        req_time: requestTime,
        merchant_id: MERCHANT_ID,
        amount: amount,
        currency: currency,
        type: type,
        tran_id: tranId,
        hash: hash
    };

    try {
        const response = await axios.post(CREATE_PAYMENT_URL, paymentData);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

// Function to check the transaction status
export const checkTransactionStatus = async (tranId) => {
    const requestTime = getCurrentUTC();
    const hash = generateHash(requestTime, tranId);

    const checkData = {
        req_time: requestTime,
        merchant_id: MERCHANT_ID,
        tran_id: tranId,
        hash: hash
    };

    try {
        const response = await axios.post(CHECK_TRANSACTION_URL, checkData);
        return response.data;
    } catch (error) {
        console.error('Error checking transaction status:', error);
        throw error;
    }
};

// Helper function to generate current UTC timestamp
const getCurrentUTC = () => {
    return new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14); // Format YYYYmmddHHMMSS
};

// Helper function to generate a unique transaction ID
const generateTransactionId = () => {
    return crypto.randomBytes(16).toString('hex');
};

// Helper function to generate hash
const generateHash = (requestTime, tranId) => {
    const hashString = `${requestTime}${MERCHANT_ID}${tranId}`;
    return crypto.createHmac('sha512', PUBLIC_KEY).update(hashString).digest('base64');
};




// import React, { useState } from 'react';
// import { createPayment, checkTransactionStatus } from './paymentGateway';

// const PaymentButton = () => {
//     const [status, setStatus] = useState(null);

//     const handlePayment = async () => {
//         try {
//             const amount = '0.01'; // Example amount
//             const currency = 'USD';
//             const type = 'pre-auth'; // Or 'purchase' based on your needs
            
//             const paymentResponse = await createPayment(amount, currency, type);
//             console.log('Payment Response:', paymentResponse);

//             // Optionally, check the transaction status
//             const tranId = paymentResponse.tran_id;
//             const statusResponse = await checkTransactionStatus(tranId);
//             setStatus(statusResponse);
//         } catch (error) {
//             console.error('Payment Error:', error);
//             setStatus('Error');
//         }
//     };

//     return (
//         <div>
//             <button onClick={handlePayment}>Pay</button>
//             {status && <div>Transaction Status: {status.status.message}</div>}
//         </div>
//     );
// };

// export default PaymentButton;
