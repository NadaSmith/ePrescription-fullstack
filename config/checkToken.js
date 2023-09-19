const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //checks to see if there is a token presen in either an authorization header or query parameter
    let token = req.get('Authorization') || req.query.token;
    //if hter eis a token presen in eithe rlocation 
    if (token) {
        //replaces the word Bearer eiwth an empty string to isolate just the token
        token = token.replace('Bearer', '');
        //verifies that the token is valid via the secret stored in the .env file
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            //sets a propty on the request object of 'user' to null if ther eis an error, or the decoded user's info if there was no error
            req.user = err ? null : decoded.user;
            //sets a peroperty on the request object of 'exp' or expiration to null if there is an error, or vconverts the given eixpiration date to a new Date object to be used later
            req.exp = err ? null : new Date(decoded.ex * 100);
            //moves on ot the next bit of code, usually to chekc the routes
            return next();
        })
    } else {
        //if not otken was found, sets a property on the rquiest object called 'user' to null, because there is no user
        req.user = null;
        //moves on to the next bit of code, usually to check the routes.
        return next;
    }
}