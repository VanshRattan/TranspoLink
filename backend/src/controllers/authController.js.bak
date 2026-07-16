/**
 * Authentication Controller
 * Handles user registration, login, and token management
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, userType, licenseNumber, vehicleType, companyName, gstNumber } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user object
    const userData = {
      name,
      email,
      phone,
      password,
      userType
    };

    // Add type-specific fields
    if (userType === 'truck_driver') {
      userData.licenseNumber = licenseNumber;
      userData.vehicleType = vehicleType;
    } else if (userType === 'businessman') {
      userData.companyName = companyName;
      userData.gstNumber = gstNumber;
    }

    // Create user
    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Forgot password - Send OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validate input
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either email or phone number'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with the provided email or phone'
      });
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Save OTP and its expiry to the user
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');
    user.resetPasswordExpire = otpExpiry;
    await user.save({ validateBeforeSave: false });

    // TODO: In a real app, send OTP via email or SMS
    console.log(`OTP for ${email || phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        // In production, don't send OTP in response
        // This is just for development/testing
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing forgot password request'
    });
  }
};

/**
 * @desc    Verify OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOtp = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    // Validate input
    if ((!email && !phone) || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone and OTP'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ],
      resetPasswordToken: crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex'),
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // OTP is valid
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP'
    });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { email, phone, otp, newPassword } = req.body;

    // Validate input
    if ((!email && !phone) || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone, OTP, and new password'
      });
    }

    // Find user by email or phone with valid OTP
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ],
      resetPasswordToken: crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex'),
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Update password and clear reset token
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Invalidate all user's active sessions (optional)
    // This would require a token blacklist or versioning system

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};

export { 
  register, 
  login, 
  getMe, 
  logout, 
  forgotPassword, 
  verifyOtp, 
  resetPassword 
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        isVerified: user.isVerified,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Forgot password - Send OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validate input
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either email or phone number'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with the provided email or phone'
      });
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Save OTP and its expiry to the user
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');
    user.resetPasswordExpire = otpExpiry;
    await user.save({ validateBeforeSave: false });

    // TODO: In a real app, send OTP via email or SMS
    console.log(`OTP for ${email || phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        // In production, don't send OTP in response
        // This is just for development/testing
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing forgot password request'
    });
  }
};

/**
 * @desc    Verify OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOtp = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    // Validate input
    if ((!email && !phone) || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone and OTP'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ],
      resetPasswordToken: crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex'),
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // OTP is valid
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP'
    });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { email, phone, otp, newPassword } = req.body;

    // Validate input
    if ((!email && !phone) || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone, OTP, and new password'
      });
    }

    // Find user by email or phone with valid OTP
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ],
      resetPasswordToken: crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex'),
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Update password and clear reset token
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Invalidate all user's active sessions (optional)
    // This would require a token blacklist or versioning system

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};

export { 
  register, 
  login, 
  getMe, 
  logout, 
  forgotPassword, 
  verifyOtp, 
  resetPassword 
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Forgot password - Send OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validate input
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either email or phone number'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with the provided email or phone'
      });
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Save OTP and its expiry to the user
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');
    user.resetPasswordExpire = otpExpiry;
    await user.save({ validateBeforeSave: false });

    // TODO: In a real app, send OTP via email or SMS
    console.log(`OTP for ${email || phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (req, res) => {
  try {
    // In a real app, you might want to blacklist the token
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Forgot password - Send OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validate input
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either email or phone number'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with the provided email or phone'
      });
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Save OTP and its expiry to the user
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');
    user.resetPasswordExpire = otpExpiry;
    await user.save({ validateBeforeSave: false });

    // TODO: In a real app, send OTP via email or SMS
    console.log(`OTP for ${email || phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        // In production, don't send OTP in response
        // This is just for development/testing
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing forgot password request'
    });
  }
};

/**
 * @desc    Verify OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    // Validate input
    if ((!email && !phone) || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone and OTP'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ],
      resetPasswordToken: crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex'),
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // OTP is valid
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP'
    });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, phone, otp, newPassword } = req.body;

    // Validate input
    if ((!email && !phone) || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone, OTP, and new password'
      });
    }

    // Find user by email or phone with valid OTP
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ],
      resetPasswordToken: crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex'),
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Update password and clear reset token
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};

export { 
  register, 
  login, 
  getMe, 
  logout, 
  forgotPassword, 
  verifyOtp, 
  resetPassword 
};
