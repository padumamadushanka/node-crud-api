const express=require('express');
const router = express.Router();
const { signup,signin,signout, userById} = require('../controllers/user');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/secret/:userId',(req,res)=>{
    res.json({
        user:req.profile
    })
})

router.param('userId', userById);


module.exports = router;