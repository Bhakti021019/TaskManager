const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Create a new experience entry
router.post('/', async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create experience entry' });
  }
});

// Get all experience entries
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch experience entries' });
  }
});

module.exports = router;
