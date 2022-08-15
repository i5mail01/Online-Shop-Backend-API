const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked //so that only admins can post
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ ,methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] }, //exception to view products in get mode without authorization
            {url: /\/api\/v1\/categories(.*)/ ,methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true);//reject the token if not admin
    }

    done();
}



module.exports = authJwt;