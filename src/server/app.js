const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cors = require('cors');
const routes = require('./Rest/routes');
const Repository = require('./db/userRepository');
const app = express();

//Steam
const SteamStrategy = require('passport-steam').Strategy;
const steamConfig = require('./steam/steamConfig');
const cookieParser = require('cookie-parser');
let steamUser;

/*
   Note: this could be controlled with an environmental variable
 */
if(false){
    console.log("Using CORS to allow all origins");
    app.use(cors());

    /*
        Even if we allow requests from all origins with
        "Access-Control-Allow-Origin: *"
        (which is what cors() does), it would still block
        requests with authentication (ie cookies).
        Ie, cannot use wildcard * when dealing with authenticated
        requests. We would have to explicitly state the origin (host + port),
        eg, as we did in previous examples:

        app.use(cors({
            origin: 'http://localhost:1234'
        }));
     */
}



//to handle JSON payloads
app.use(bodyParser.json());


//to handle Form POST. "extended" is just to be able to parse all kinds of objects
app.use(bodyParser.urlencoded({extended: true}));


//not steaam
/*
    As we are going to use session-based authentication with
    cookies, we need to tell Express to create new sessions.
    The cookie will store user info, encrypted.
 */
 app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


/**Steam session cookie */
app.use(cookieParser());
app.use(session({
	key: 'session_id'
	, secret: 'almatrass'
	, resave: true
	, saveUninitialized: true
	, cookie: {
		maxAge: 259200000
	}
}));



//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));


//Steam
app.use(passport.initialize());
app.use(passport.session());

//Steam
passport.use(new SteamStrategy(
    //For steam authentication we need to provide API-key which should be stored in steamConfig.js.
    {
	returnURL: 'http://localhost:8080/auth/steam/return'
	, realm: 'http://localhost:8080/'
	, apiKey: steamConfig.apiKey
}, 
(identifier, profile, done) => {
	return done(null, profile);
}));


//not steam
passport.use(new LocalStrategy(
    /*
        Need to tell which fields represent the  "username" and which the "password".
        These fields will be in a Form or JSON data sent by user when authenticating.
     */
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Repository.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Repository.getUser(userId);
        return done(null, user);
    }
));

/*
    In our server, a user will be represented with some User object,
    which we store in a "database" locally, together with its (should-be-hashed) password.
    But, when doing authentication via HTTP, we only use the user id.
    So, we need a way to "serialize" from a User object into a string id,
    and vice-versa (ie, deserialize from string id to User object).
 */
//Not for steam 
 passport.serializeUser(function (user, done) {     
    console.log(user._json);
    steamUser = user._json;
    done(null, user.id);
});
 

//Steam
  passport.serializeUser((user, done) => {
    
	console.log(user._json);
	
	done(null, user._json);
});


passport.deserializeUser(function (id, done) {
    const user = Repository.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});


//Steam
passport.deserializeUser((obj, done) => {
	done(null, obj);
});


//Steam
/*
    Provide info on logged in user for steam when client does a request 
 */
app.get('/api/steamUsers', (req, res) => {
    
    const query = req.query["user"];

    if (query !== undefined && query !== null) {
        res.json(steamUser);//e.g get from repositry (Database) by query
    } else {
        res.json(steamUser);
    }
});



//Steam
/**Login and fetch data from steam and redirect to home if success or fail */
app.get(/^\/auth\/steam(\/return)?$/, passport.authenticate('steam', {
	failureRedirect: '/'
}), (req, res) => {
	res.redirect('/');
});


//--- Routes -----------
app.use('/', routes);


//handling 404 Locals
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;
