// src/controllers/authController.js

const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {

    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

exports.login = async (req, res) => {
  try {

    const token = await authService.login(req.body);

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }
};