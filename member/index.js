const Action = require('./action');
const Middleware = require('./middleware');
const { verifyAdmin } = require('../login/verify')
const { check, validationResult } = require('express-validator/check');

const validateAdmin = [
    check('name').isString(),
    check('gender').isString(),
    check('birthday').isString()
]

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ memberActions: this.action})
        this.app.post('/member',validateAdmin, verifyAdmin(), middleware.createMember());
        this.app.get('/member',validateAdmin, verifyAdmin(), middleware.findMember());
        this.app.put('/member/:id',validateAdmin, verifyAdmin(), middleware.updateMember());
        this.app.delete('/member/:id',validateAdmin, verifyAdmin(), middleware.deleteMember());
    }
}

module.exports = MemberService;