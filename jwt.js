const jwt = require('jsonwebtoken')
const jwtKey = 'PS2ARattrapage'
const jwtExpirySeconds = 3600

module.exports = (userService) => {
    return {
        validateJWT(req, res, next) {
            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, jwtKey, {algorithm: "HS256"},  async (err, user) => {
                if (err) {
                    console.log(err)
                    res.status(401).end()
                    return
                }
                //console.log(user)
                try {
                    req.user = await userService.dao.getByEmail(user.email)
                    return next()
                } catch(e) {
                    console.log(e)
                    res.status(401).end()
                }

            })
        },
        generateJWT(login) {
            //console.log("login : ", login)
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
        },
        getKey() {
            return jwtKey
        }
    }
}