const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    // Ensure you're looking up by the correct ID
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password field
    // console.log("Decoded User ID:", req.user);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);  // Return user data excluding the password
  } catch (err) {
    console.error(err); // Log any errors for debugging
    res.status(500).send('Server Error');
  }
};
