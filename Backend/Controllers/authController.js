const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, name , password, email, userType } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username:username } });
        if (existingUser) return res.status(400).json({ error: 'Username already taken' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            name,
            email,
            password: hashedPassword,
            userType
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("Login Req reciecved")

        const { username, password } = req.body;
        // Find user
        const user = await User.findOne({ where: { email: username } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT
        // const token = jwt.sign({ userId: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //userid token and type
        res.json({ token, userType: user.userType });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
