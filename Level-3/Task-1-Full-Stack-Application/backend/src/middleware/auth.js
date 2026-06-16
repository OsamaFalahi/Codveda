const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  console.log('protect middleware - req.cookies:', req.cookies);

  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    console.log('protect: No token found');
    return res.status(401).json({ error: 'Not authorized - no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('protect: decoded', decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true }
    });

    console.log('protect: user from DB:', user);

    if (!user) {
      return res.status(401).json({ error: 'Not authorized - user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('protect: JWT error:', error.message);
    return res.status(401).json({ error: 'Not authorized - token failed' });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ error: 'Role not authorized' });
    }
    next();
  };
};

module.exports = { protect, authorize };