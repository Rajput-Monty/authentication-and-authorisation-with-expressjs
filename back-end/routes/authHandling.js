const express = require('express');
const router = express.Router();
const authentication = require('../service/security/authentication');
const authorisation = require('../service/security/authorisation');
const authController = require('../controllers/authController');

// Route for user login
// Authenticates the user and returns a token on successful login
router.post('/login', (req, res) => {
    authController.login(req, res);
});

// Route for user logout
// Clears the user's authentication token (cookie) on logout
router.post('/logout', (req, res) => {
    authController.logout(req, res);
});

// Route for user registration
// Registers a new user and stores their details in the database
router.post('/register', (req, res) => {
    authController.register(req, res);
});

// Route to load user profile
// Requires user to be authenticated and authorized as a regular user
router.get('/user', 
    authentication, 
    authorisation("user"), 
    (req, res) => {
        authController.load_user_profile(req, res);
    }
);

// Route to update user profile
// Requires user to be authenticated and authorized as a regular user
router.put('/user', 
    authentication, 
    authorisation("user"), 
    (req, res) => {
        authController.update_user_profile(req, res);
    }
);

// Route to delete a user by username
// Requires user to be authenticated and authorized as an admin
router.post('/delete/user', 
    authentication, 
    (req, res) => {
        authController.delete_user_by_username(req, res);
    }
);

module.exports = router;
