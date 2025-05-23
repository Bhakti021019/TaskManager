const express = require('express');
const router = express.Router();
const Academic = require('../models/academic');

// Get all
router.get('/', async (req, res) => {
  try {
    const academics = await Academic.find();
    res.json(academics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch academics' });
  }
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) return res.status(404).json({ error: 'Not found' });
    res.json(academic);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving entry' });
  }
});

// Create new
router.post('/', async (req, res) => {
  try {
    const newAcademic = new Academic(req.body);
    await newAcademic.save();
    res.status(201).json(newAcademic);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create entry' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Academic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update entry' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Academic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;
