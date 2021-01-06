'use strict';
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../../../config/default')
const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({ email });;
    if (user) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }
    const password = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      role: req.body.role,
      password: password
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7 days" }
    );
    
    const resData = {
      token: `Bearer ${token}`,
      email: user.email,
      name: user.name,
      role: user.role,
      status: 'OK',
    };

    return res.status(200).json({
      ...resData,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await User.find({}, { password: false }).lean();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {

  try {
    const result = await User.findOne({ _id: req.params.id }, { password: false });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.mobile) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  User.findOneAndUpdate({ _id: req.params.id }, {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(402).send({
        message: "Successfully Updated...",
        user
      });
    }).catch(err => {
      console.log(err);
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({       
          message: "Duplicate entry"
        });
      }
      return res.status(400).send({
        message: "User not found with " + req.params.id

      });
    });
};

const deleteUser = async (req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};

const search = async (req, res) => {
  const searchfield = req.query.name || req.query.mobile;
  User.find({ $or: [{ 'name': { $regex: searchfield, $options: '$i' } }, { 'mobile': { $regex: searchfield, $options: '$i' } }] })
    .then(data => {
      res.send(data);
    })
};

const serializeUser = user => {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    mobile: user.mobile,
    password: user.password,
    role: user.role,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};
module.exports = {
  serializeUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  search,
};
