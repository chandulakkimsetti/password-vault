// server/src/routes/auth.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Import the User model
import jwt from 'jsonwebtoken';
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password.' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for user and password (same as before)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // --- NEW JWT LOGIC ---
    // 1. Create a payload containing the user's ID
    const payload = {
      user: {
        id: user.id,
      },
    };

    // 2. Sign the token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in your .env file');
    }

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: 3600 }, // Token expires in 1 hour (3600 seconds)
      (err, token) => {
        if (err) throw err;
        // 3. Send the token to the client
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;