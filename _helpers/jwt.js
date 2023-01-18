const { expressjwt } = require('express-jwt')
const config = require('../config.json')
const userService = require('../users/user.service')
const driverService = require('../drivers/driver.service')

module.exports = jwt2;

function jwt2() {
    const secret = config.secret;
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/users/login',
            '/users/register',
            '/drivers/login',
            '/drivers/register'
        ]
    })
}

// async function isRevoked(req, payload) {
//     console.log(payload.payload.sub)
//     const user = await userService.getById(payload.payload.sub)
//     const driver = await driverService.getById(payload.payload.sub)
//     // revoke token if user no longer exists
//     if (!user & !driver) {
//         return true
//     }

//     return false
// }