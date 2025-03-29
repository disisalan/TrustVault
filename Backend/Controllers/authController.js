const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, name , password, email, userType } = req.body;
        console.log(userType)
        console.log("Request Recived Register")
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username:username } });
        if (existingUser) return res.status(400).json({ error: 'Username already taken' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username:username,
            name:name,
            email:email,
            role:"issuer",
            password_hash: hashedPassword,
            public_key: "dummyIssuerPublicKey"
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("Login request received");

        const { username, password } = req.body;
        console.log(username + password)
        // Find user by username
        const user = await User.findOne({ where: { username:username } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token and role
        res.json({ token, role: user.role });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};