const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.headers.userid;
    if (!token) {
      return res.status(401).json({ message: 'Token Missing' });
    }
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }
    const decodedToken = jwt.verify(token, "secret");
    const { id } = decodedToken;
    if (id !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
