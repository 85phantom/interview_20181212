const Action = require('./action');
const Middleware = require('./middleware');
const { verifyAdmin } = require('../login/verify')
const { check, validationResult } = require('express-validator/check');

const validateAdmin = [
    check('email').isEmail(),
    check('password').isString()
];

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ adminActions: this.action})
        
        this.app.post('/admin',validateAdmin, verifyAdmin(), middleware.createAdmin());
        this.app.get('/admin', verifyAdmin(), middleware.findAdmin());
        this.app.get('/admin/:id', verifyAdmin(), middleware.findAdminById());
        this.app.put('/admin/:id',validateAdmin, verifyAdmin(), middleware.updateAdmin());
        this.app.delete('/admin/:id', verifyAdmin(), middleware.deleteAdmin());
    }
}

module.exports = MemberService;