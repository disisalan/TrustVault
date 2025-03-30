const crypto = require('crypto');

// Function to generate RSA key pair
const generateKeyPair = () => {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair(
            'rsa',
            {
                modulusLength: 2048, // Secure length
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
            },
            (err, publicKey, privateKey) => {
                if (err) reject(err);
                resolve({ publicKey, privateKey });
            }
        );
    });
};

module.exports = generateKeyPair;
