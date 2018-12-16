const Action = require('./action');
const Middleware = require('./middleware');
const { verifyAdmin } = require('../login/verify')
const { check, validationResult } = require('express-validator/check');

const validateMember = [
    check('name').isString(),
    check('gender').isString(),
    check('birthday').isString(),
];

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ memberActions: this.action})
        this.app.post('/member',validateMember, verifyAdmin(), middleware.createMember());
        this.app.get('/member', verifyAdmin(), middleware.findMember());
        this.app.get('/member/:id', verifyAdmin(), middleware.findMemberById());
        this.app.put('/member/:id',validateMember, verifyAdmin(), middleware.updateMember());
        this.app.delete('/member/:id', verifyAdmin(), middleware.deleteMember());
    }
}

module.exports = MemberService;