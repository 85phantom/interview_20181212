const Action = require('./action');
const Middleware = require('./middleware');
const { verifyAdmin } = require('../login/verify')

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ memberActions: this.action})
        this.app.post('/member', verifyAdmin(), middleware.createMember());
        this.app.get('/member', verifyAdmin(), middleware.findMember());
        this.app.put('/member/:id', verifyAdmin(), middleware.updateMember());
        this.app.delete('/member/:id', verifyAdmin(), middleware.deleteMember());
    }
}

module.exports = MemberService;