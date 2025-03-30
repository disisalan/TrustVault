
const User = require('../Models/User'); // Adjust the path and model name as needed

// Dashboard controller: fetches the user by id from the token and returns dashboard data
exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    
    // Fetch the user data from the database
    const userData = await User.findByPk(userId);
    
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Send a response with dashboard info (customize as needed)
    res.json({
      message: `Welcome to your dashboard, ${userData.username}`,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        // include any other dashboard-specific data here
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Profile controller: fetches the user profile based on the token's id
exports.profile = async (req, res) => {
  try {
    // Extract the user id from the token (assuming it was set by your auth middleware)
    const userId = req.user.userId || req.user.id;
    
    // Fetch the user profile from the database
    const userData = await User.findByPk(userId);
    
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Send a response with the profile data (customize as needed)
    res.json({
      profile: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        // include additional profile fields here
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
