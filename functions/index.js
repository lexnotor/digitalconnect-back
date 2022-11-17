import e from "express";
import sqliteSession from 'connect-sqlite3'
import session from 'express-session'


/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const ifUserLogin = (req, res, next) => {
    if (req.user) next();
    else res.status(401).json({ message: 'please login' })
}

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const allowCredentialHeaders = (_, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next()
}
/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const allowCorsOrigin = (req, res, next) => {
    if (req.headers.origin)
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    next()
}
/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const allowMethodsHeaders = (_, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
}

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const addSessionSupport = (_, res, next) => {
    const SQLiteStore = sqliteSession(session)
    return (
        session({
            secret: '34f43ecba0029845ffecb23',
            resave: false,
            saveUninitialized: false,
            store: new SQLiteStore({
                db: 'session.db',
                table: 'sessions',
                dir: './var',
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 5
            }
        })
    )
}