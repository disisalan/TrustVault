const crypto = require('crypto');

// Generate a random IV
const generateIV = () => crypto.randomBytes(16);

// Derive a key from the secretKey using scrypt
const deriveKey = (password, salt) => new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
    });
});

const encryptPrivateKey = async (privateKey) => {
    const iv = generateIV();
    const salt = crypto.randomBytes(16);
    const key = await deriveKey(privateKey, salt);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Combine salt, iv, and encrypted data for storage
    return `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted}`;
};

const decryptPrivateKey = async (encryptedData) => {
    const [saltHex, ivHex, encrypted] = encryptedData.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const key = await deriveKey(privateKey, salt);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encryptPrivateKey, decryptPrivateKey };