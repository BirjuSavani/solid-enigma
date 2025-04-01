exports.getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User retrieved successfully',
      data: req.user, // `req.user` is set in authMiddleware
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
