const newError = require('../error')
const config = require('../config')
const jwt = require('jsonwebtoken')
const key = config.key


const verifyAdmin = () => {
    return async (req, res, next) => {
        const adminService = req.app.service.adminService;
        const adminAction = adminService.action;
        try {
            const tokenHeader = req.headers['authorization']
            let decoded = jwt.verify(tokenHeader, key);
            const email = decoded.email;
            const findQuery = await adminAction.findAdmin({ email: email})
            if(findQuery.data.length !== 1){
                throw new newError(403, 'User not exist')
            }
            next();
        } catch (error) {
            if(error instanceof newError) 
                return res.status(error.code).json(error);
            const newerr = new newError(403, 'Permission denied', error)
            return res.status(newerr.code).json(newerr);
        }
    }
}

module.exports.verifyAdmin = verifyAdmin;