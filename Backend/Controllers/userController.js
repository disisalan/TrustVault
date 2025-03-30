
const User = require('../Models/User'); // Adjust the path and model name as needed
const Document = require('../Models/Document'); // Adjust the path and model name as needed

// Dashboard controller: fetches the user by id from the token and returns dashboard data
exports.profile = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    
    // Fetch the user data from the database
    const userData = await User.findByPk(userId);
    
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Send a response with dashboard info (customize as needed)
    res.json({
      message: `Welcome to your Profile , ${userData.username}`,
      user: {
        id: userData.id,
        username: userData.username,
        userId:userData.user_id,
        name:userData.name,
        email: userData.email,
        role: userData.role,
        public_key:userData.public_key        // include any other dashboard-specific data here
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Profile controller: fetches the user profile based on the token's id
exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id; // Extract user ID from token

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const documents = await Document.findAll({
      where: { receiver_id: userId }
    });

    res.json({message:"User Documents Found",documents});
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};
