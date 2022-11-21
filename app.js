import e from "express";
import passport from 'passport';
import * as fx from './functions/index.js';
import chatrouter from './routes/chats.router.js';
import connectrouter from './routes/connect.router.js';
import grouprouter from './routes/groups.router.js';
import usersrouter from './routes/users.router.js';


const app = e();

// add ejs view engine
app
    .set('view engine', 'ejs')
    .set('views', 'views')

// server static file
app.use(e.static('public'))

// parse request body
app.use(e.urlencoded({ extended: false }))

// allow CORS request from host
app.use(fx.allowCorsOrigin);
// witch CORS methods are allowed, which CORS Headers
app.options(/.*/, fx.allowMethodsHeaders);

// Login page render
app.get('/login', (req, res) => {
    res.render('login', { uid: req.query.uid || '0' });
})

// Add passport session authentificator
app
    .use(fx.addSessionSupport())
    .use(passport.authenticate('session'))

// API routes
app
    .use('/api/v1/connect', connectrouter)
    .use('/api/v1/chats', chatrouter)
    .use('/api/v1/groups', grouprouter)
    .use('/api/v1/users', usersrouter)


// Export express server for listening
export default app;
