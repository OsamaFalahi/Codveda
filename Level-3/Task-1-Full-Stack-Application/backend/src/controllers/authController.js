const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email('Invalid email format').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters').max(255),
  name: z.string().max(255).optional(),
  role: z.enum(['USER', 'ADMIN']).optional()
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

const authController = {
  async signup(req, res) {
    try {
      const { email, password, name, role } = req.body;

      const parsed = signupSchema.safeParse({ email, password, name, role });
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0].message });
      }

      const { email: validatedEmail, password: validatedPassword, name: validatedName, role: validatedRole } = parsed.data;

      const existingUser = await prisma.user.findUnique({
        where: { email: validatedEmail }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(validatedPassword, saltRounds);

      const user = await prisma.user.create({
        data: {
          email: validatedEmail,
          password: hashedPassword,
          name: validatedName,
          role: validatedRole || 'USER'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        }
      });

      const token = generateToken(user.id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      });

      console.log('signup user:', user);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user.id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      });

      const { password: _, ...userWithoutPassword } = user;
      console.log('login userWithoutPassword:', userWithoutPassword);

      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  },

  async logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  },

  async getProfile(req, res) {
    console.log('getProfile req.user:', req.user);
    res.json(req.user);
  }
};

module.exports = authController;