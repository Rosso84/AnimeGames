const express = require('express');
const router = express.Router();
const passport = require('passport');
const userRepo = require('../db/userRepository')


/**This page handles signup/login using routing only */



/*
    The login will apply the Passport filter to check if provided
    username/password are correct.
    See "passport.use(new LocalStrategy" in app.js
 */
router.post('/api/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/api/signup', function(req, res){

    const created = userRepo.createUser(req.body.userId, req.body.password);

    if(! created){
        res.status(400).send();
        return;
    }

    /*
        The incoming HTTP request was not authenticated. However, once we
        create a valid new user, we should manually authenticate the request.
        Otherwise, user would need to make a separate "/api/login" call.
     */
    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
               //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

router.post('/api/logout', function(req, res){

    req.logout();
    res.status(204).send();
});

/*
    Provide info on logged in user (for steam see app.js)
 */
router.get("/api/user", (req, res) => {

    /*
        If a user is logged in by providing the right session cookie,
        then Passport will automatically instantiate a valid User object
        and add it to the incoming "req" object
     */

    if(req.user){

        res.json({
            userId: req.user.id,
        });

        return;
    }

    res.status(401).send();
});

module.exports = router;
