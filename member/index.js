const Action = require('./action');
const Middleware = require('./middleware');

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ memberActions: this.action})
        this.app.post('/member', middleware.createMember());
        this.app.get('/member', middleware.findMember());
        this.app.put('/member/:id', middleware.updateMember());
        this.app.delete('/member/:id', middleware.deleteMember());
    }
}

module.exports = MemberService;