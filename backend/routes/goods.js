const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Good = require('../models/Good');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @route    POST api/goods
// @desc     Post a new good
// @access   Private (Client only)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('weight', 'Weight is required').not().isEmpty(),
      check('pickupLocation', 'Pickup location is required').not().isEmpty(),
      check('deliveryLocation', 'Delivery location is required').not().isEmpty(),
      check('pickupDate', 'Pickup date is required').not().isEmpty(),
      check('contactName', 'Contact name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('phone', 'Phone number is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newGood = new Good({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        weight: req.body.weight,
        dimensions: req.body.dimensions,
        pickupLocation: req.body.pickupLocation,
        deliveryLocation: req.body.deliveryLocation,
        pickupDate: req.body.pickupDate,
        isUrgent: req.body.isUrgent,
        truckType: req.body.truckType,
        specialRequirements: req.body.specialRequirements,
        contactName: req.body.contactName,
        company: req.body.company,
        email: req.body.email,
        phone: req.body.phone,
        additionalNotes: req.body.additionalNotes,
      });

      const good = await newGood.save();

      // Send verification email to the client
      const user = await User.findById(req.user.id).select('-password');
      const emailMessage = `
        <p>Dear ${user.name},</p>
        <p>Your goods posting titled "<strong>${good.title}</strong>" has been successfully received.</p>
        <p>Here are the details:</p>
        <ul>
          <li><strong>Description:</strong> ${good.description}</li>
          <li><strong>Pickup Location:</strong> ${good.pickupLocation}</li>
          <li><strong>Delivery Location:</strong> ${good.deliveryLocation}</li>
          <li><strong>Pickup Date:</strong> ${new Date(good.pickupDate).toLocaleDateString()}</li>
          <li><strong>Truck Type:</strong> ${good.truckType || 'Any Type'}</li>
        </ul>
        <p>We will notify you once a driver accepts your request.</p>
        <p>Thank you for using TranspoLink!</p>
      `;

      try {
        await sendEmail({
          email: user.email,
          subject: 'TranspoLink: Your Goods Posting Confirmation',
          message: emailMessage,
        });
        console.log('Confirmation email sent successfully.');
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError.message);
      }

      res.json(good);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/goods/my-shipments
// @desc     Get all goods posted by the current user
// @access   Private (Client only)
router.get('/my-shipments', auth, async (req, res) => {
  try {
    const goods = await Good.find({ user: req.user.id }).sort({ date: -1 });
    res.json(goods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
