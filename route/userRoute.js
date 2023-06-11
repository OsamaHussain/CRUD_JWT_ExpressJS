const express = require('express');
const router = express.Router();
const {signup, login, getAllUsers, getUserByEmail, getUserById, updateUserByEmail, updateUserById, deleteUserByEmail, deleteUserById} = require('../controller/userController');
const { verifyToken } = require('../middleware/jsonwebtoken');

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Fetch All The Users From Database
// router.get('/', verifyToken, getAllUsers);
router.get('/', getAllUsers);

// Fetch Specific User By Email
// router.get('/find', verifyToken, getUserByEmail);
router.get('/find', getUserByEmail);

// Fetch Specific User By ID
// router.get('/find/:id', verifyToken, getUserById);
router.get('/find/:id', getUserById);

// Update a User By Email
// router.get('/update', verifyToken, updateUserByEmail);
router.get('/update', updateUserByEmail);

// Update a User By ID
// router.get('/update/:id', verifyToken, updateUserById);
router.get('/update/:id', updateUserById);

// Delete a User By Email
// router.get('/delete', verifyToken, deleteUserByEmail);
router.get('/delete', deleteUserByEmail);

// Delete a User By ID
// router.get('/delete/:id', verifyToken, deleteUserById);
router.get('/delete/:id', deleteUserById);

module.exports = router;