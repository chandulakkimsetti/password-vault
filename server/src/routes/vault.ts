// server/src/routes/vault.ts
import express from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware.js';
import VaultItem from '../models/VaultItem.js';

const router = express.Router();

// @route   POST /api/vault
// @desc    Create a new vault item
// @access  Private
router.post('/', protect, async (req: AuthRequest, res) => {
  try {
    const { title, username, password_encrypted, url, notes } = req.body;

    const newVaultItem = new VaultItem({
      user: req.user?.id, // Get user ID from the token via middleware
      title,
      username,
      password_encrypted,
      url,
      notes,
    });

    const savedItem = await newVaultItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/vault
// @desc    Get all vault items for the logged-in user
// @access  Private
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    // Find all items that belong to the logged-in user
    const items = await VaultItem.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Make sure the logged-in user owns the item
    if (item.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await item.deleteOne();

    res.json({ message: 'Item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const { title, username, password_encrypted, url, notes } = req.body;

    let item = await VaultItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update fields
    item.title = title || item.title;
    item.username = username || item.username;
    item.password_encrypted = password_encrypted || item.password_encrypted;
    item.url = url || item.url;
    item.notes = notes || item.notes;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;