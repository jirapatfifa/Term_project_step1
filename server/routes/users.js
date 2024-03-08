const { Router } = require("express");
const router = Router();

const { users, saveuser } = require('../controllers/users');

/*
router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
],login );
*/

router.get("/allusers", users);

//router.get("/saveuser", saveuser);

router.post('/saveuser',saveuser);

module.exports = router;